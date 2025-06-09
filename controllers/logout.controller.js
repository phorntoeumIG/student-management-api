// controllers/logoutController.js

// exports.logout = (req, res) => {
//     if (!req.session) {
//       return res.redirect('/login');
//     }
  
//     req.session.destroy(err => {
//       if (err) {
//         console.error('Logout failed:', err);
//         return res.status(500).send('Logout error');
//       }
//       res.redirect('/login');
//     });
//   };
  