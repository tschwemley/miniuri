<?php

// Enter your database credentials
$host = '';
$user = '';
$pass = '';
$dbName = '';

// Establish PDO database connection
try {

	$db = new PDO("mysql:host=$host;dbname=$dbName", $user, $pass);

} catch (PDOException $e) {

	echo 'Error connecting to database.';
	die();
}
