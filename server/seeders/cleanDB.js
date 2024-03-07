const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    const modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray()

    console.log(modelExists.length);
    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
