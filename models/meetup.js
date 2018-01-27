// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// add User model to Meetup for foreign key to be added
var Events = require("./events.js");
// add User model to Meetup for foreign key to be added
var Users = require("./users.js");

// Creates a "meetup" model that matches up with DB
var Meetup = sequelize.define("meetup", {
  
  // On Waitlist
  on_waitlist: {
    type: Sequelize.BOOLEAN,
    notNull: true,
    defaultValue: false,
    validate: {
      // what is needed to validate here?
    }
  },

  // Comments about what the user is bringing or other info
  comment_body: {
    type: Sequelize.STRING,
    validate: {
      // do we need to validate here?
    }
  }
  
}, { timestamps: true });

// adds a EventID to the MeetUp table
  // can be referenced by 'eventId' as field name
Meetup.belongsTo(Events);
// adds a UserID to the MeetUp table
  // can be referenced by 'userId' as field name
Meetup.belongsTo(Users);

// Syncs with DB
Meetup.sync();

// Makes the meetup Model available for other files (will also create a table)
module.exports = Meetup;