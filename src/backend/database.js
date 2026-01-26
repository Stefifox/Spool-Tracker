import * as sql from 'sqlite3'
import * as sqlite from 'node:sqlite'

const db = new sql.Database('./data.db')

let _isReady = false

// TODO: Improve error handling, table creation and values management

const tables = [
  {
    name: 'tab_spools',
    query:
      "CREATE TABLE IF NOT EXISTS tab_spools (spool_id INTEGER PRIMARY KEY AUTOINCREMENT, spool_title TEXT NOT NULL, spool_mat_id INTEGER NOT NULL, spool_color TEXT NULL default '#ffffff', spool_size INTEGER NULL, spool_qty INTEGER NULL default 1, spool_price DECIMAL NULL);"
  },
  {
    name: 'tab_materials',
    query:
      'CREATE TABLE IF NOT EXISTS tab_materials (mat_id INTEGER PRIMARY KEY AUTOINCREMENT, mat_title TEXT NOT NULL, mat_std_price DECIMAL NULL);'
  },
  {
    name: 'tab_settings',
    query:
      'CREATE TABLE IF NOT EXISTS tab_settings (sett_id INTEGER PRIMARY KEY AUTOINCREMENT, sett_key TEXT NOT NULL, sett_value TEXT NOT NULL);'
  },
  {
    name: 'v_spools',
    query:
      'CREATE VIEW v_spools AS SELECT * FROM tab_spools LEFT JOIN tab_materials ON tab_spools.spool_mat_id = tab_materials.mat_id'
  }
]

async function prepareApp() {
  return new Promise((resolve, reject) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, data) => {
      try {
        if (err) return reject(err)
        if (!data || data?.length === 0) {
          tables.forEach(({ query }) => {
            db.exec(query)
          })

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
 * @param selectObject {{columns: string[], where?: {column: string, type: string, value: *}[]}}
 * @return {Promise<any | any[]>}
 */
async function selectData(tableName, selectObject) {
  return new Promise((resolve, reject) => {
    if (!_isReady) return reject('Database is not ready')

    let query = `SELECT ${selectObject.columns.join(', ')} FROM ${tableName} `

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
 * Insert data into a table
 * @param tableName {string}
 * @param insertObject {* | *[]}
 * @return {Promise<>}
 */
async function insertData(tableName, insertObject) {
  return new Promise((resolve, reject) => {
    if (!_isReady) return reject('Database is not ready')

    const isArray = Array.isArray(insertObject)

    const columns = []
    const valuesList = []

    if (isArray) {
      columns.push(...extractKeys(insertObject))
    } else {
      columns.push(...Object.keys(insertObject))
    }

    const keys = columns.filter((element) => columns.includes(element))
    const keyString = keys.join(',')

    if (isArray) {
      insertObject.forEach((item) => {
        valuesList.push(`(${extractValues(keys, item)})`)
      })
    } else {
      valuesList.push(`(${extractValues(keys, insertObject)})`)
    }

    const query = `INSERT INTO ${tableName}(${keyString})
                                VALUES ${valuesList.join(',')}`

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
 * Update the content of a specified table
 * @param tableName {string}
 * @param updateObject {{values: *, where?: {column: string, type: string, value: *}[]}}
 * @return {Promise<>}
 */
async function updateData(tableName, updateObject) {
  return new Promise((resolve, reject) => {
    if (!_isReady) return reject('Database is not ready')

    const updVal = updateObject.values

    const columns = Object.keys(updVal)

    const updList = []
    columns.forEach((col) => {
      updList.push(`${col} = '${updVal[col]}'`)
    })

    const query =
      `UPDATE ${tableName} SET ${updList.join(', ')} ` +
      (updateObject.where ? buildWhere(updateObject.where) : '')

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
 * Deletes a value from the specified table
 * @param tableName {string}
 * @param keyField {string}
 * @param keyValue {*}
 * @return {Promise<>}
 */
async function deleteData(tableName, keyField, keyValue) {
  return new Promise((resolve, reject) => {
    if (!_isReady) return reject('Database is not ready')

    const query = `DELETE FROM ${tableName} WHERE ${keyField} = '${keyValue}'`

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

function extractKeys(obj) {
  const tmpObj = []

  obj.forEach((item) => {
    const keys = Object.keys(item)
    tmpObj.push(...keys)
  })

  return tmpObj.filter(function (item, pos) {
    return tmpObj.indexOf(item) === pos
  })
}

function extractValues(keys, obj) {
  const currentValues = []
  keys.forEach((modelKey) => {
    currentValues.push(getValue(modelKey, obj))
  })
  return currentValues
}

function getValue(key, obj) {
  const value = obj[key]?.toString()
  if (!value) return 'null'
  return `'${value}'`
}

export { prepareApp, execute, selectData, insertData, updateData, deleteData }
