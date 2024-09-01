import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { NotFoundError } from "../errors/notFound.error";

export class ProductService {
    productRepository: Repository<Product>
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    add(data: {}) {
        try {
            const product = this.productRepository.create(data);

            this.productRepository.save(product)

            return product

        } catch (error) {
            throw error
        }
    }

    async getOne(id: number) {
        try {
            const product = await this.productRepository.findOneBy({ id: id })
            if (!product)
                throw new NotFoundError(`Product with id ${id} not found`)
            return product
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        try {
            const products = await this.productRepository.find();


            return products;
        } catch (error) {
            throw error
        }
    }

    delete(id: number) {
        try {
            const product = this.productRepository.findOneBy({ id: id })
            if (!product)
                throw new NotFoundError(`Product with id ${id} not found`)

            this.productRepository.delete(id);

            return;
        }
        catch (error) {
            throw error
        }
    }
}