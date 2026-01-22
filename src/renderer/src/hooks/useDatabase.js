/**
 * @param table {string?}
 */
export default function useDatabase(table) {
  /**
   * @param selectionObject {{columns: string[], where?: {column: string, type: string, value: string}[]}}
   * @return {Promise<*|*[]>}
   */
  const getData = (selectionObject) => {
    if (!table) throw new Error('Cannot use the getData function without a specified table')
    return window.api.selectData(table, selectionObject)
  }

  /**
   * @param insertObject {* | *[]}
   * @return {Promise<*>}
   */
  const addData = (insertObject) => {
    if (!table) throw new Error('Cannot use the addData function without a specified table')
    return window.api.insertData(table, insertObject)
  }

  /**
   * @param updateObject {{values: *, where?: {column: string, type: string, value: *}[]}}
   * @return {Promise<*|*[]>}
   */
  const updData = (updateObject) => {
    if (!table) throw new Error('Cannot use the updData function without a specified table')
    return window.api.updateData(table, updateObject)
  }

  /**
   * @param keyField {string}
   * @param keyValue {*}
   * @return {Promise<*|*[]>}
   */
  const delData = (keyField, keyValue) => {
    if (!table) throw new Error('Cannot use the updData function without a specified table')
    return window.api.deleteData(table, keyField, keyValue)
  }

  /**
   * Executes a query on the database
   * @param query {string}
   * @return {Promise<*|*[]>}
   */
  const executeQuery = (query) => {
    return window.api.execute(query)
  }

  return { executeQuery, getData, addData, updData, delData }
}
