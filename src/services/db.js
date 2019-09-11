// read db data
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(`${__dirname}/../data/db.json`)
//lowdb
const low = require('lowdb')
const db = low(adapter)

// set default data
const defaultData = require('../data/default-data.json')
db.defaults(defaultData).write()

module.exports = db
