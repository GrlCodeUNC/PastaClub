var Sequelize = require("sequelize");
var env = require("dotenv");

env.config();

var sequelize;


if(process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  }
  else{
    sequelize = new Sequelize("pastaclub_db", process.env.DB_USER, process.env.DB_PSWD, {  
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
  });
  }

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
