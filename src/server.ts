import express, {Request, Response, NextFunction } from "express";
import cors from 'cors';
import "express-async-errors";
import "./database";
import "./shared/container";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { AppError } from "./errors/AppError";
import path from "path";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/filesfinanceControl', express.static(path.resolve(__dirname, '..', 'tmp', 'so_images')))
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }
  return response.status(500).json({
    status: "error",
    message: `Internal server error -${err.message}`,
  })
});

app.listen(3333, () => console.log("Server started on port 3333"));
