<?php
namespace App;

class ProductProps{
    protected function toDB($inputs, $connect, $product) {
        $inputsStr = implode(", ", $inputs);        
        $inputsStrArr = [];
        foreach ($inputs as $input) {            
                $inputsStrArr[] = ":".$input;            
        }
        $inputsStrSpec = implode(", ", $inputsStrArr);
        $sql = "INSERT INTO products(sku, name, price, type, $inputsStr) 
        VALUES(:sku, :name, :price, :type, $inputsStrSpec)";
        $stmt = $connect->prepare($sql);
        $stmt->bindParam(':sku', $product->param->input->sku);
        $stmt->bindParam(':name', $product->param->input->name);
        $stmt->bindParam(':price', $product->param->input->price);
        $stmt->bindParam(':type', $product->param->switcherChoice);
        foreach($inputs as $input){
            echo $stmt->bindParam(":".$input, $product->param->input->$input);
        }    
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        return $response;
    }
}