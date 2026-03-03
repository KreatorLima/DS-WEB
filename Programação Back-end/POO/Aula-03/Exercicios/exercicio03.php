<?php

class Fabricante{
    public $nome;
    public $paisOrigem;

    public function __construct($nome, $paisOrigem){
        $this->nome = $nome;
        $this->paisOrigem = $paisOrigem;
    }
}

class Motor{
    public $potencia;
    public $combustivel;

    public function __construct($potencia, $combustivel){
        $this->potencia = $potencia;
        $this->combustivel = $combustivel;
    }
}

class Carro{
    public $modelo;
    public $ano;
    public Fabricante $fabricante;
    public Motor $motor;

    public function __construct($modelo, $ano, Fabricante $fabricante, Motor $motor){
        $this->modelo = $modelo;
        $this->ano = $ano;
        $this->fabricante = $fabricante;
        $this->motor = $motor;
    }

    public function exibirFicha(){
        echo "Modelo: " . $this->modelo . "<br>";
        echo "Ano: " . $this->ano . "<br>";
        echo "Fabricante: " . $this->fabricante->nome . "<br>";
        echo "País de Origem: " . $this->fabricante->paisOrigem . "<br>";
        echo "Potência do Motor: " . $this->motor->potencia . " HP <br>";
        echo "Combustível: " . $this->motor->combustivel . "<br>";
    }
}

$fabricante = new Fabricante("Honda", "Japão");
$motor = new Motor(150, "Flex");

$carro = new Carro("Civic", 2020, $fabricante, $motor);
$carro->exibirFicha();

?>