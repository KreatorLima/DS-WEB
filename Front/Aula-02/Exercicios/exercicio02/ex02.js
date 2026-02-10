function trocarImagem1() {
      document.getElementById("foto")
        .setAttribute("src", "branco.jpg");
    }

    function trocarImagem2() {
      document.getElementById("foto")
        .setAttribute("src", "preto.jpg");
    }

    function mostrarSrc() {
      let valorSrc = document.getElementById("foto")
        .getAttribute("src");

      console.log(valorSrc);
    }