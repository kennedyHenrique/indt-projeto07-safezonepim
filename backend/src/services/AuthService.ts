import type { DataSource, Repository } from "typeorm"
import { Colaborador } from "../entities/Colaborador.js";
import { Sessao } from "../entities/Sessao.js";
import { createHash } from "crypto";
import jwt, {type JwtPayload} from "jsonwebtoken";
import { AppError } from "../errors/appError.js";
import { setHeapSnapshotNearHeapLimit } from "v8";
import { compare } from "bcryptjs";



export class AuthService{

    private colaboradorRepository: Repository<Colaborador>;
    private sessaoRepository: Repository<Sessao>;

    constructor(dataSource: DataSource){
        this.colaboradorRepository = dataSource.getRepository(Colaborador);
        this.sessaoRepository = dataSource.getRepository(Sessao);
    }

    private hashToken(token: string): string {
        return createHash("sha256").update(token).digest("hex");
    }

    private gerarAccessToken(colaborador: Colaborador): string {
        return (jwt.sign as Function)(

            {sub: colaborador.id_colaborador, cargo: colaborador.cargo},

            process.env.JWT_ACCESS_SECRET!,
            {expiresIn: "7d"}
        );
    }

    private gerarRefreshToken(sessionId: string, userId: string): string{
        return (jwt.sign as Function)(
            {sub: userId, sid: sessionId},
            process.env.JWT_REFRESH_SECRET!,
            {expiresIn:"7d"}
        );
    }

    async login(matricula: string, senha: string, meta?: {ip?: string; userAgent?: string}) {
        const colaborador = await this.colaboradorRepository.findOne({
            where:{matricula},
            relations: {areas: true},
            select: {
                id_colaborador: true,
                nome: true,
                matricula: true,
                senha_hash: true,
                cargo: true,
            }
        });
        if(!colaborador){
            throw new AppError("Credenciais inválidas", 401);
        }
        console.log(colaborador);
        const senhaCorreta = await compare(senha, colaborador.senha_hash);
        if(!senhaCorreta){
            throw new AppError("Credenciais inválidas", 401);
        }

        const sessao = this.sessaoRepository.create({
            colaborador,
            refresh_token_hash:"",
            expires_at: new Date(),
            ip: meta?.ip ?? null,
            user_agent: meta?.userAgent ?? null,
        });
        await this.sessaoRepository.save(sessao);

        const refreshToken = this.gerarRefreshToken(sessao.id_sessao, colaborador.id_colaborador);

        sessao.refresh_token_hash = this.hashToken(refreshToken);
        sessao.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        
        await this.sessaoRepository.save(sessao);

        const accessToken = this.gerarAccessToken(colaborador);
        return {accessToken, refreshToken, colaborador};
    }

    async refresh(refreshToken: string){
        let payload: JwtPayload;
        try{
            payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
        }catch{
            throw new AppError("Refresh token invalido", 401);
        }

        const sessionId = payload.sid as string | undefined;
        const userId = payload.sub as string | undefined;

        if(!sessionId || !userId){
            throw new AppError("Refresh token invalido", 401);
        }

        const sessao = await this.sessaoRepository.findOne({
            where: {id_sessao:sessionId},
            relations: {colaborador: true},
        });

        if(!sessao || sessao.revoked_at) throw new AppError("Sessão inválida", 401);
        if(sessao.expires_at < new Date()) throw new AppError("Refresh token expirado", 401);
        if(sessao.refresh_token_hash !== this.hashToken(refreshToken)) throw new AppError("Refresh token inválido", 401);
        if(sessao.colaborador.id_colaborador !== userId) throw new AppError("Refresh token inválido", 401);

        const novoRefreshToken = this.gerarRefreshToken(sessao.id_sessao, sessao.colaborador.id_colaborador);
        sessao.refresh_token_hash = this.hashToken(novoRefreshToken);
        sessao.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.sessaoRepository.save(sessao);

        const accessToken = this.gerarAccessToken(sessao.colaborador);
        return {accessToken, refreshToken: novoRefreshToken, colaborador: sessao.colaborador};
    }

    async logout(refreshToken: string){
        let payload: JwtPayload;
        try{
            payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
        }catch{
            throw new AppError("Refresh token invalido", 401);
        }

        const sessionId = payload.sid as string | undefined;
        if(!sessionId) throw new AppError("Refresh token invalido", 401);

        const sessao = await this.sessaoRepository.findOne({where: {id_sessao: sessionId}});
        
        if(!sessao) return;

        if(sessao.refresh_token_hash !== this.hashToken(refreshToken)){
            throw new AppError("Refresh token inválido", 401);
        }
        sessao.revoked_at = new Date();
        await this.sessaoRepository.save(sessao);
    }
}