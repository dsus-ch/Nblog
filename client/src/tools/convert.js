function getTokenFromLocalStorage(){
  const objString = localStorage.getItem('user')
  if(objString){
    const obj =  JSON.parse(objString)
    return obj ? obj.token : obj
  }
  return null
}



export {
  getTokenFromLocalStorage
}