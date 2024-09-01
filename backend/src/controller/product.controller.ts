import { NextFunction, Response, Request } from "express";
import { ProductService } from "../service/product.service";
import { ProdReqParam } from "../interface";
import { CreateProductDto } from "../dto";

class ProductController {
    productService: ProductService

    constructor() {
        this.productService = new ProductService()
    }

    addProduct = (req: Request<{}, {}, CreateProductDto>, res: Response, next: NextFunction) => {
        try {
            const result = this.productService.add(req.body)

            res.status(201).json({ data: result })
        }
        catch (error) {
            next(error)
        }
    }

    removeProduct(req: Request<ProdReqParam>, res: Response, next: NextFunction) {
        try {
            this.productService.delete(req.params.id)
            res.json()
        } catch (error) {
            next(error)
        }
    }

    async getProduct(req: Request<ProdReqParam>, res: Response, next: NextFunction) {
        try {
            const product = await this.productService.getOne(req.params.id)
            res.status(200).json({ data: product })
        } catch (error) {
            next(error)
        }
    }

    getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.productService.getAll()

            res.status(200).json({ data: products })
        }
        catch (error) {
            next(error)
        }
    }
}

export const productController = new ProductController

