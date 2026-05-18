// ========================================
// CARREGADOR AUTOMÁTICO DE TRANSFORMAÇÕES
// ========================================
// 
// Este arquivo carrega as imagens do localStorage
// (salvas através da página admin.html)
// 

let indiceAtual = 0;
let transformacoes = [];

// Carregar as imagens automaticamente
document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".alunos-grid");

    if (!grid) return;

    // Tentar carregar fotos salvas no localStorage
    transformacoes = JSON.parse(localStorage.getItem("transformacoes"));

    // Se não houver fotos salvas, usar as fotos padrão
    if (!transformacoes || transformacoes.length === 0) {
        transformacoes = [
            {
                url: "assets/alunos/crys.png",
                alt: "Transformação 1"
            },
            {
                url: "assets/logo.jpg",
                alt: "Logo Team Bispo"
            },
            {
                url: "assets/alunos/kevin.jpeg",
                alt: "Transformação 2"
            }
        ];
    }

    // Limpar conteúdo anterior
    grid.innerHTML = "";

    // Carregar cada imagem
    transformacoes.forEach((item, index) => {
        const aluno = document.createElement("div");
        aluno.className = "aluno";

        const img = document.createElement("img");

        // Se for objeto com data (do localStorage), usar data
        // Se for objeto com url, usar url
        if (item.data) {
            img.src = item.data;
        } else {
            img.src = item.url;
        }

        img.alt = item.alt || `Transformação ${index + 1}`;

        aluno.appendChild(img);
        grid.appendChild(aluno);
    });

    // Atualizar contador de fotos
    document.getElementById("foto-total").textContent = transformacoes.length;

    // Atualizar visibilidade dos botões
    atualizarCarrossel();

    // Adicionar suporte a teclado (setas)
    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") mudarFoto(-1);
        if (e.key === "ArrowRight") mudarFoto(1);
    });
});

// Função para mudar de foto
function mudarFoto(direcao) {
    const novoIndice = indiceAtual + direcao;

    // Validar limites
    if (novoIndice < 0 || novoIndice >= transformacoes.length) {
        return;
    }

    indiceAtual = novoIndice;
    atualizarCarrossel();
}

// Função para atualizar o carrossel
function atualizarCarrossel() {
    const grid = document.querySelector(".alunos-grid");

    // Calcular o deslocamento
    const offset = -indiceAtual * 100;
    grid.style.transform = `translateX(${offset}%)`;

    // Atualizar o número da foto atual
    document.getElementById("foto-atual").textContent = indiceAtual + 1;

    // Habilitar/desabilitar botões
    const btnAnterior = document.querySelector(".carrossel-btn.anterior");
    const btnProximo = document.querySelector(".carrossel-btn.proximo");

    btnAnterior.disabled = indiceAtual === 0;
    btnProximo.disabled = indiceAtual === transformacoes.length - 1;
}
