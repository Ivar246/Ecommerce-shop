import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { NotFoundError } from "../errors/notFound.error";
import { CreateProductDto } from "../dto";
import { BadRequestError } from "../errors";

export class ProductService {
    private productRepository: Repository<Product>
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    async add(data: CreateProductDto) {

        try {

            const isProdExist = await this.productRepository.findOne({ where: { name: data.name } })

            if (isProdExist)
                throw new BadRequestError(`product with name ${data.name} already exist`)

            const product = new Product();

            product.name = data.name
            product.available_quantity = data.available_quantity
            product.price = data.price
            product.description = data.description
            product.imageUrl = data.imageUrl || null

            const savedProduct = await AppDataSource.manager.save(Product, product)

            return savedProduct

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

    async delete(id: number) {
        try {
            const product = await this.productRepository.findOneBy({ id: id })
            if (!product)
                throw new NotFoundError(`Product with id ${id} not found`)

            await this.productRepository.delete(id);
            return;
        }
        catch (error) {
            throw error
        }
    }
}