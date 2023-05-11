import { Upload } from "$app/models/index.js";

export const ALL = async (req, res) => {
  try {
    const uploads = await Upload.find();

    return res.status(200).send(uploads);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const CREATE = async (req, res) => {
  const data = req.body;

  try {
    await Upload.create(data);

    return res.status(200).send({ message: "File saved" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const DELETE = async (req, res) => {
  const { id } = req.params;

  try {
    const upload = await Upload.findByIdAndDelete(id);

    if (!upload) {
      return res.status(200).send({ message: "Upload not found" });
    }

    return res.status(200).send({ message: "Upload deleted" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const UPDATE = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const upload = await Upload.findByIdAndUpdate(id, { $set: data });

    if (!upload) {
      return res.status(200).send({ message: "Upload not found" });
    }

    return res.status(200).send({ message: "Upload updated" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
