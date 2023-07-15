
const handleError = (err, req, res, next) =>{
    console.log(err.stack)

}

module.exports = handleError