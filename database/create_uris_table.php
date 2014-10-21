<?php

require_once 'db.php';

$sql = 'CREATE TABLE IF NOT EXISTS `uris` (
			`id` int(11) NOT NULL auto_increment,
			`uri` varchar(255) default NULL,
			`short_key` varchar(6) default NULL,
			`date` int(10) default NULL,
			`ip` varchar(255) default NULL,
			`hits` int(11) default 0,
			PRIMARY_KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=latin1';

$db->query($sql);
