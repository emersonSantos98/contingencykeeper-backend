import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";

// src/Utils/error-handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  console.log(error);
  if (error instanceof ZodError) {
    return reply.status(400).send({
      success: false,
      message: "Error during validation",
      errors: error.flatten().fieldErrors
    });
  }
  if (error instanceof BadRequest) {
    return reply.status(400).send({
      success: false,
      message: error.message
    });
  }
  return reply.status(500).send({
    success: false,
    error: "Internal server error"
  });
};

export {
  errorHandler
};
