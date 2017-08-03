const data = require('../user.js');
const talents=require('../skillz.js')
const secrets=require('../secrets.js')

module.exports = {
  getName(req, res, next) {
    res.json(data.name);
  },
  getLocation(req, res, next) {
    res.json(data.location);
  },
  getOccupations(req, res, next) {
    if (req.query.order) {
      if (req.query.order === 'desc') {
        res.json(data.occupations.sort().reverse())
      } else {
        res.json(data.occupations.sort())
      }
    } else {
      res.json(data.occupations);
    }
  },
  getLatestJob(req, res, next) {
    res.json(data.occupations[data.occupations.length - 1])
  },
  getHobbies(req, res, next) {
    if (req.params.type) {
      res.json(data.hobbies.filter(function(cur) {
        return cur.type.toLowerCase() === req.params.type.toLowerCase();
      }))
    } else {
      res.json(data.hobbies)
    }
  },
  getFam(req, res, next) {
    if (req.params.gender) {
      res.json(data.family.filter(cur => req.params.gender.toLowerCase() === cur.gender.toLowerCase()))
    } else {
      res.json(data.family)
    }
  },
  getFood(req, res, next) {
    if (req.query.rating) {
      res.json(data.restaurants.filter(cur => cur.rating >= 2))
    }
    if (req.params.name) {
      res.json(data.restaurants.filter(cur => cur.name.toLowerCase() === req.params.name.toLowerCase()))
    } else {
      res.json(data.restaurants)
    }
  },
  setName(req, res, next) {
    data.name = req.body.name;
    res.json(data.name);
  },
  setLocation(req, res, next) {
    if (req.body.location) {
      data.location = req.body.location;
      res.json(data.location);
    } else {
      res.status(403).res.json("Request cannot be blank");
    }
  },
  addHobbies(req, res, next) {
    if (req.body.name && req.body.type) {
      data.hobbies.push({
        name: req.body.name,
        type: req.body.type
      });
      res.json(data.hobbies)
    } else {
      res.status(403).json("Request needs a name and type");
    }
  },
  addJobs(req, res, next) {
    if (req.body.job) {
      data.occupations.push(req.body.job);
      res.json(data.occupations);
    } else {
      res.status(403).json("Request needs a job");
    }
  },
  addFamily(req, res, next) {
    if (req.body.name && req.body.relation && req.body.gender) {
      data.family.push({
        name: req.body.name,
        relation: req.body.relation,
        gender: req.body.gender
      })
      res.json(data.family);
    } else {
      res.status(403).json("Request needs a name, relation, and gender");
    }
  },
  addRestaurant(req, res, next) {
    if (req.body.name && req.body.type &&req.body.rating) {
      data.restaurants.push({name:req.body.name,type:req.body.type,rating:req.body.rating})
      res.json(data.restaurants)
    } else {
      res.status(403).json("Request needs a name, type, and rating");
    }
  },

  getSkillz(req,res,next){
    req.query.experience ? res.json(talents.skills.filter(val=>val.experience.toLowerCase()===req.query.experience.toLowerCase())):res.json(talents.skills)
  },
  addSkill(req,res,next){
    if(req.body.name && req.body.experience){
      talents.skills.push({id:req.body.id, name:req.body.name, experience:req.body.experience})
      res.json(talents.skills);
    }else{
      res.status(403).json("Request needs name and experience")
    }
  },

  getSecrets(req,res,next){
    res.json(secrets.secrets)
  }
}





















//
