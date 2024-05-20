export class AppError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export const errorHandler = (status: number, message: string) => {
    const error = new AppError(message, status);
    return error;
};