const jwt = require('jsonwebtoken')
const instructor = require('../Models/Instructor');
const corporatetrainee=require('../Models/CorporateTrainee');
const individualtrainee =require('../Models/IndividualTrainee');

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
     
    req.user = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth
//tut code
// const jwt = require('jsonwebtoken');

// const requireAuth = (req, res, next) => { // fl logout bab3at cookie bas mafihash token fa jwt cookie b null
//   const token = req.cookies.jwt;
    
//   // check json web token exists & is verified
//   if (token) { // fi data gayali fl token msh null(logout)
//     jwt.verify(token, 'supersecret', (err, decodedToken) => { //hal heya of type supersecrret? if yes
//       if (err) {
//         // console.log('You are not logged in.');
//         // res send status 401 you are not logged in
//         res.status(401).json({message:"Request is not authorized"})
//         // res.redirect('/login');
//       } else {
//        // req.user=await
//         console.log(decodedToken);
//         next(); //fire next funtion
//       }
//     });
//   } else {
//     res.status(401).json({message:"Authorization token required"})
//   }
// };


// module.exports = { requireAuth };
