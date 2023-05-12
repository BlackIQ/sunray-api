import { Client, Upload } from "$app/models/index.js";
import { getDate, getTime } from "$app/functions/index.js";
import { botConfig } from "$app/config/index.js";

import axios from "axios";

export const RAY = async (req, res) => {
  const date = getDate();
  const time = getTime() === "PM" ? "morning" : "night";

  try {
    const clients = await Client.find().select("chatId");

    const upload = await Upload.findOne({ date, time });

    await Promise.all(
      clients.map(async (client) => {
        const url = `https://api.telegram.org/bot${botConfig.token}/sendPhoto`;

        try {
          const { data } = await axios.post(url, {
            chat_id: client.chatId,
            photo: upload.fileId,
          });
        } catch (error) {
          console.log(error.message);
        }
      })
    );

    return res.status(200).send({ message: "Done" });
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
