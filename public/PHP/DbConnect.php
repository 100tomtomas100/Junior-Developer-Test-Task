<?php
	/**
	* Database Connection
	*/
	class DbConnect {
		private $server = 'fdb28.awardspace.net';
		private $dbname = '4225493_tomas';
		private $user = '4225493_tomas';
		private $pass = 'JM%XtjD[5nj,b_YO';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
?>