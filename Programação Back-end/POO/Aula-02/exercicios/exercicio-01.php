<?php

//Definindo a classe Pessoa (pai)
class Pessoa {
    protected $nome;
    protected $idade;
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

$nome = "Rene";
$idade = 17;
$salario = 5000;
$gerente = new Gerente();
$gerente->setSalario($salario);
echo "O nome do gerente é: " . $nome . " Ele tem " . $idade . " anos e o salário com bônus é: " . $gerente->calcularBonus() . "<br/>";

//Definindo a classe Desenvolvedor (filho)
class Desenvolvedor extends Funcionario {
    function  calcularBonus() {
            return $this->salario + ($this->salario * 0.10);
    }
}


$nome = "Lucas";
$idade = 17;
$salario = 5000;
$desenvolvedor = new Desenvolvedor();
$desenvolvedor->setSalario($salario);
echo "O nome do desenvolvedor é: " . $nome . " Ele tem " . $idade . " anos e o salário com bônus é: " . $desenvolvedor->calcularBonus() . "<br/>";
?>

