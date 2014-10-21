<?php

require_once '../database/db.php';

class UriClass {

	public function __construct()
	{
		if (!empty($_GET['uri'])) {
			$sql = 'SELECT uri
					FROM uris
					WHERE short_key = \'' . addslashes($_GET['uri']). '\'';
		}

		if (isset($_POST['uri']) && $_POST['uri'] != 'Enter URI') {
			$this->insertUri($_POST['uri']);
		}
	}

	private function insertUri($uri)
	{
		// Get short key
		$shortKey = $this->getShortKey();

		// Insert URI into table
		$sql = 'INSERT INTO uris (uri, short_key, ip, date
				VALUES(
					:uri,
					:short_key,
					:ip,
					:date
				))';

		$db->prepare($sql);
		$db->execute(array(
			':uri'		 => addslashes($_POST['uri']),
			':short_key' => $shortKey,
			':ip'		 => $_SERVER['REMOTE_ADDR'],
			':date'		 => time()
		));

		// Redirect back to miniuri.me with short key.
		header('Location: ?short=' . $shortKey);
	}

	private function _getShortKey()
	{
		return substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 5);
	}
}
