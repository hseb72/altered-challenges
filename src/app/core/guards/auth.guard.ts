import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // console.log('guard status: ', inject(TokenService).authenticated());
  return true ;
/*
  return inject(TokenService).authenticated()
    ? true
    : inject(Router).createUrlTree(['/auth/login']);
*/
};
