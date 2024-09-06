import { Express, Request, Response } from "express"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mini Blog API',
            description: "API endpoints for a mini blog services documented on swagger",
            contact: {
                name: "Desmond Obisi",
                email: "info@miniblog.com",
                url: "https://github.com/DesmondSanctity/node-js-swagger"
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
    apis: ['./src/route/*.ts', "./src/entity/*.ts"]
}

const swaggerSpec = swaggerJsDoc(options)

function swaggerDocs(app: Express, port: number) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get("docs.json", (req: Request, res: Response) => {
        res.json(swaggerSpec);
    })

    console.log(`docs available at http://localhost:${port}/api-docs`)
}

export default swaggerDocs