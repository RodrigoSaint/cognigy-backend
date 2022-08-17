import { Router } from "express";
import StatusCode from "status-code-enum";

import carService from "car/service";
import { sendServiceResponse } from "utils/service";

const carRouter = Router();

carRouter.get("/", async (req, res) => {
  sendServiceResponse(res, () => carService.getListMetadata());
});

carRouter.get("/:id", async (req, res) => {
  sendServiceResponse(res, () => carService.getDetails(req.params.id));
});

carRouter.post("/", async (req, res) => {
  sendServiceResponse(res, () => carService.create(req.body));
});

carRouter.patch("/:id", async (req, res) => {
  sendServiceResponse(res, () => carService.update(req.params.id, req.body));
});

carRouter.delete("/:id", async (req, res) => {
  await carService.remove(req.params.id);
  res.status(StatusCode.SuccessNoContent).send();
});

export default carRouter;
