// ----------------------------------------------
// jwt.middleware.js
// ----------------------------------------------
// JWT Middleware.
// Check the autorization ( Bearer token ).

import JWT from "jsonwebtoken";

import { Client } from "$app/models/index.js";
import { appConfig } from "$app/config/index.js";

const jwt = async (req, res, next) => {
  // ----------------------------------------------
  // jwt()
  // ----------------------------------------------
  // First chec that the request contains autorization or not.
  // Then, chec that client is exist or not.
  // If all got ok, the request autotization is valid.

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = JWT.verify(token, appConfig.secret);

    const client = await Client.findById(id);

    if (client === null) {
      return res.status(401).send({ message: "Unautorized" });
    }

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unautorized" });
  }
};

export default jwt;
