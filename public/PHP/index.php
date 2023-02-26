<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once realpath("./vendor/autoload.php");

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {    
    $productsObj = new \App\ProductsView();
    $productsObj -> showProducts();      
};
if($method === "POST") {
    $productsObj2 = new \App\ProductsContr(); 
    $productsObj2 -> createProduct(file_get_contents('php://input')); 
};
if($method === "DELETE"){
    $productsObj3 = new \App\ProductsContr(); 
    $productsObj3 -> deleteProduct(); 
}