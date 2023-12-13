import { ZodError } from 'zod'
import { ErrorRequestHandler } from 'express'

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let message = "UNKNOWN"
  let statusCode = 400
  console.log("[ERROR]", error.message);
  
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message })
  } else if (error instanceof ZodError) {
    message = "BAD DATA"

    error.issues
      .filter(issue => issue.message.startsWith('#'))
      .forEach(issue => {
        message = message.concat('\n', issue.message.substring(1))
      })
  }
  
  res.status(statusCode).json({
    message,
    error,
    errorAsString: String(error),
  })
}

export { AppError, errorHandler}
