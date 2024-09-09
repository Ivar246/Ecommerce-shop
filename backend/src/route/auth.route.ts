import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { validateRefreshToken } from "../middleware/refreshTokenValidator.middleware";

const router = Router()

/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: User login
 *     description: Authenticates a user and returns an access token upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *                 description: The email address of the user trying to log in.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *                 description: The password for the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Successfully logged in user with access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                   description: JWT token for authenticated user.
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                   description: Success message.
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               InvalidEmail:
 *                 summary: "Email format is invalid"
 *                 value:
 *                   code: 477
 *                   title: "INVALID FORMAT"
 *                   message: "The email address provided is not in a valid format."
 *               InvalidPassword:
 *                 summary: "Password does not match"
 *                 value:
 *                   code: 4926
 *                   title: "INVALID DATA RECEIVED"
 *                   message: "The password provided is incorrect."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/login", authController.login)

router.post("/register", authController.register)

router.get("/tokens", validateRefreshToken, authController.getRefreshToken)
export default router