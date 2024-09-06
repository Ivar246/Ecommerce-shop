import { EntityManager, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { NotFoundError } from "../errors/notFound.error";
import { CreateProductDto, UpdateProductDto } from "../dto";
import { BadRequestError } from "../errors";

export class ProductService {
    private productRepository: Repository<Product>
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    async add(data: CreateProductDto): Promise<Product> {

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

    async getOne(id: number): Promise<Product> {
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

    async delete(id: number): Promise<void> {
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

    async update(product_id: number, data: UpdateProductDto): Promise<UpdateResult> {
        try {
            // find product
            const product = await this.productRepository.findOne({ where: { id: product_id } })
            if (!product) {
                throw new BadRequestError(`product with id ${product_id} doesn'tesixt`)
            }

            const updatedProduct = await this.productRepository.update(product_id, data);

            return updatedProduct;
        } catch (error) {
            throw error
        }
    }

}