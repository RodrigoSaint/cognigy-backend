import service from "./service";
import repository from "car/repository";

jest.mock("car/repository", () => ({
  findMetadata: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  updatePartially: jest.fn(),
  removeById: jest.fn(),
}));

describe("Car Service", () => {
  describe("Creation", () => {
    it("validates a car", async () => {
      const carRequest = { brand: null };
      const result = await service.create(carRequest as any);

      expect(repository.create).not.toHaveBeenCalled();
      expect(result.type).toBe("validation-error");
    });
    it("if valid creates a car", async () => {
      const carRequest = { brand: "bmw" };
      await service.create(carRequest);

      expect(repository.create).toHaveBeenCalledWith(carRequest);
    });
  });

  it("lists car", async () => {
    const carList = [{ brand: "audi" }];
    (repository.findMetadata as jest.Mock).mockResolvedValue(carList);
    const result = await service.getListMetadata();

    expect(result.data).toBe(carList);
    expect(repository.findMetadata).toHaveBeenCalled();
  });

  it("shows car details", async () => {
    const car = { brand: "audi" };
    (repository.findById as jest.Mock).mockResolvedValue(car);
    const id = "1234";
    const result = await service.getDetails(id);

    expect(result.data).toBe(car);
    expect(repository.findById).toHaveBeenCalledWith(id);
  });

  it("updates car", async () => {
    const car = { brand: "audi" };
    (repository.updatePartially as jest.Mock).mockResolvedValue(car);
    const id = "1234";
    const result = await service.update(id, car);

    expect(result.data).toBe(car);
    expect(repository.updatePartially).toHaveBeenCalledWith(id, car);
  });

  it("deletes a car", async () => {
    (repository.removeById as jest.Mock).mockResolvedValue(null);
    const id = "1234";
    await service.remove(id);

    expect(repository.removeById).toHaveBeenCalledWith(id);
  });
});
