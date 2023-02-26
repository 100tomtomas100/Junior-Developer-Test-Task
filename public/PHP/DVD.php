<?php
namespace App;

class DVD extends ProductProps implements ProductsInterface {
    public function productAdd ($product, $connect){
        return $this -> toDB(array("size"), $connect, $product);
    }    
}