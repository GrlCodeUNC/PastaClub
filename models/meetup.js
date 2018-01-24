// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");
// add User model to Meetup for foreign key to be added
var User = require("users.js");

// Creates a "meetup" model that matches up with DB
var Meetup = sequelize.define("meetup", {
  
  // meetup title
  meetup_title: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  // // meetup date
  // meetup_date: {
  //   type: Sequelize.DATEONLY,
  //   validate: {
  //     isDate: true,
  //     notNull: true,
  //     // isAfter: current date?
  //   }
  // },
  // meetup start time w/ date
  meetup_start: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
      notNull: true
      // isAfter: current date?
    }
  },
  // meetup end time w/ date
  meetup_end: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
      // isAfter: start date?
    }
  },
  // meetup host ID (foreign key from user table)
  // belongsTo statement to add user ID here
  // meetup_hostID: {
  //   type: Sequelize.INTEGER,
  //   validate: {
  //     // need to figure out if we want to add anything here or now for validation
  //   }
  // },
  // meetup end time w/ date
  meetup_end: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
      // isAfter: start date?
    }
  },
}, { timestamps: true });

// adds a UserID to the MeetUp table
Meetup.belongsTo(User);

// Syncs with DB
Meetup.sync();

// Makes the meetup Model available for other files (will also create a table)
module.exports = meetup;