import * as swaggerJsdoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My Brand App Api",
      description:
        "All on one app for my portifolio, blog and client management",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "https://my-brand-api-04bc.onrender.com",
        description: "Render Deployed Version",
      },
      {
        url: "/",
        description: "Local",
      },
    ],
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
