const EntityList = require('../entities/EntityList');

const mongodb = require('mongodb');

class MongoRepository {
  constructor (db, collectionName, entityClass) {
    this.collection = db.collection(collectionName)
    this.entityClass = entityClass
  }

  parseId (objId) {
    // https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
    let objectId = objId
    if (objId.constructor.name === 'ObjectID') {
      objectId = objId
    } else {
      try {
        objectId = new mongodb.ObjectId(objId)
      } catch (error) {
        console.log(error)
      }
    }
    return objectId
  }

  getNewEntity (id) {
    const newEntity = new this.entityClass({})
    return newEntity
  }

  getRawById (id) {
    return this.collection.findOne({ _id: this.parseId(id) })
  }

  getById (id) {
    // this.ok(1).
    return this.getRawById(id).then(result => {
      const entity = new this.entityClass(result || [])
      return Promise.resolve(entity)
    })
  }

  getByFilters (filters = {}, options = {}) {
    // return this.getById('608e9ec290bc0800f16e0bbf');
    return this.collection.find(filters, options).toArray().then(result => {
      const entityList = new EntityList(result, this.entityClass)
      return Promise.resolve(entityList)
    })
  }

  validateEntity (entity) {
    if (entity.constructor.name !== this.entityClass.name) {
      throw Error('Given entity is of type ' + entity.constructor.name + ' instead of ' + this.entityClass.name)
    }
  }

  insertNew (entity) {
    this.validateEntity(entity)
    const action = this.collection.insertOne(entity.exportToMongo())
    return action.then(result => {
      // console.log(result.insertedId);
      // console.log(result.insertedCount);
      if (result.insertedId) {
        const data = result.ops && result.ops.length ? result.ops[0] : {}
        return Promise.resolve(new this.entityClass(data))
      } else {
        return Promise.resolve(null)
      }
    })
  }

  removeById (id) {
    return this.collection.deleteOne({ _id: this.parseId(id) }).then(result => {
      return Promise.resolve(result.deletedCount)
    })
  }

  removeAll () {
    return this.collection.deleteMany({}).then(result => {
      return Promise.resolve(result.deletedCount)
    })
  }

  drop () {
    return this.collection.drop().then(result => {
      return Promise.resolve(result)
    })
  }
}

module.exports = MongoRepository;
