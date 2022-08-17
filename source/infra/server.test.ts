import { startServer } from "./server";
import express from "express";
import carRouter from "car/route";

jest.mock("express", () => jest.fn().mockReturnValue(jest.fn()));
jest.mock("car/route", () => ({}));

describe("Server", () => {
  it("sets configuration correctly", () => {
    const app = {
      use: jest.fn(),
      listen: jest.fn(),
    };
    process.env.PORT = 1234;

    (express as unknown as jest.Mock).mockReturnValue(app);

    startServer();

    expect(app.use).toHaveBeenCalledTimes(3);
    expect(app.use).toHaveBeenCalledWith("/car", carRouter);
    expect(app.listen).toHaveBeenCalledWith(
      process.env.PORT,
      expect.any(Function)
    );
  });
});
