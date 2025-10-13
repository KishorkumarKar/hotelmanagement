export class AppError extends Error {
  statusCode: number;
  constructor(message: string = "Internal Error", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }

  static notFound(message: string) {
    return new AppError(message, 404);
  }

  static dataExist(message: string) {
    return new AppError(message, 409);
  }

  static loginValidation(message: string) {
    return new AppError(message, 401);
  }

  static forbidden(message: string) {
    return new AppError(message, 403);
  }

  static badRequest(message: string) {
    return new AppError(message, 400);
  }
}
