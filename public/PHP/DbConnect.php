<?php
	/**
	* Database Connection
	*/
	namespace App;

	class DbConnect {
		protected function connect() {
			try {
				$conn = new \PDO('mysql:host=' . $_ENV['DB_SERVER'] . ';dbname=' . $_ENV['DB_NAME'], $_ENV['DB_USER'], $_ENV['DB_PASS'] );
				$conn->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}        
	}
