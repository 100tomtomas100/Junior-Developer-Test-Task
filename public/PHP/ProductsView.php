<?php
namespace App;

class ProductsView extends Products {
    public function showProducts () {
        $products = $this->getProducts();
        echo $products;
    }
}
