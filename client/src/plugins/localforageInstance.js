import localforage from 'localforage'


export const localforageInstance = localforage.createInstance({
  name:'home',
  driver: localforage.LOCALSTORAGE, //简单场景使用localstorage
})