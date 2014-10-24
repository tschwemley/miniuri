<?php


class UriClass {

	protected $db;

	/**
	 * UriClass Constructor
	 *
	 * If URI is set by POST (form submission), adds the uri to the database. If URI is set by GET, grabs the redirect
	 * URI from the database and sets up the redirect
	 *
	 * @param mixed $db
	 */
	public function __construct($db)
	{
		$this->db = $db;

		if (!empty($_GET['uri'])) {

			// Get the URI to redirect to
			$sql = 'SELECT uri
					FROM uris
					WHERE short_key = :short_key';

			$stmt = $this->db->prepare($sql);
			$stmt->execute(array(
				':short_key' => addslashes($_GET['uri'])
			));

			$uri = $stmt->fetch()['uri'];

			// Set up redirect
			header('HTTP/1.1 301 Moved Permanently');
			header('Location: '. $uri);

		}

		if (isset($_POST['uri']) && $_POST['uri'] != 'Enter URI') {
			$this->insertUri(addslashes($_POST['uri']));
		}
	}

	/**
	 * Insert URI into URI table
	 *
	 * @param string $uri
	 */
	private function insertUri($uri)
	{
		// Get short key
		$shortKey = $this->_getShortKey();

		// Check if the URI is already added, if so grab the short key.
		$sql = 'SELECT short_key FROM uris WHERE uri = :uri';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':uri' => $uri));

		if ($existingShortKey = $stmt->fetch()) {

			$shortKey = $existingShortKey['short_key'];
		} else {

			// Insert URI into table
			$sql = 'INSERT INTO uris (uri, short_key, ip, date)
					VALUES(
						:uri,
						:short_key,
						:ip,
						:date
					)';

			$this->db->prepare($sql)
				->execute(array(
					':uri'		 => $uri,
					':short_key' => $shortKey,
					':ip'		 => $_SERVER['REMOTE_ADDR'],
					':date'		 => time()
				));
		}



		// Redirect back to miniuri.me with short key.
		header('Location: ?short=' . $shortKey);
	}

	// Generate a short key for URI minimization
	private function _getShortKey()
	{
		return substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 5);
	}
}
