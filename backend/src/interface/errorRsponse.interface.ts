/**
 * @openapi
 * components:
 *   schemas:
 *     ProductNotFoundError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 404
 *         title:
 *           type: string
 *           example: "Product Not Found"
 *         message:
 *           type: string
 *           example: "The requested product was not found in the database."
 *         code:
 *           type: integer
 *           example: 2000
 *         source:
 *           type: object
 *           properties:
 *             model:
 *               type: string
 *               example: "Product"
 * 
 *     DuplicateProductError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         title:
 *           type: string
 *           example: "Duplicate Product Error"
 *         message:
 *           type: string
 *           example: "A product with the same details already exists."
 *         code:
 *           type: integer
 *           example: 2001
 *         source:
 *           type: object
 *           properties:
 *             model:
 *               type: string
 *               example: "Product"
 * 
 *     EmptyCartError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         title:
 *           type: string
 *           example: "Empty Cart"
 *         message:
 *           type: string
 *           example: "The cart is empty, so no items to process."
 *         code:
 *           type: integer
 *           example: 2002
 *         source:
 *           type: object
 *           properties:
 *             model:
 *               type: string
 *               example: "Cart"
 * 
 *     EmailConflictError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         title:
 *           type: string
 *           example: "Email Conflict"
 *         message:
 *           type: string
 *           example: "The provided email address is already in use."
 *         code:
 *           type: integer
 *           example: 2003
 *         source:
 *           type: object
 *           properties:
 *             model:
 *               type: string
 *               example: "User"
 * 
 *     PasswordIncorrectError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         title:
 *           type: string
 *           example: "Incorrect Password"
 *         message:
 *           type: string
 *           example: "The provided password is incorrect."
 *         code:
 *           type: integer
 *           example: 2004
 *         source:
 *           type: object
 *           properties:
 *             model:
 *               type: string
 *               example: "User"
 * 
 *     Error_500:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 500
 *         title:
 *           type: string
 *           example: "Internal Server Error"
 *         message:
 *           type: string
 *           example: "An unexpected error occurred."
 *         code:
 *           type: integer
 *           example: 5000
 * 
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
 * 
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP status code for unauthorized access
 *           example: 401
 *         title:
 *           type: string
 *           description: A short title describing the error
 *           example: "Unauthorized Access"
 *         message:
 *           type: string
 *           description: A detailed message explaining the error
 *           example: "You are not authorized to access this cart."
 *         code:
 *           type: integer
 *           description: Custom error code for easier identification
 *           example: 3001
 *         source:
 *           type: object
 *           description: Information about the source of the error
 *           properties:
 *             model:
 *               type: string
 *               description: The model associated with the error
 *               example: "Cart"
 * 
 *     BadRequestError:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         title:
 *           type: string
 *           example: "Bad Request"
 *         message:
 *           type: string
 *           example: "The request could not be understood or was missing required parameters."
 *         code:
 *           type: integer
 *           example: 1001
 *         source:
 *           type: object
 *           properties:
 *             model:
 *               type: string
 *               example: "Cart"
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