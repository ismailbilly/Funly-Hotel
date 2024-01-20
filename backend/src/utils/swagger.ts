import express, { Express, Request, Response } from "express";
import swaggerJsdocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { version } from "../../package.json";

const options: swaggerJsdocs.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BillHolidays Docs",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/index.ts",
    "./src/routes/*.ts",
   
  ],
};

const swaggerSpec = swaggerJsdocs(options);

function swaggerDocs(app: Express) {
  //swagger page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
