import * as sql from 'sqlite3'

const db = new sql.Database('./data.db')

let _isReady = false

async function prepareApp() {
  return new Promise((resolve, reject) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, data) => {
      try {
        if (err) return reject(err)
        if (!data || data?.length === 0) {
          const spoolTable =
            'CREATE TABLE IF NOT EXISTS tab_spools (spool_id INTEGER PRIMARY KEY AUTOINCREMENT, spool_title TEXT NOT NULL, spool_color TEXT NULL, spool_size INTEGER NULL, spool_qty INTEGER NULL);'
          db.exec(spoolTable)

          _isReady = true
          return resolve()
        }
      } catch (e) {
        return reject(e)
      }

      _isReady = true
      return resolve()
    })
  })
}

/**
 * Select data from the database
 * @param tableName {string}
 * @param selectObject {{columns: string[], where?: {column: string, type: string, value: string}[]}}
 * @return {Promise<any | any[]>}
 */
async function selectData(tableName, selectObject) {
  return new Promise((resolve, reject) => {
    if (!_isReady) return reject('Database is not ready')

    const query = `SELECT ${selectObject.columns.join(', ')} FROM ${tableName}`

    db.all(query, [], (error, rows) => {
      if (error) return reject(error)
      return resolve(rows)
    })
  })
}

async function insertData(tableName, insertObject) {
  return new Promise((resolve, reject) => {
    if (!_isReady) return reject('Database is not ready')
  })
}

async function updateData(tableName, updateObject) {
  return new Promise((resolve, reject) => {
    if (!_isReady) return reject('Database is not ready')
  })
}

export { prepareApp, selectData }
