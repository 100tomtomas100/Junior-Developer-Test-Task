<?php
namespace App;

class ProductsContr extends Products {
    public function createProduct($input){    
        $product = json_decode( $input );    
        $class = "App\\".$product->param->switcherChoice;
        $switcher = new $class();
        $this->setProduct($switcher, $product); 
    }
    public function deleteProduct(){
        $this->removeProduct();
    }
}

