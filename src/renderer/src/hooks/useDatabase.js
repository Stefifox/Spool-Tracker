/**
 * @param table {string}
 */
export default function useDatabase(table) {
  /**
   * @param selectionObject {{columns: string[], where?: {column: string, type: string, value: string}[]}}
   * @return {Promise<*|*[]>}
   */
  const getData = (selectionObject) => {
    return window.api.selectData(table, selectionObject)
  }

  return { getData }
}
