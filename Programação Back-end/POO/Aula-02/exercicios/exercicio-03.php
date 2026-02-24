<?php

//Definindo a classe veiculo (pai)
class Veiculo {
    protected $marca;
    protected $modelo;
    private $velocidade;
}

//Definindo a classe Carro (filho)
class Carro extends Veiculo {
    public function setVelocidade($velocidade){
        $this->velocidade = $velocidade;
    }

    public function getVelocidade(){
        return $this->velocidade;
    }

    public function acelerar($aceleracao){
        $this->velocidade += $aceleracao;
    }
}

$porsche = new Carro();
$porsche->setVelocidade(100);
$porsche->acelerar(50);
echo "Velocidade atual do Porsche: " . $porsche->getVelocidade() . " km/h<br>";
echo "A aceleração do Porsche é: " . $porsche->getVelocidade() * 3.6 . " m/s<br>";


echo "===============================<br>";


//Definindo a classe Moto (filho)
class Moto extends Veiculo {
    public function setVelocidade($velocidade){
        $this->velocidade = $velocidade;
    }

    public function getVelocidade(){
        return $this->velocidade;
    }

    public function acelerar($aceleracao){
        $this->velocidade += $aceleracao;
    }
}

$harley = new Moto();
$harley->setVelocidade(80);
$harley->acelerar(30);
echo "Velocidade atual da Harley: " . $harley->getVelocidade() . " km/h<br>";
echo "A aceleração da Harley é: " . $harley->getVelocidade() * 3.6 . " m/s<br>";

?>