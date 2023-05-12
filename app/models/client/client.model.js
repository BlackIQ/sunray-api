import { mongo } from "$app/connections/index.js";

import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = Schema(
  {
    chatId: {
      type: Number,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    isStoped: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongo.model("Client", schema);
