// const express = require('express');
// const router = express.Router();
// const session = require('express-session');
// // ========== Logout Route ==========
// app.use(session({
//     secret: 'student1234', 
//     resave: false,
//     saveUninitialized: true
//   }));
//   app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//       if (err) {
//         console.error('Session destroy error:', err);
//         return res.status(500).send('Could not log out.');
//       }
//       res.redirect('/login'); // Redirect after logout
//     });
//   });

// const express = require('express');
// const router = express.Router();

// // Logout route
// router.get('/logout', (req, res) => {
//   if (!req.session) {
//     return res.redirect('/login');
//   }

//   req.session.destroy(err => {
//     if (err) {
//       console.error('Session destroy error:', err);
//       return res.status(500).send('Could not log out.');
//     }
//     res.redirect('/login'); // Redirect after logout
//   });
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const logoutController = require('../controllers/logoutController');

// // Call the controller
// router.get('/logout', logoutController.logout);

// module.exports = router;

