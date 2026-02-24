<?php

abstract class Produto {
    protected $nome;
    protected $preco;
    protected $quantidade;

    public function setPreco($preco) {
        $this->preco = $preco;
    }

    public function setQuantidade($quantidade) {
        $this->quantidade = $quantidade;
    }

    public function calcularDesconto($desconto) {
        return $this->preco * (1 - $desconto / 100);
    }
}

class Eletronico extends Produto {

    public function calcularDesconto($desconto = 10) {

        if ($this->quantidade < 5) {
            $desconto += 10;
        }

        return parent::calcularDesconto($desconto);
    }
}

$celular = new Eletronico();
$celular->setPreco(1000);
$celular->setQuantidade(12);

echo "Preço do celular com desconto: R$ " . $celular->calcularDesconto() . "<br>";


class Roupas extends Produto {

    public function calcularDesconto($desconto = 20) {

        if ($this->quantidade < 5) {
            $desconto += 10;
        }

        return parent::calcularDesconto($desconto);
    }
}

$camisa = new Roupas();
$camisa->setPreco(100);
$camisa->setQuantidade(3);

echo "Preço da camisa com desconto: R$ " . $camisa->calcularDesconto() . "<br>";

?>