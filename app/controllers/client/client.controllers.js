import { Client } from "$app/models/index.js";

export const ALL = async (req, res) => {
  try {
    const clients = await Client.find();

    return res.status(200).send(clients);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const SINGLE = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.find({ chatId: Number(id) });

    if (!client) {
      return res.status(200).send({ message: "User not found" });
    }

    return res.status(200).send(client);
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

export const UPDATE = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const client = await Client.findByIdAndUpdate(id, { $set: data });

    if (!client) {
      return res.status(200).send({ message: "Client not found" });
    }

    return res.status(200).send({ message: "Client updated" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
