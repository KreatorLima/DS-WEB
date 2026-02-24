<?php

echo "<h1>Aula 2 - Herança e Polimorfismo</h1>";

//Definindo a classe Pessoa (Pai);
class Pessoa {
    public $nome = "Rasmus";

    protected $idade = 48;

    private $senha = "12345";

    public function verDados(){
        echo $this->nome . "<br/>";
        echo $this->idade . "<br/>";
        echo $this->senha . "<br/>";
    }
}

//Definindo a classe Programador (Filha);
class Programador extends Pessoa {
    public function verDados(){

    //Exibe a Classe atual
        echo get_class($this) . "<br/>";
        echo $this->nome . "<br/>";
        echo $this->idade . "<br/>";
        echo $this->senha . "<br/>";
    }
}

//Instanciando a classe Pessoa (Pai);
$Rene = new pessoa();
$Rene->verDados();

echo"<hr>";

//Instanciando a classe Programador (Filha);
$objeto = new Programador();
$objeto->verDados();

//========= Classe filha nao tem acesso a atributos privados da classe pai, apenas os protegidos e públicos. =========
//========= Nesse caso, a classe Programador tem acesso ao atributo $idade, mas nao tem acesso ao atributo $senha. =========
?>