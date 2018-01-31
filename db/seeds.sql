-- * Switch to or use the `a7modiih0x9hcu8b` - heroku db name
USE pastaclub_db;

INSERT INTO users 
	(user_email, user_name, user_google_token) 
	VALUES 
	('abreaw@hotmail.com', 'Brea Torres', 'tokenID 1'),
	('miriam@gmail.com', 'Miriam Banano', 'tokenID 2'),
	('anisha@live.com', 'Anisha Patel', 'tokenID 3'),
	('saima@yahoo.com', 'Saima Zia', 'tokenID 4');


INSERT INTO events
	(events_title, events_start, events_end, events_desc, events_loc_street_add, events_loc_city,
	events_loc_state, events_loc_zip, userId)
	VALUES
	('Spaghetti Feast', '2018-02-20 18:30:00', '2018-02-20 21:00:00', 
		'Join us for spaghetti night, bring a sauce or drink to share','102 My House Lane',
		'Raleigh', 'NC', 27571, 1),
	('Linguine Night', '2018-03-20 18:30:00', '2018-03-20 21:00:00',
		'Join us for a fun time with linguine night, bring a sauce or drink to share',
		'102 My House Lane', 'Raleigh', 'NC', 27571, 4),
	('Pasta Luego', '2018-04-20 18:30:00', '2018-04-20 21:00:00',
		'We are heading to Italy for a while to celebrate, bring a sauce or drink to share',
		'102 My House Lane', 'Raleigh', 'NC', 27571, 1),
	('Reds Only', '2018-05-20 18:30:00', '2018-05-20 21:00:00',
		'Join us for a fun time with linguine night, bring a sauce or drink to share',
		'102 My House Lane', 'Raleigh', 'NC', 27571, 3);
        
INSERT INTO meetups
	(userId, eventId, comment_body, event_item)
	VALUES
	(4, 1, 'Looking forward to it!', 'Bringing a bottle of red wine'),
	(1, 1, 'Yay spaghetti!', 'I will bring some homemade marinara sauce - vegan style'),
	(4, 4, 'I love red wine!', 'I will bring some merlot'),
	(2, 3, 'So sad you guys will not be here for the next event', 'I will bring some dessert to share');
    
-- * Used for reset of db when models rebuilt differently
-- * DROP TABLE meetups FROM pastaclub_db;


	



