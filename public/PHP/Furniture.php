<?php
namespace App;

class Furniture extends ProductProps implements ProductsInterface {
    public function productAdd ($product, $connect){
        return $this -> toDB(array("height", "width", "length"), $connect, $product);
    }    
}