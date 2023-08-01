import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
    message: string;
    status: number;
    code?: string;
}

const errorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // Log the error (you can use a logging library like Winston or Morgan)
    console.error('Error occurred:', error);

    // Set a default error response
    const errorResponse: ErrorResponse = {
        message: 'Internal Server Error',
        status: 500,
    };

    // Check if the error is an instance of the built-in Error class
    if (error instanceof Error) {
        // Handle different types of errors if needed and update the errorResponse accordingly
        if (error.name === 'UnauthorizedError') {
            // For JWT authentication errors
            errorResponse.message = 'Unauthorized';
            errorResponse.status = 401;
        }
        // Add more error types and specific handling as needed
    }

    // Respond with the error response
    response.status(errorResponse.status).json({ error: errorResponse.message });
};

export default errorHandler;
