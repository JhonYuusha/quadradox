document.getElementById("botao").addEventListener("click", function() {
    let quadrado = document.getElementById("quadrado");
 
    // Verifica se a animação já está rodando
    if (!quadrado.classList.contains("animando")) {
        quadrado.classList.add("animando");
        quadrado.style.animation = "mover 2s ease-in-out";
 
        // Aguarda o fim da animação antes de permitir outra execução
        quadrado.addEventListener("animationend", function() {
            quadrado.classList.remove("animando");
            quadrado.style.animation = "";
        }, { once: true });
    }
});