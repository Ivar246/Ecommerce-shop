export interface CreateProductDto {
    name: string
    description?: string
    price: number
    imageUrl?: string
    available_quantity: number
}