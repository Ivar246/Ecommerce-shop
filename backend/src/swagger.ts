import { Express, Request, Response } from "express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce Api',
            description: "API endpoints for a ecommerce platform",
            contact: {
                name: "Ravi Shrestha",
                email: "ravistha869@gmail.com",
                url: "https://github.com/Ivar246/Ecommerce-shop"
            },
            version: '1.0.0',
        },
        servers: [
            {
                url: "http://localhost:4000/",
                description: "Local server"
            }
        ]
    },
    servers: [
        {
            url: "http://localhost:4000/api",
            description: "Local server"
        },
    ],
    apis: ['./src/route/*.ts', "./src/entity/*.ts", "./src/interface/*.ts"]
}

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs(app: Express, port: number) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.use("/docs.json", (req: Request, res: Response) => {
        res.json(swaggerSpec);
    })

    console.log(`docs available at http://localhost:${port}/api-docs`)
}

export default swaggerDocs