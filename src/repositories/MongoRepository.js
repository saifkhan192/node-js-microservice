
const mongodb = require('mongodb');

class MongoRepository {
  constructor(db, collectionName, entityClass) {
    this.collection = db.collection(collectionName)
    this.entityClass = entityClass
  }

  parseId(objId) {
    let objectId = objId
    if (objId.constructor.name === 'ObjectID') {
      objectId = objId
    } else {
      try {
        objectId = new mongodb.ObjectId(objId)
      } catch (error) { }
    }
    return objectId
  }

  getNewEntity(id) {
    return new this.entityClass({})
  }

  async getRawById(id) {
    return this.collection.findOne({ _id: this.parseId(id) })
  }

  async getById(id) {
    let item = await this.getRawById(id);
    return new this.entityClass(item || [])
  }

  async insertNew(entity) {
    this.validateEntity(entity)
    await this.collection.insertOne(entity.exportToMongo())
  }

  async removeById(id) {
    return this.collection.deleteOne({ _id: this.parseId(id) });
  }

  async getByFilters(filters = {}, options = {}) {
    let result = await this.collection.find(filters, options);
    return result;
  }

  validateEntity(entity) {
    if (entity.constructor.name !== this.entityClass.name) {
      throw Error('Given entity is of type ' + entity.constructor.name + ' instead of ' + this.entityClass.name)
    }
  }

  // for unit test only
  async drop() {
    return this.collection.drop();
  }
}

module.exports = MongoRepository;
