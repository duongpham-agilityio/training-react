type HttpStatus = 200 | 201 | 403 | 401 | 404;

export interface Response<T> {
  data: T;
  status: HttpStatus;
}
