import env from "$app/env/index.js";

export default {
  mongo: {
    atlas: env.MONGO_ATLAS,
    host: env.MONGO_HOST,
    port: env.MONGO_PORT,
    collection: env.MONGO_COLLECTION,
  },
};
