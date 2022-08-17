import { connectToMongoose } from "./db-connection";
import { connect } from "mongoose";

jest.mock("mongoose", () => ({ connect: jest.fn() }));

describe("Db connection", () => {
  it("sets configuration correctly", () => {
    process.env.DB_CONNECTION = "A connection string";
    connectToMongoose();

    expect(connect).toHaveBeenCalledWith(process.env.DB_CONNECTION, {});
  });
});
