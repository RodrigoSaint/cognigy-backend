import CarModel from "car/repository";
import { ServiceResponse } from "utils/service";
import { validateCarCreation, validateCarUpdate } from "./validation";

interface Car {
  _id: string;
  brand: string;
  color?: string;
  model?: string;
  year?: number;
  price?: number;
}

interface CarCreationRequest extends Omit<Car, "_id"> {}

const getListMetadata = async () => ({
  type: "success" as const,
  data: await CarModel.findMetadata(),
});

const getDetails = async (id: string) => ({
  type: "success" as const,
  data: await CarModel.findById(id),
});

const create = async (
  carCreationRequest: CarCreationRequest
): Promise<ServiceResponse<Car>> => {
  const isValid = validateCarCreation(carCreationRequest);
  if (!isValid) return { type: "validation-error" };

  const car = await CarModel.create(carCreationRequest);
  return { data: car as unknown as Car, type: "success" };
};

const update = async (
  id: string,
  carUpdate: Partial<CarCreationRequest>
): Promise<ServiceResponse<Car>> => {
  const isValid = validateCarUpdate(carUpdate);
  if (!isValid) return { type: "validation-error" };

  const car = await CarModel.updatePartially(id, carUpdate);
  return { data: car, type: "success" };
};

const remove = async (id: string) => ({
  type: "success" as const,
  data: await CarModel.removeById(id),
});

export default {
  create,
  getListMetadata,
  getDetails,
  remove,
  update,
};
