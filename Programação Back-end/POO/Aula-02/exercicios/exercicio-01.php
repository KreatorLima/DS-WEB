<?php

//Definindo a classe Pessoa (pai)
class Pessoa {
    public $nome;
    public $idade;
}

//Definindo a classe Funcionario (filho)
class Funcionario extends Pessoa {
    protected $salario;

    public function setSalario($salario){
        $this->salario = $salario;
    }
}

//Definindo a classe Gerente (filho)
class Gerente extends Funcionario {
    function  calcularBonus() {
            return $this->salario + ($this->salario * 0.20);
    }
}


$gerente = new Gerente();
$gerente->nome = "Rene";
$gerente->idade = 17;
$gerente->setSalario(5000);
echo "O nome do gerente é: " . $gerente->nome . " Ele tem " . $gerente->idade . " anos e o salário com bônus é: " . $gerente->calcularBonus() . "<br/>";

//Definindo a classe Desenvolvedor (filho)
class Desenvolvedor extends Funcionario {
    function  calcularBonus() {
            return $this->salario + ($this->salario * 0.10);
    }
}


$desenvolvedor = new Desenvolvedor();
$desenvolvedor->nome = "Lucas";
$desenvolvedor->idade = 17;
$desenvolvedor->setSalario(1000);
echo "O nome do desenvolvedor é: " . $desenvolvedor->nome . " Ele tem " . $desenvolvedor->idade . " anos e o salário com bônus é: " . $desenvolvedor->calcularBonus() . "<br/>";
?>