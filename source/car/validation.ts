import Ajv from "ajv";

const ajv = new Ajv();

const baseCarSchemaValidation = {
  type: "object",
  properties: {
    brand: { type: "string" },
    color: { type: "string" },
    model: { type: "string" },
    year: { type: "number" },
    price: { type: "number" },
  },
  required: ["brand"],
  additionalProperties: false,
};

export const validateCarCreation = ajv.compile(baseCarSchemaValidation);
export const validateCarUpdate = ajv.compile({
  ...baseCarSchemaValidation,
  required: [],
});
