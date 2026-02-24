<?php

abstract class Animal{
    abstract public function fazerSom();

    public function mover(){
        return "Anda";
    }
}

class Sapo extends Animal{
    public function fazerSom(){
        return "Ribbit Ribbit";
    }
}

class Cavalo extends Animal{
    public function fazerSom(){
        return "Hii Hii";
    }

    public function mover(){
    return "Galopa e " . parent::mover();
    }
}

class Tartaruga extends Animal{
    public function fazerSom(){
        return "...";
    }
}

$Duque = new Sapo();
echo "O sapo faz: " . $Duque->fazerSom() . "<br/>";
echo "O sapo só: " . $Duque->mover() . "<br/>";
echo "-------------------------<br/>";

$Garfield = new Cavalo();
echo "O cavalo faz: " . $Garfield->fazerSom() . "<br/>";
echo "O cavalo só: " . $Garfield->mover() . "<br/>";
echo "-------------------------<br/>";

$PiuPiu = new Tartaruga();
echo "O tartaruga faz: " . $PiuPiu->fazerSom() . "<br/>";
echo "O tartaruga só: " . $PiuPiu->mover() . "<br/>";


?>