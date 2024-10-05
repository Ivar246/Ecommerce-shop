export interface UploadFileType {
    main_image?: Express.Multer.File[],
    additional_images?: Express.Multer.File[]
}