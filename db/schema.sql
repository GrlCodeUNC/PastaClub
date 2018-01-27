DROP DATABASE IF EXISTS pastaclub_db;

-- * Create the `pastaclub_db`.
CREATE DATABASE pastaclub_db;

-- * Switch to or use the `pastaclub_db`.
USE pastaclub_db;

-- * Tables will be created in the models portion of the application:

-- * Select all the rows from the users table to show what is currently there
SELECT * FROM users;

-- * Select all the rows from the users table to show what is currently there
SELECT * FROM events;

-- * Select all the rows from the users table to show what is currently there
SELECT * FROM meetups;

-- * DELETE FROM meetups WHERE user_google_token = 'google2';

-- * Delete table 'meetups' from the database
-- * DROP TABLE meetups;
