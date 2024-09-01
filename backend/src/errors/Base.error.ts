export default class BaseError extends Error {
    status: number
    constructor(message: string, status: number, name: string) {
        super(message);
        this.status = status;
        this.name = name
    }
}