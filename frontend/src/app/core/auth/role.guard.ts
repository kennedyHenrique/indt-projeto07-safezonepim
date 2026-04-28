import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Cargo } from "../models/cargo.enum";



export const roleGuard = (...roles: Cargo[]): CanActivateFn =>
() => {
    const auth = inject(AuthService);
    const cargo = auth.currentCargo();
    if(cargo !== null && roles.includes(cargo)) return true;
    return inject(Router).createUrlTree(['/403']);
};