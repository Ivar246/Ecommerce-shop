import { NextFunction, Response, Request } from "express";
import { ProductService } from "../service/product.service";
import { ProdReqParam } from "../interface";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { auditLog } from "../utils/auditLogger";
import { AuditLogAction, LogType } from "../enums";
import { ProductNotFoundError } from "../errors";

class ProductController {

    private productService: ProductService

    constructor() {
        this.productService = new ProductService()
    }

    addProduct = async (req: Request<{}, {}, CreateProductDto>, res: Response, next: NextFunction) => {
        try {
            const result = await this.productService.add(req.body)

            auditLog({
                action: AuditLogAction.CREATE,
                message: "Create new product",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Product",
                user: req.user.role,
                email: req.user.email
            })

            return res.status(201).json({ data: result })
        }
        catch (error) {
            next(error)
        }
    }

    updateProduct = async (req: Request<ProdReqParam, {}, UpdateProductDto>, res: Response, next: NextFunction) => {
        try {
            const result = await this.productService.update(req.params.product_id, req.body)

            auditLog({
                action: AuditLogAction.CREATE,
                message: "Create new product",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Product",
                user: req.user.role,
                email: req.user.email
            })

            return res.status(201).json({ data: result })
        }
        catch (error) {
            next(error)
        }
    }

    removeProduct = async (req: Request<ProdReqParam>, res: Response, next: NextFunction) => {
        try {
            await this.productService.delete(req.params.product_id)

            auditLog({
                action: AuditLogAction.DELETE,
                message: "Remove Product",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Product",
                user: req.user.role,
                email: req.user.email
            })

            res.status(200).json({ message: "Product deleted successfully" })
        } catch (error) {
            next(error)
        }
    }

    getProduct = async (req: Request<ProdReqParam>, res: Response, next: NextFunction) => {
        try {
            const product = await this.productService.getOne(req.params.product_id)

            res.status(200).json({ data: product })

            auditLog({
                action: AuditLogAction.CREATE,
                message: "Create new product",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Product",
                user: req.user.role,
                email: req.user.email
            })
        } catch (error) {
            next(error)
        }
    }

    getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.productService.getAll()

            res.status(200).json({ data: products })

            auditLog({
                action: AuditLogAction.READ,
                message: "Fetch products",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Product",
                user: req.user.role,
                email: req.user.email
            })

            return
        }
        catch (error) {
            next(error)
        }
    }
}


export const productController = new ProductController

