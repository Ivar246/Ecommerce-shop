export default class BaseError extends Error {

    status: number
    title: string

    constructor(message: string, status: number, title: string) {
        super(message);
        this.status = status;
        this.title = title
    }
}