import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from './data-access/auth-state.service';
import { map, Observable } from 'rxjs';

export const privateGuard: CanActivateFn = (): Observable<boolean> => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
        map((user) => {
            if (!user) {
                router.navigate(['/register']);
                return false;
            }
            return true;
        })
    );
};

export const publicGuard: CanActivateFn = (): Observable<boolean> => {
    const router = inject(Router);
    const authState = inject(AuthStateService);

    return authState.authState$.pipe(
        map((user) => {
            if (user) {
                router.navigate(['/home']);
                return false;
            }
            return true;
        })
    );
};
