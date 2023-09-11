import localforage from 'localforage'


const localforageInstance = localforage.createInstance({
  name:'home',
  driver: localforage.LOCALSTORAGE, //简单场景使用localstorage
})


export default {
  localforageInstance
}