import { Client, Upload } from "$app/models/index.js";
import { botConfig } from "$app/config/index.js";

import axios from "axios";

export const RAY = async (req, res) => {
  const { time } = req.query;

  try {
    const clients = await Client.find().select("chatId");

    const upload = await Upload.findOne({ time, isSent: false });

    if (!upload) {
      return res.status(404).send({ message: "No item found" });
    }

    await Upload.findByIdAndUpdate(upload._id, { $set: { isSent: true } });

    await Promise.all(
      clients.map(async (client) => {
        const url = `https://api.telegram.org/bot${botConfig.token}/sendPhoto`;

        try {
          await axios.post(url, {
            chat_id: client.chatId,
            photo: upload.fileId,
          });
        } catch (error) {
          console.log(error.message);
        }
      })
    );

    return res.status(200).send({ message: "Done", upload });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const STAT = async (req, res) => {
  try {
    const clients = await Client.find();

    const data = {
      all: clients.length,
      privates: clients.filter((client) => client.type === "private").length,
      groups: clients.filter((client) => client.type === "group").length,
    };

    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
