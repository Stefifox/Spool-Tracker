import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  selectData: (tableName, selectObject) =>
    ipcRenderer.invoke('db:selectData', { tableName, selectObject }),
  insertData: (tableName, insertObject) =>
    ipcRenderer.invoke('db:insertData', { tableName, insertObject }),
  updateData: (tableName, updateObject) =>
    ipcRenderer.invoke('db:updateData', { tableName, updateObject }),
  deleteData: (tableName, keyField, keyValue) =>
    ipcRenderer.invoke('db:deleteData', { tableName, keyField, keyValue }),
  execute: (query) => ipcRenderer.invoke('db:execute', query)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
