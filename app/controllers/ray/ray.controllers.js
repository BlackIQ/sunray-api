import { Client, Upload } from "$app/models/index.js";
import { botConfig } from "$app/config/index.js";

import axios from "axios";

export const RAY = async (req, res) => {
  try {
    const clients = await Client.find().select("chatId");

    const { fileId: photo } = await Upload.findOne().sort({
      createdAt: "desc",
    });

    await Promise.all(
      clients.map(async (client) => {
        const url = `https://api.telegram.org/bot${botConfig.token}/sendPhoto`;

        try {
          const { data } = await axios.post(url, {
            chat_id: client.chatId,
            photo,
          });

          console.log(data);
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
