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
            'CREATE TABLE IF NOT EXISTS tab_spools (spool_id INTEGER PRIMARY KEY AUTOINCREMENT, spool_title TEXT NOT NULL, spool_mat_id INTEGER NOT NULL, spool_color TEXT NULL, spool_size INTEGER NULL, spool_qty INTEGER NULL, spool_price DECIMAL NULL);'
          db.exec(spoolTable)

          const materialTable =
            'CREATE TABLE IF NOT EXISTS tab_materials (mat_id INTEGER PRIMARY KEY AUTOINCREMENT, mat_title TEXT NOT NULL, mat_std_price DECIMAL NULL);'
          db.exec(materialTable)

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

    let query = `SELECT ${selectObject.columns.join(', ')} FROM ${tableName}`

    if (selectObject.where) {
      query += buildWhere(selectObject.where)
    }

    execute(query)
      .then((res) => {
        return resolve(res)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

/**
 * Execute a query on the database
 * @param query {string}
 * @return {Promise<* | *[]>}
 */
async function execute(query) {
  return new Promise((resolve, reject) => {
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

/**
 * Builds the where clause for the query
 * @param whereObject {{column: string, type: string, value: string}[]}
 * @return {string}
 */
function buildWhere(whereObject) {
  let whereClause = 'WHERE 1 = 1'

  whereObject.forEach((value) => {
    switch (value.type) {
      case 'equals':
        whereClause += ` AND ${value.column} = '${value.value}'`
        break
      case 'notEquals':
        whereClause += ` AND ${value.column} <> '${value.value}'`
        break
      case 'greater':
        whereClause += ` AND ${value.column} > ${value.value}`
        break
      case 'greaterEquals':
        whereClause += ` AND ${value.column} >= ${value.value}`
        break
      case 'less':
        whereClause += ` AND ${value.column} < ${value.value}`
        break
      case 'lessEquals':
        whereClause += ` AND ${value.column} <= ${value.value}`
        break
      case 'like':
        whereClause += ` AND ${value.column} like '%${value.value}%'`
        break
    }
  })

  return whereClause
}

export { prepareApp, execute, selectData }
