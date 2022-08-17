import { connectToMongoose } from "infra/db-connection";
import { startServer } from "infra/server";

connectToMongoose().then(startServer);
