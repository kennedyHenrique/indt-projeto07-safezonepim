import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";



export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    if(auth.isAuthenticated()) return true;
    return inject(Router).createUrlTree(['/login']);
}