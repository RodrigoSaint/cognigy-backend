import { connect } from "mongoose";

const connectionProperties = {};

export const connectToMongoose = () =>
  connect(process.env.DB_CONNECTION, connectionProperties);
