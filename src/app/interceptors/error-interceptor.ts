import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {


  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 400: {
          alert("Invalid Body/ Bad request");
          break;
        }
        case 500: {
          alert("Server Error");
          break;
        }
        case 401: {
          alert("Unauthorized");
          break;
        }
         case 404: {
          alert("Not Found");
          break;
        }
        case 403: {
          alert("Forbidden");
          break;
        }
        default: {
          alert("Please try again");
          break;
        }
      }
      return throwError(err);
    })
  );
};
