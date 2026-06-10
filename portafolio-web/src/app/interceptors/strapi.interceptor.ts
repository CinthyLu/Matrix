import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const strapiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = environment.strapiToken;
  const isStrapiRequest = req.url.startsWith(environment.strapiUrl);

  if (token && isStrapiRequest) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
