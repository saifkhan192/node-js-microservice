class MongoBaseEntity {
  constructor (dbData) {
    if (dbData === null) {
      dbData = {}
    }
    this.importFromMongo(dbData)
  }

  objToArray (value) {
    if (value instanceof Array) {
      return value
    }

    if (value instanceof Object) {
      return Object.values(value)
    }
    throw Error('objToArray failed.')
  }

  toMongoArray (result) {
    const arr = []
    result.forEach(element => {
      arr.push(element.exportToMongo())
    })
    return arr
  }

  // default implemetation, child class must overide this method
  toArray () {
    return this.exportToMongo()
  }
}

module.exports = MongoBaseEntity;
