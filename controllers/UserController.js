const User = require("../models/User");
const passport = require("passport");

const UserData = require("../data/UserData");
const _userData = new UserData();


const RequestService = require("../services/RequestService");
// Displays registration form.
exports.Register = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    res.render("user/register", {
      title: "Register", // Add your desired title here
      errorMessage: "",
      user: {},
      reqInfo: reqInfo
    });
  };
  
// Handles 'POST' with registration form submission.
exports.RegisterUser = async function (req, res) {
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  if (password == passwordConfirm) {
    // Creates user object with mongoose model.
    // Note that the password is not present.
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
    });
    // Uses passport to register the user.
    // Pass in user object without password
    // and password as next parameter.
    User.register(
      new User(newUser),
      req.body.password,
      function (err, account) {
        // Show registration form with errors if fail.
        if (err) {
          let reqInfo = RequestService.reqHelper(req);
          return res.render("user/register", {
            user: newUser,
            errorMessage: err,
            reqInfo: reqInfo,
          });
        }
        // User registration was successful, so let's immediately authenticate and redirect to home page.
        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      }
    );
  } else {
    let reqInfo = RequestService.reqHelper(req);
    res.render("user/register", {
      user: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
      },
      title: "Register Failed",
      errorMessage: "Passwords do not match.",
      reqInfo: reqInfo,
    });
  }
};


// Show login form.
exports.Login = async function (req, res) {
    let reqInfo = RequestService.reqHelper(req);
    let errorMessage = req.query.errorMessage;
    res.render("user/login", {
      title: "Login", // Add the title here
      user: {},
      errorMessage: errorMessage,
      reqInfo: reqInfo
    });
};
// Receive login information, authenticate, and redirect depending on pass or fail.
exports.LoginUser = async (req, res, next) => {
  console.log("TESTTTTTT!!!")
  passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/login?errorMessage=Invalid login.",
  })(req, res, next);
};

exports.Profile = async function (req, res) {
  console.log("THIS IS THE PROFIIIILEEE!!!!")
  let reqInfo = RequestService.reqHelper(req);
  if (reqInfo.authenticated) {
    let roles = await _userData.getRolesByUsername(reqInfo.username);
    let sessionData = req.session;
    sessionData.roles = roles;
    reqInfo.roles = roles;
    let userInfo = await _userData.getUserByUsername(reqInfo.username);
    return res.render("user/profile", {
      title: "User Profile",
      reqInfo: reqInfo,
      userInfo: userInfo,
    });
  } else {
    res.redirect(
      "/user/login?errorMessage=You must be logged in to view this page."
    );
  }
};

exports.EditProfile = async function(req, res) {
  console.log("EDIT PROFILE!!!!!")
  try {
    // Replace 'username' with the correct way you get the username from the request
    const username = req.params.username || req.session.username; 
    const response = await _userData.getUserByUsername(username);

    if (response && response.user) {
      // Render the profile edit form with the user's current data
      res.render('profile-edit-form', {
        title: 'Edit Profile',
        userProfile: response.user,
        errorMessage: '',
        username: username
      });
    } else {
      // If no user is found, redirect to a not found page or show an error message
      res.status(404).render('error-page', {
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).render('error-page', {
      message: 'Server error while retrieving user profile'
    });
  }
};

exports.SubmitEditProfile = async function(req, res) {
  try {
    const username = req.params.username || req.session.username; 
    const { email, firstName, lastName } = req.body;

    // Find the user by username
    let userResponse = await _userData.getUserByUsername(username);
    if (userResponse && userResponse.user) {
      // Update the user profile
      let updatedUser = await User.findOneAndUpdate(
        { username: username },
        { $set: { email, firstName, lastName } },
        { new: true }
      );

      if (updatedUser) {
        // If the update is successful, redirect to the profile page
        res.redirect('/user/profile');
      } else {
        // If the user could not be updated, show an error message
        res.render('profile-edit-form', {
          title: 'Edit Profile',
          userProfile: req.body,
          errorMessage: 'Error updating profile'
        });
      }
    } else {
      // If no user is found, redirect to a not found page or show an error message
      res.status(404).render('error-page', {
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).render('error-page', {
      message: 'Server error while updating user profile'
    });
  }
};
  
  // Log user out and direct them to the login screen.
  exports.Logout = (req, res) => {
    // Use Passports logout function
    req.logout((err) => {
      if (err) {
        console.log("logout error");
        return next(err);
      } else {
        // logged out. Update the reqInfo and redirect to the login page
        let reqInfo = RequestService.reqHelper(req);
        res.render("user/login", {
          title:"Logout",
          user: {},
          isLoggedIn: false,
          errorMessage: "",
          reqInfo: reqInfo,
        });
      }
    });
  };


  
  