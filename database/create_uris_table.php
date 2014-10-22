<?php

require_once 'db.php';


$sql = "CREATE TABLE IF NOT EXISTS `uris` (
			`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
			`uri` varchar(255) COLLATE latin1_bin DEFAULT NULL,
			`short_key` varchar(6) COLLATE latin1_bin DEFAULT NULL,
			`date` int(10) DEFAULT NULL,
			`ip` varchar(255) COLLATE latin1_bin DEFAULT NULL,
			`hits` int(11) NOT NULL DEFAULT '0',
			PRIMARY KEY (`id`)
		) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin";

if ($db->query($sql)) {
	echo "Succesfully created uris table.\n";
}
