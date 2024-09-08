/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code of the error
 *           example: 400
 *         title:
 *           type: string
 *           description: Short description of the error
 *           example: "Bad Request"
 *         message:
 *           type: string
 *           description: Detailed message explaining the error
 *           example: "Invalid user ID provided"
 *         code:
 *           type: integer
 *           description: Custom error code (optional)
 *           example: 1001
 *         source:
 *           type: object
 *           description: Information about the source of the error
 *           properties:
 *             model:
 *               type: string
 *               description: The model associated with the error
 *               example: "User"
 */
export interface ErrorResponse {
    status: number,
    title: string,
    message: string,
    code?: number,
    source?: {
        model: string,
    }
}