<?php
namespace App;

class Book extends ProductProps implements ProductsInterface  {
    public function productAdd ($product, $connect){
        return $this -> toDB(array("weight"), $connect, $product);
    }    
}