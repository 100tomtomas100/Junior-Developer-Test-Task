<?php
namespace App;

class ProductsContr extends Products {
    public function createProduct($input){
        $this->setProduct($input);
    }
    public function deleteProduct(){
        $this->removeProduct();
    }
}