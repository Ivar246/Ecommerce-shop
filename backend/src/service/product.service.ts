import { EntityManager, Equal, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { NotFoundError } from "../errors/notFound.error";
import { CreateProductDto, UpdateProductDto } from "../dto";
import {
  BadRequestError,
  ImageNotFound,
  ProductNotFoundError,
} from "../errors";
import { Multer } from "multer";
import { UploadFileType } from "../interface";
import { Image } from "../entity/Image";
import { deleteFile } from "../utils/deleteFile";
import path from "path";
import { ProductView } from "../entity/ProductView";

export class ProductService {
  private productRepository: Repository<Product>;
  private imageRepository: Repository<Image>;
  private productViewRepository: Repository<ProductView>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.imageRepository = AppDataSource.getRepository(Image);
    this.productViewRepository = AppDataSource.getRepository(ProductView);
  }

  async add(data: CreateProductDto, files: UploadFileType): Promise<Product> {
    try {
      const isProdExist = await this.productRepository.findOne({
        where: { name: data.name },
      });

      const mainImagePath = files.main_image[0].path;

      const additionalImagesPath = files.additional_images
        ? files.additional_images.map((additionalImage) => additionalImage.path)
        : [];

      if (isProdExist)
        throw new BadRequestError(
          `product with name ${data.name} already exist`
        );

      const product = new Product();

      product.name = data.name;
      product.available_quantity = data.available_quantity;
      product.price = data.price;
      product.description = data.description;
      product.mainImageUrl = mainImagePath;
      const savedProduct = await AppDataSource.manager.save(Product, product);

      for (const imagePath of additionalImagesPath) {
        let image = new Image();
        image.url = imagePath;
        image.product = savedProduct;

        await this.imageRepository.save(image);
      }

      const prod = this.productRepository.findOne({
        where: { id: savedProduct.id },
        relations: ["images"],
      });

      return prod;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: number, ip: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOneBy({ id: id });
      if (!product) throw new NotFoundError(`Product with id ${id} not found`);

      let productView = await this.productViewRepository.findOne({
        where: {
          productId: id,
          ip: ip,
        },
      });

      if (!productView) {
        productView = new ProductView();
        productView.ip = ip;
        productView.productId = product.id;
        await this.productViewRepository.save(productView);

        product.view_count += 1;
        await this.productRepository.save(product);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const products = await this.productRepository.find();

      return products;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
        relations: ["images"],
      });

      if (!product) throw new NotFoundError(`Product with id ${id} not found`);

      const imagesPathToDelete = [
        product.mainImageUrl,
        ...product.images.map((img) => img.url),
      ];
      await this.productRepository.delete(id);

      for (let imagePath of imagesPathToDelete) {
        await deleteFile(path.resolve(__dirname, "..", "..", imagePath));
      }

      return;
    } catch (error) {
      throw error;
    }
  }

  async update(
    product_id: number,
    data: UpdateProductDto
  ): Promise<UpdateResult> {
    try {
      // find product
      const product = await this.productRepository.findOne({
        where: { id: product_id },
      });
      if (!product) {
        throw new BadRequestError(`product with id ${product_id} doesn'tesixt`);
      }

      const updatedProduct = await this.productRepository.update(
        product_id,
        data
      );

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  upload = async (productId: number, filePath: string) => {
    try {
      console.log(productId);

      const product = await this.productRepository.findOne({
        where: { id: Equal(productId) },
      });
      console.log(product);
      if (!product) {
        throw new ProductNotFoundError("Product with the id not found!");
      }
      const image = this.imageRepository.create({
        url: filePath,
        product: product,
      });

      await this.imageRepository.save(image);

      return {
        image: image,
        message: `image for product with id ${productId} has been saved successfully.`,
      };
    } catch (error) {
      throw error;
    }
  };

  removeImage = async (imageId: number) => {
    try {
      const image = await this.imageRepository.findOneBy({ id: imageId });

      if (!image) {
        throw new ImageNotFound(`image with id ${imageId} not found`);
      }

      const deleteResult = await this.imageRepository.delete({ id: imageId });
      await deleteFile(path.resolve(__dirname, "..", "..", image.url));
      return {
        message: `image with id ${imageId} has beed deleted successfully.`,
      };
    } catch (error) {
      throw error;
    }
  };
}
