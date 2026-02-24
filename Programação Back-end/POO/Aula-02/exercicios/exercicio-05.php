<?php

class Documento {
    protected $numero;

    public function getNumero() {
        return $this->numero;
    }

    public function setNumero($numero) {
        $this->numero = $numero;
    }
}

class CPF extends Documento {

    public function validar(): bool {

        // Remove pontos e traços
        $numeroCPF = preg_replace('/\D/', '', $this->getNumero());

        if (strlen($numeroCPF) != 11) {
            return false;
        }

        if (preg_match('/^(\d)\1{10}$/', $numeroCPF)) {
            return false;
        }

        for ($t = 9; $t < 11; $t++) {
            $d = 0;
            for ($c = 0; $c < $t; $c++) {
                $d += $numeroCPF[$c] * (($t + 1) - $c);
            }

            $d = ((10 * $d) % 11) % 10;

            if ($numeroCPF[$t] != $d) {
                return false;
            }
        }

        return true;
    }
}

$cpf = new CPF();
$cpf->setNumero("491.972.278-89");

echo $cpf->validar() ? "CPF válido" : "CPF inválido";

?>