<?php

$host = 'localhost';
$user = 'root';
$pass = 'myla092091';
$dbName = 'urls';

// Establish PDO database connection
try {

	$db = new PDO("mysql:host=$host;dbname=$dbName", $user, $pass);

} catch (PDOException $e) {

	die();
}
