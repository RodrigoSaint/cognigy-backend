import mongoose from "mongoose";

const MODEL_NAME = "Car";

interface Car {
  brand: string;
  color: string;
  model: string;
  year: number;
  price: number;
}

interface CarMetadata {
  brand: string;
  year: number;
}

interface CarSchemaMethod {
  findMetadata(): Promise<CarMetadata[]>;
  removeById(id: string): Promise<void>;
  updatePartially(
    id: string,
    car: Partial<Car>
  ): Promise<Car & { _id: string }>;
}

const CarSchema = new mongoose.Schema<Car, {}, CarSchemaMethod>({
  brand: { type: String, required: true },
  color: String,
  model: String,
  year: Number,
  price: Number,
});

CarSchema.statics.findMetadata = () => {
  return mongoose.model(MODEL_NAME).find({}, { brand: 1, year: 1 });
};

CarSchema.statics.removeById = async (id: string) => {
  await mongoose.model(MODEL_NAME).remove({ _id: id });
};

CarSchema.statics.updatePartially = (id: string, car: Partial<Car>) => {
  return mongoose
    .model(MODEL_NAME)
    .findByIdAndUpdate({ _id: id }, { $set: car });
};

const CarModel = mongoose.model<Car, CarSchemaMethod & mongoose.Model<Car>>(
  MODEL_NAME,
  CarSchema
);

export default CarModel;
