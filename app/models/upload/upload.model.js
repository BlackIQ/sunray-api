import { mongo } from "$app/connections/index.js";

import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = Schema(
  {
    fileId: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    isSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongo.model("Upload", schema);
