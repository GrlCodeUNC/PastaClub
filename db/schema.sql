-- * this portion of the schema file is for the localhost sestup
-- * Use if you need to recreate the database
DROP DATABASE IF EXISTS pastaclub_db;

-- * Create the `pastaclub_db`.
CREATE DATABASE pastaclub_db;

-- * Switch to or use the `pastaclub_db`.
USE pastaclub_db;

-- * Switch to or use the `a7modiih0x9hcu8b` for the heroku db view.
USE a7modiih0x9hcu8b;

-- * Tables will be created in the models portion of the application:

-- * Select all the rows from the users table to show what is currently there
SELECT * FROM users;

-- * Select all the rows from the users table to show what is currently there
SELECT * FROM events;

-- * Select all the rows from the users table to show what is currently there
SELECT * FROM meetups;

-- * DELETE FROM meetups WHERE user_google_token = 'google2';
DELETE FROM events WHERE id = 6;
-- * UPDATE meetups SET userId = 3 WHERE id = 9;
UPDATE meetups SET userId = 2 WHERE id = 11;

-- * Delete table 'meetups' from the database
-- * DROP TABLE events;
-- * DROP TABLE users;
-- * DROP TABLE meetups;

-- * ----------------------------------------------------------------------------------------------------------------
-- * THIS PORTION OF THE FILE IS FOR THE HEROKU HOSTING PORTION TO CREATE THE TABLES IN THE JAWSDB VERSION OF MYSQL
-- * ----------------------------------------------------------------------------------------------------------------

-- * Switch to or use the `a7modiih0x9hcu8b`.
USE a7modiih0x9hcu8b;

-- * create the users table for heroku
CREATE TABLE users 
(
	id INT AUTO_INCREMENT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    user_google_token VARCHAR,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

-- * create the EVENTS table for heroku
CREATE TABLE events 
(
	id INT AUTO_INCREMENT NOT NULL,
    events_title VARCHAR(255) NOT NULL,
    events_start TIMESTAMP NOT NULL,
    events_end TIMESTAMP NOT NULL,
    events_desc VARCHAR(1000),
    events_loc_street_add VARCHAR(255),
    events_loc_city VARCHAR(100),
    events_loc_state VARCHAR(2),
    events_loc_zip INTEGER(5),
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

-- * create the MEETUPS table for heroku
CREATE TABLE meetups 
(
	id INT AUTO_INCREMENT NOT NULL,
    on_waitlist BOOLEAN NOT NULL,
    comment_body VARCHAR(1000),
    event_item VARCHAR(255),
    userId INT NOT NULL,
    eventId INT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);