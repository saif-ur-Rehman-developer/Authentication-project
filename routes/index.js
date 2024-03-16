var express = require('express');
var router = express.Router();
const useModel = require('./users')


const passport = require('passport');
const localStrategy = require('passport-local');

// Use Here 

passport.use(new localStrategy(useModel.authenticate()))


// register route  

router.post('/register',function(req,res){
  var userdata= new useModel({
    username: req.body.username,
    secret:req.body.secret,
  })

  useModel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req,res,()=>{
      res.redirect('/profile')
    })
  })

})


// LOG out logic


router.get('/logout',(req,res,next)=>{

  req.logOut(function(err){
    if(err){
      return next(err)
    }
    res.redirect('/')
  })
}
  
)

// login  

router.post('/login',passport.authenticate('local',{
  successRedirect:'profile',
  failureRedirect:'/'

}),function(req,res)
{}
)


// code for checking if user is login or not not you can use it like i use in profile route 


function IsLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}

/* GET home page. */
router.get('/', function(req, res, ) {
  res.render('index');
});
router.get('/profile', IsLoggedIn, function(req, res, ) {
  res.render('profile');
});

module.exports = router;
