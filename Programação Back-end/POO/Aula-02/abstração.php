<?php

echo "<h1>Aula 2 - Abstração</h1>";

//Definindo a classe abstrata Animal
abstract class Animal {
    public function fazerSom(){}
}

//Definindo a classe Cachorro que herda da classe Animal
class Cachorro extends Animal {
    public function fazerSom() {
        echo "Au Au!";
    }
}

//Instanciando a classe Cachorro e chamando o método fazerSom
$cachorro = new Cachorro();
$cachorro->fazerSom();

//==========Classe abstrata nao pode ser instanciada
//==========Só pode ser instanciada por meio de uma classe filha que implementa os métodos abstratos da classe pai.
//==========Nesse caso, a classe Cachorro é a classe filha que implementa o método fazerSom da classe abstrata Animal.
?>