<?php
class Pessoa {

    public $nome; //atributo

    public function falar() { //método

        return "Olá, meu nome é " . $this->nome;
    }
}

$Rene = new Pessoa();
$Rene->nome = "Rene Ryan"; 
echo $Rene->falar();
?>