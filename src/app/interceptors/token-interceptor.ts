import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("loginToken");
  if(!!token){
    const cloneRequest =  req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
     return next(cloneRequest);
  }
  return next(req);
};
