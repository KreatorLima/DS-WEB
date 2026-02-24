<?php
echo "<h1>Aula 2 - Polimorfismo</h1>";

//Definindo a classe Animal (Pai);
class Animal {
     function falar(){
        return "Som";
}
public function mover(){
    return "Anda";
    }
}

//Definindo a classe Cachorro (Filha);
class Cachorro extends Animal {
    public function falar(){
        return "Late";
    }
}

//Definindo a classe Gato (Filha);
class Gato extends Animal {
    public function falar(){
        return "Mia";
    }
}

//Definindo a classe Passaro (Filha);
class Passaro extends Animal {
    public function falar(){
        return "Canta";
}

//Pega a função de mover da classe pai e acrescenta a função de voar usando o parent:: ;
public function mover(){
    return "Voa e " . parent::mover();
    }
}

//Instanciando a classe Cachorro (Filha);
$pluto = new Cachorro();
echo $pluto->falar() . "<br/>";
echo $pluto->mover() . "<br/>";
echo "-------------------------<br/>";

//Instanciando a classe Gato (Filha);
$garfield = new Gato();
echo $garfield->falar() . "<br/>";
echo $garfield->mover() . "<br/>";
echo "-------------------------<br/>";

//Instanciando a classe Passaro (Filha);
$ave = new Passaro();
echo $ave->falar() . "<br/>";
echo $ave->mover() . "<br/>";
?>