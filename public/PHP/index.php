<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

// $user = file_get_contents("php://input");

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM products";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $products = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($products);
        break;
    case "POST":
        $product = json_decode( file_get_contents('php://input') );
        // $productType = json_decode( file_get_contents('php://switcherChoice') );
        $sql = "INSERT INTO products(sku, name, price, type, size, weight, length, width, height) 
            VALUES(:sku, :name, :price, :type, :size, :weight, :length, :width, :height)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':sku', $product->param->input->sku);
        $stmt->bindParam(':name', $product->param->input->name);
        $stmt->bindParam(':price', $product->param->input->price);
        $stmt->bindParam(':type', $product->param->switcherChoice);
        $stmt->bindParam(':size', $product->param->input->{"size"? "size": ""});
        $stmt->bindParam(':weight', $product->param->input->{"weight"? "weight": ""});
        $stmt->bindParam(':length', $product->param->input->{"length"? "length": ""});
        $stmt->bindParam(':width', $product->param->input->{"width"? "width": ""});
        $stmt->bindParam(':height', $product->param->input->{"height"? "height": ""});

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    // case "PUT":
    //     $user = json_decode( file_get_contents('php://input') );
    //     $sql = "UPDATE users SET name= :name, email =:email, mobile =:mobile, updated_at =:updated_at WHERE id = :id";
    //     $stmt = $conn->prepare($sql);
    //     $updated_at = date('Y-m-d');
    //     $stmt->bindParam(':id', $user->id);
    //     $stmt->bindParam(':name', $user->name);
    //     $stmt->bindParam(':email', $user->email);
    //     $stmt->bindParam(':mobile', $user->mobile);
    //     $stmt->bindParam(':updated_at', $updated_at);

    //     if($stmt->execute()) {
    //         $response = ['status' => 1, 'message' => 'Record updated successfully.'];
    //     } else {
    //         $response = ['status' => 0, 'message' => 'Failed to update record.'];
    //     }
    //     echo json_encode($response);
    //     break;

    case "DELETE":
        $sql = "DELETE FROM products WHERE sku = :sku";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':sku', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
        break;
 }