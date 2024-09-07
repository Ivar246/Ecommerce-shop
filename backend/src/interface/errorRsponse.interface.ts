export interface ErrorResponse {
    status: number,
    title: string,
    message: string,
    code?: number,
    source?: {
        model: string,
    }
}