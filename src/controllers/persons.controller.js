const debug = require('debug')('app:personsController');
const SqlUtils = require('../utils/sql.utils');
const MongoUtils = require('../utils/mongo.utils');

class PersonsCotroller {
  static async getPage(req, res) {
    debug('getPersons');
    const sqlPersons = await SqlUtils.getAllPersons();
    const mongoPersons = await MongoUtils.getAllPersons();
    const persons = [...sqlPersons, ...mongoPersons];
    res.render('persons', { persons });
  }

  static async getPersonByIdMiddleware(req, res, next) {
    debug('getPersonByIdMiddleware', req.params);
    const { id } = req.params;
    let sqlPerson = null;
    let mongoPerson = null;
    sqlPerson = await SqlUtils.getSinglePerson(id);
    if (!sqlPerson) {
      mongoPerson = await MongoUtils.getSinglePerson({ id });
    }
    req.person = sqlPerson || mongoPerson;
    next();
  }

  static getPersonsById(req, res) {
    debug('getPersonById', req.person);
    res.render('person', { person: req.person });
  }
}

module.exports = PersonsCotroller;
