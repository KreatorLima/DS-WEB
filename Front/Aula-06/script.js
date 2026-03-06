const nome = document.getElementById("nome");
const telefone = document.querySelector("#telefone");

form.addEventListener("submit", (e) => {
    if (nome.value === "" || telefone.value === "") {
        console.log("O nome ou o telefone estão vazios!");
    }
})"
