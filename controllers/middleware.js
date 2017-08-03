const talents=require('../skillz.js')
const secrets=require('../secrets.js')

module.exports = {

  addHeaders: function(req, res, next) {
    res.status(200).set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    });



    next();
  },

  generateId(req,res,next){
    req.body.id=talents.skills.length+1;
    next();
  },

  verifyUser(req,res,next){
    if(req.params.username===secrets.username && req.params.pin===secrets.PIN){
      next();
    }else{
      res.status(403).json("No access")
    }
  }
}
