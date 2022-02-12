class EntityList extends Array {
  constructor (items, entityClass) {
    super()
    this.entityClass = entityClass
    this.importFromMongo(items)
  }

  getItem (index,
    defaultVal = null) {
    return index > -1 && index < this.length ? this[index] : defaultVal
  }

  clear () {
    while (this.length) {
      this.pop()
    }
  }

  importFromMongo (result = []) {
    this.clear() // empty array
    result.forEach(doc => {
      const item = new this.entityClass(doc)
      this.push(item)
    })
    return this
  }

  exportToMongo () {
    const arr = []
    this.forEach(element => {
      arr.push(element.exportToMongo())
    })
    return arr
  }

  toArray () {
    const arr = []
    this.forEach(element => {
      arr.push(element.toArray())
    })
    return arr
  }
}

module.exports = EntityList;
