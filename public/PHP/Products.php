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

    protected function setProduct(ProductsInterface $switcher, $product){
        $connect = $this->connect();
        echo json_encode($switcher->productAdd($product, $connect));
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