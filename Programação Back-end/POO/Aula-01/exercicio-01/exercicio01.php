<?php
class oculos {

    public $modelo; //atributo
    public $cor; //atributo
    public $tamanho; //atributo
    public $grau; //atributo
    public $marca; //atributo

    public function usar() { //método

        return "Vou usar o óculos modelo: " . $this->modelo;
    }
    
    public function limpar() { //método
    
    return "<br> Vou limpar o óculos que tem o grau de: " . $this->grau;
    }
    
    public function Guardar() { //método
    
    return "<br> Vou guardar o óculos na caixa da: " . $this->marca;
    }
    
}
    $esportivo = new oculos();
    $esportivo->modelo = "esportivo";
    echo $esportivo->usar();

    $g = new oculos();
    $g->grau = "3.0"; 
    echo $g->limpar();

    $ray_ban = new oculos();
    $ray_ban->marca = "Ray-Ban";
    echo $ray_ban->Guardar();

    echo "<hr>";

//=========================================================

class Mochila {

    public $marca; //atributo
    public $modelo; //atributo
    public $cor; //atributo
    public $tamanho; //atributo
    public $valor; //atributo

    public function abrir() { //método

        return "Tenho que abrir a mochila da marca: " . $this->marca;
    }

    public function guardar() { //método

        return "<br>Vou guardar a mochila do modelo: " . $this->modelo;
    }

    public function organizar() { //método

        return "<br>Tenho que organizar os materiais na mochila da cor: " . $this->cor;
    }

    
    }
    $nike = new Mochila();
    $nike->marca = "Nike";
    echo $nike->abrir();
    
    $brasilia = new Mochila();
    $brasilia->modelo = "Brasilia";
    echo $brasilia->guardar();
    
    $preta = new Mochila();
    $preta->cor = "preta";
    echo $preta->organizar();
    
    echo "<hr>";

//=========================================================
    
    class Capacete {
        
    public $modelo; //atributo
    public $marca; //atributo
    public $tamanho; //atributo
    public $material; //atributo
    public $cor; //atributo

    public function proteger() { //método

        return "O " .$this ->modelo. " protege minha cabeça";
    }

    public function colocar() { //método

        return "<br> Tenho que colocar o capacete da marca: " . $this->marca;
    }

    public function Abaixar() { //método

        return "<br> Vou abaixar a viseira do capacete da cor: " . $this->cor;
    }
}

    $shark = new Capacete();
    $shark->modelo = "Shark";
    echo $shark->proteger();

    $ls2 = new Capacete();
    $ls2->marca = "LS2";
    echo $ls2->colocar();

    $preto = new Capacete();
    $preto->cor = "preto";
    echo $preto->Abaixar();

    echo "<hr>";

//=========================================================

class Guarda_roupa {

    public $modelo; //atributo
    public $marca; //atributo
    public $tamanho; //atributo
    public $material; //atributo
    public $cor; //atributo

    public function abrir() { //método

        return "Vou abrir a guarda-roupa da marca: " . $this->marca;
    }

    public function guardar() { //método

        return "<br>Eu tenho que guardar a roupa no guarda roupa que tem material :" . $this->material;
    }

    public function organizar() { //método

        return "<br>Vou organizar a roupa no guarda-roupa do tamanho: " . $this->tamanho;
    }
}

    $guarda_roupa = new Guarda_roupa();
    $guarda_roupa->marca = "Henn";
    echo $guarda_roupa->abrir();

    $madeira = new Guarda_roupa();
    $madeira->material = "madeira";
    echo $madeira->guardar();

    $grande = new Guarda_roupa();
    $grande->tamanho = "grande";
    echo $grande->organizar();

    echo "<hr>";

//=========================================================

class Calça {

    public $marca; //atributo
    public $tamanho; //atributo
    public $cor; //atributo
    public $modelagem; //atributo
    public $modelo; //atributo

    public function usar() { //método

        return "A calça que eu estou usando é a  " . $this->modelo;
    }

    public function lavar() { //método

        return "<br>Para lavar essa calça tem um jeito específico por que a cor dela é  " . $this->cor;
    }

    public function vestir() { //método

        return "<br>A calça que eu estou usando é a  " . $this->modelagem;
    }
}

    $jeans = new Calça();
    $jeans->modelo = "jeans";
    echo $jeans->usar();

    $preta = new Calça();
    $preta->cor = "preta";
    echo $preta->lavar();

    $skinny = new Calça();
    $skinny->modelagem = "baggy";
    echo $skinny->vestir();

?>