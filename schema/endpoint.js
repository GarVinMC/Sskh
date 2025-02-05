const swaggerUi = require("swagger-ui-express");
const config = require("./config");
const { SwaggerTheme, SwaggerThemeNameEnum } = require("swagger-themes");

const theme = new SwaggerTheme();
const inUrl = "Please input URL!";
const inQuery = "Please input Query!";

const options = {
  customSiteTitle: config.options.webName,
  customfavIcon: config.options.favicon,
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
  ],
  customCssUrl: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
  ],
  customCss: `${theme.getBuffer(SwaggerThemeNameEnum.DARK)}.topbar { display: none; }`,
  swaggerOptions: {
    displayRequestDuration: true,
  },
};

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: config.options.name,
    description: config.options.description,
    version: "1.0.0",
    "x-logo": {
      url: config.options.favicon,
      altText: config.options.name,
    },
  },
  servers: [
    {
      url: config.host.BASE_URL,
    },
  ],
  tags: [
    {
      name: "Search Api",
      description: "API endpoint in Indonesia.",
    },
  ],
  paths: {
    "/api/kalender/harilibur": {
      get: {
        tags: ["Harilibur"],
        summary: "Get Public Holidays in Indonesia",
        parameters: [
          {
            in: "query",
            name: "year",
            schema: {
              type: "string",
            },
            required: true,
            description: "Please input the year to retrieve holidays.",
          },
        ],
        responses: {
          200: {
            description: "Holidays for the requested year",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: true,
                    },
                    developer: {
                      type: "string",
                      example: config.options.developer,
                    },
                    result: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          date: {
                            type: "string",
                            example: "2025-01-01",
                          },
                          holiday_name: {
                            type: "string",
                            example: "Tahun Baru",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Missing year parameter",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false,
                    },
                    result: {
                      type: "string",
                      example: "Please input parameter year!",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "No holidays found for the given year",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false,
                    },
                    result: {
                      type: "string",
                      example: "Error, Invalid JSON Result",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "boolean",
                      example: false,
                    },
                    result: {
                      type: "string",
                      example: "Error, Service Unavailable",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "x-request-time": new Date().toISOString(),
};

module.exports = { swaggerDocument, options };
