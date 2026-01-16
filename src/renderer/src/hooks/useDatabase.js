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
   * Executes a query on the database
   * @param query {string}
   * @return {Promise<*|*[]>}
   */
  const executeQuery = (query) => {
    return window.api.execute(query)
  }

  return { executeQuery, getData }
}
