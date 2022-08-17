import express from "express";
import { json } from "body-parser";
import carRoute from "car/route";
import StatusCode from "status-code-enum";

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.headers["x-api-key"] !== process.env.API_KEY) {
    res.status(StatusCode.ClientErrorUnauthorized).send();
    return;
  }
  next();
};

const setMiddlewares = (app: express.Application) => {
  app.use(auth);
  app.use(json());

  app.use("/car", carRoute);
};

export const startServer = () => {
  const app = express();

  setMiddlewares(app);

  app.listen(process.env.PORT, () => {
    /* tslint:disable no-console */
    console.log(`Started to listen on ${process.env.PORT}`);
  });
};
