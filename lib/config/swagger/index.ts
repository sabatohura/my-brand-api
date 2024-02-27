import * as swaggerJsdoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My brand api",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:5000/`,
      },
      {
        url: "https://my-brand-api-04bc.onrender.com/",
      },
    ],
  },
  apis: ["./../../routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
