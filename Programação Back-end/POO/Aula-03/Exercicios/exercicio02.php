<?php

class Artista{
    public $nome;
    public $genero;

    public function __construct($novoNome, $novoGenero){
        $this->nome = $novoNome;
        $this->genero = $novoGenero;
    }
}

class Musica{
    public $titulo;
    public $duracao;
    public Artista $artista;

    public function __construct($novoTitulo, $novaDuracao, Artista $novoArtista){
        $this->titulo = $novoTitulo;
        $this->duracao = $novaDuracao;
        $this->artista = $novoArtista;
    }

    public function exibirInfo(){
        echo "Título: " . $this->titulo . "<br>";
        echo "Duração: " . $this->duracao . " minutos<br>";
        echo "Artista: " . $this->artista->nome . "<br>";
        echo "Gênero: " . $this->artista->genero . "<br>";
    }
}

$artista = new Artista("The Beatles", "Rock");
$musica = new Musica("Hey Jude", 7, $artista);

$musica->exibirInfo();


?>