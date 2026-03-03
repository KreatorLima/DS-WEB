<?php

class Dono{
    public $nome;
    public $telefone;

    public function __construct($novoNome, $novoTelefone){
        $this->nome = $novoNome;
        $this->telefone = $novoTelefone;
    }
}

class Animal{
    public $Nome;
    public $Especie;
    public Dono $Dono;


    public function __construct($novoNome, $novaEspecie, Dono $novoDono){
        $this->Nome = $novoNome;
        $this->Especie = $novaEspecie;
        $this->Dono = $novoDono;
    }
}

$dono1 = new Dono("Rene", "123456789");
$animal1 = new Animal("Rex", "Cachorro", $dono1);

echo $animal1->Nome . " | " . $animal1->Especie;
echo "<br>";
echo "Dono: " . $animal1->Dono->nome . " | Tel: " . $animal1->Dono->telefone;

?>