const express=require('express');
const bodyParser=require('body-parser');
// const myData=require('./user')
const middleware=require('./controllers/middleware.js')
const mainCtrl=require('./controllers/mainCtrl.js')

const app=express();

app.use(middleware.addHeaders);
app.use(bodyParser.json());



app.listen(3000,function(){
  console.log("Listening to port 3000!!!");
})

app.get('/name',mainCtrl.getName);
app.get('/location',mainCtrl.getLocation);
app.get('/occupations',mainCtrl.getOccupations);
app.get('/occupations/latest',mainCtrl.getLatestJob);
app.get('/hobbies',mainCtrl.getHobbies);
app.get('/hobbies/:type',mainCtrl.getHobbies);
app.get('/family',mainCtrl.getFam);
app.get('/family/:gender',mainCtrl.getFam);
app.get('/restaurants',mainCtrl.getFood);
app.get('/restaurants/:name',mainCtrl.getFood);

app.put('/name',mainCtrl.setName);
app.put('/location',mainCtrl.setLocation);

app.post('/hobbies',mainCtrl.addHobbies);
app.post('/occupations',mainCtrl.addJobs);
app.post('/family',mainCtrl.addFamily);
app.post('/restaurants',mainCtrl.addRestaurant);


app.get('/skillz',mainCtrl.getSkillz);
app.post('/skillz',middleware.generateId,mainCtrl.addSkill)


app.get('/secrets/:username/:pin',middleware.verifyUser,mainCtrl.getSecrets)





//
