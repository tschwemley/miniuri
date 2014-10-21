<?php

require_once 'db.php';

$sql = 'CREATE TABLE IF NOT EXISTS `uris` (
			`id` int(11) NOT NULL auto_increment,
			`uri_link` varchar(255) default NULL,
			`uri_short` varchar(6) default NULL,
			`uri_date` int(10) default NULL,
			`uri_ip` varchar(255) default NULL,
			`uri_hits` int(11) default 0,
			PRIMARY_KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=latin1';

$db->query($sql);
