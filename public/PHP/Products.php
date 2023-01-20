<?php
namespace App;

class Products extends DbConnect {

    protected function getProducts(){        
        $sql = "SELECT * FROM products";
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute();
        $products = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        return json_encode($products);
    }

    protected function setProduct($input){
        $product = json_decode( $input );
        $sql = "INSERT INTO products(sku, name, price, type, size, weight, length, width, height) 
        VALUES(:sku, :name, :price, :type, :size, :weight, :length, :width, :height)";
        $stmt = $this->connect()->prepare($sql);
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
    }
    protected function removeProduct() {
        $id= $_GET['id'];        
        $sql = "DELETE FROM products WHERE sku = '{$id}'";
        $stmt = $this->connect()->prepare($sql);		
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
    }
}