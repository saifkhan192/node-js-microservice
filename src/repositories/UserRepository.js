const UserEntity = require('../entities/UserEntity');

class UserRepository {
  constructor (dbs) {
    // this.pool = dbs.mysqlDbMain;
    this.connection = dbs.mysqlDbMain;
    this.pk = 'id';
    this.table = 'users';
    this.entityClass = UserEntity;
  }

  getNewEntity () {
    const newEntity = new this.entityClass({})
    return newEntity
  }

  getRawById (id) {
    const query = 'SELECT * FROM `' + this.table + '` where ' + this.pk + ' = ? limit 1';
    return this.connection.query(query, [id]).then((results) => {
      results = results[0];
      // console.log(results);
      let res = null;
      if (results && results.length > 0) {
        res = results[0];
      }
      // console.log(res);

      return Promise.resolve(res)
    });
  }

  insertNew (entity) {
    const cols = [];
    const values = [];
    Object.keys(entity).forEach((key) => {
      if (key !== this.pk && key !== 'created_at') {
        // query = 'query' + query + 'ok';
        cols.push(key);
        values.push(entity[key]);
      }
      // console.log(entity[key]);
    });
    // cols = cols.join(',');
    // values = values.join(',' );
    console.log(cols);
    console.log(values);

    return this.connection.query('insert into `users` (?) values (?)', [cols, values])
      .then((results) => {
        // console.log(results);
        return Promise.resolve(results[0])
      });
  }

  getById (id) {
    return this.getRawById(id).then((row) => {
      return new this.entityClass(row || {});
    });
  }

  getByFilters (filters) {
    console.log(filters);
    return this.connection.query('SELECT * FROM `users` order by ? limit ?', ['name', 1]).then((results) => {
      console.log(results);
      return Promise.resolve(results[0])
    });

    return this.connection.execute('SELECT * FROM `users` order by name limit 5', ['name', 14]).then((results) => {
      console.log(results[0]);
      // console.log(results);
      // console.log(fields);
      // console.log(result);

      // const [rows, fields] = result;

      // console.log(fields);
      // res.sendJson(rows);
      return Promise.resolve(results[0])
    });

    // super(dbs.mysqlDbMain, 'users', UserEntity)
  }
}

module.exports = UserRepository;
