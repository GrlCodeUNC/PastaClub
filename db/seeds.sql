INSERT INTO users 
	(user_email, user_name, user_google_token, createdAt, updatedAt) 
	VALUES 
	('abreaw@hotmail.com', 'Brea Torres', 'tokenID 1', NOW(), NOW()),
	('miriam@gmail.com', 'Miriam Banano', 'tokenID 2', NOW(), NOW()),
	('anisha@live.com', 'Anisha Patel', 'tokenID 3', NOW(), NOW()),
	('saima@yahoo.com', 'Saima Zia', 'tokenID 4', NOW(), NOW());


INSERT INTO events
	(events_title, events_start, events_end, events_desc, events_loc_street_add, events_loc_city,
	events_loc_state, events_loc_zip, userId, createdAt, updatedAt)
	VALUES
	('Spaghetti Feast', '2018-02-20 18:30:00', '2018-02-20 21:00:00', 
		'Join us for spaghetti night, bring a sauce or drink to share','102 My House Lane',
		'Raleigh', 'NC', 27571, 1, NOW(), NOW()),
	('Linguine Night', '2018-03-20 18:30:00', '2018-03-20 21:00:00',
		'Join us for a fun time with linguine night, bring a sauce or drink to share',
		'102 My House Lane', 'Raleigh', 'NC', 27571, 4, NOW(), NOW()),
	('Pasta Luego', '2018-04-20 18:30:00', '2018-04-20 21:00:00',
		'We are heading to Italy for a while to celebrate, bring a sauce or drink to share',
		'102 My House Lane', 'Raleigh', 'NC', 27571, 1, NOW(), NOW()),
	('Reds Only', '2018-05-20 18:30:00', '2018-05-20 21:00:00',
		'Join us for a fun time with linguine night, bring a sauce or drink to share',
		'102 My House Lane', 'Raleigh', 'NC', 27571, 3, NOW(), NOW());
        
INSERT INTO meetups
	(userId, eventId, comment_body, event_item, createdAt, updatedAt)
	VALUES
	(4, 5, 'Looking forward to it!', 'Bringing a bottle of red wine', NOW(), NOW()),
	(6, 5, 'Yay spaghetti!', 'I will bring some homemade marinara sauce - vegan style', NOW(), NOW()),
	(4, 8, 'I love red wine!', 'I will bring some merlot', NOW(), NOW()),
	(5, 7, 'So sad you guys will not be here for the next event', 'I will bring some dessert to share',
		NOW(), NOW());

DROP TABLE meetups FROM pastaclub_db;


	



