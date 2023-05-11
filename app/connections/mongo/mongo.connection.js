import mongoose from "mongoose";

import { databaseConfig, appConfig } from "$app/config/index.js";

const { mongo } = databaseConfig;

const url = appConfig.production
  ? mongo.atlas
  : `mongodb://${mongo.host}:${mongo.port}/${mongo.collection}`;

const connection = mongoose.createConnection(url, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to mongo db.");
  }
});

export default connection;
