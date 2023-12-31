const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // const postData = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //     {
    //       model: Comment,
    //       attributes: ['comment_text', 'date_created', 'user_id'],
    //     }
    //   ],
    // });

    const users = userData.map((projects) => projects.get({ plain: true }));
    // const posts = postData.map((data) => data.get({ plain: true }));

    res.render('homepage', {
      users,
      // posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  
});

module.exports = router;
