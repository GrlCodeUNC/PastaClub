// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");
// add User model to Meetup for foreign key to be added
var Users = require("./users.js");

// Creates a "meetup" model that matches up with DB
var Events = sequelize.define("events", {
  
  // Events title
  events_title: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      notEmpty: true
    }
  },
  // // Events date ... date is baked into start and end date below
  // Events_date: {
  //   type: Sequelize.DATEONLY,
  //   validate: {
  //     isDate: true,
  //     notNull: true,
  //     // isAfter: current date?
  //   }
  // },
  // Events start time w/ date
  events_start: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
      notNull: true
      // isAfter: current date?
    }
  },
  // Events end time w/ date
  events_end: {
    type: Sequelize.DATE,
    validate: {
      isDate: true
      // isAfter: start date?
    }
  },
  // Events host ID (foreign key from user table)
  // belongsTo statement to add user ID here
  // Events_hostID: {
  //   type: Sequelize.INTEGER,
  //   validate: {
  //     // need to figure out if we want to add anything here or now for validation
  //   }
  // },
  // Events description
  events_desc: {
    type: Sequelize.STRING,
    validate: {
      // do we need any validation here?
    }
  },
  // Events location street address
  events_loc_street_add: {
    type: Sequelize.STRING,
    validate: {
      // do we need any validation here?
    }
  },
  // Events location city
  events_loc_city: {
    type: Sequelize.STRING,
    validate: {
      // do we need any validation here?
    }
  },
  // Events location state
  events_loc_state: {
    type: Sequelize.STRING,
    validate: {
      isAlpha: true,
      len: [0,2]
      // do we need any validation here?
    }
  },
  // Events location zip code
  events_loc_zip: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
      len: [0,5]
      // do we need any validation here?
    }
  }
}, { timestamps: true });

// adds a UserID to the Events table
  // can be referenced by 'userId' as field name
Events.belongsTo(Users);

// Syncs with DB
Events.sync();

// Makes the Events Model available for other files (will also create a table)
module.exports = Events;