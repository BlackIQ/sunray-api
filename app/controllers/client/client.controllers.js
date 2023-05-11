import { Client } from "$app/models/index.js";
import { botConfig } from "$app/config/index.js";

import axios from "axios";

export const ALL = async (req, res) => {
  try {
    const clients = await Client.find();

    return res.status(200).send(clients);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const CREATE = async (req, res) => {
  const data = req.body;

  try {
    const client = await Client.findOne({ chatId: Number(data.chatId) });

    if (client) {
      return res.status(400).send({ message: "You are already a user" });
    }

    await Client.create(data);

    return res.status(200).send({ message: "You are in from now on!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const DELETE = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findOneAndDelete({ chatId: Number(id) });

    if (!client) {
      return res.status(200).send({ message: "User not found" });
    }

    return res.status(200).send({ message: "You are deleted from the list" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const TEST = async (req, res) => {
  try {
    const clients = await Client.find();

    await Promise.all(
      clients.map(async (client) => {
        console.log(`Going for ${client.chatId}, ${client.type}`);

        const url = `https://api.telegram.org/bot${botConfig.token}/sendPhoto`;

        const photo =
          "https://cdn.amirhossein.info/sunray/may-11-2023-night.jpg";

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
