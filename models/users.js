// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// console.log("user model here");

// Creates a "Users" model that matches up with DB
var Users = sequelize.define("user", {
  
  // User email
  user_email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  // User Name
  user_name: {
    type: Sequelize.STRING,
    validate: {
      // is: ["^[a-z]+$",'i']
    }
  },
  // User Google ID Token
  user_google_token: {
    type: Sequelize.TEXT,
    validate: {
      // need to figure out if we want to add anything here or now for validation
    }
  },
  
  // createdAt default values defined
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW(),
  },
  
  // updatedAt default values defined
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW(),
  },
}, { timestamps: true });

console.log("user table here");

// Syncs with DB
Users.sync();

// Makes the User Model available for other files (will also create a table)
module.exports = Users;