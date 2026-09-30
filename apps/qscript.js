// Estrutura das perguntas do Quiz
const perguntas = [{
        categoria: "Eletrônicos",
        pergunta: "Onde devem ser descartadas pilhas e baterias usadas em Olinda?",
        opcoes: [
            { id: "a", texto: "No lixo comum do dia a dia" },
            { id: "b", texto: "Em pontos de coleta específicos (PEVs) e supermercados parceiros" },
            { id: "c", texto: "Junto com o lixo reciclável de papel e plástico" },
            { id: "d", texto: "Enterradas no quintal ou em áreas verdes" }
        ],
        correta: "b"
    },
    // Você pode adicionar mais perguntas seguindo este mesmo formato:
    {
        categoria: "Eletrônicos",
        pergunta: "O que deve ser feito antes de descartar um celular velho?",
        opcoes: [
            { id: "a", texto: "Quebrar o aparelho ao meio" },
            { id: "b", texto: "Mandar para o lixão sem apagar nada" },
            { id: "c", texto: "Restaurar os padrões de fábrica e remover contas pessoais" },
            { id: "d", texto: "Molhar em água salgada" }
        ],
        correta: "c"
    },
    {
        categoria: "Eletrônicos",
        pergunta: "Qual a posição do Brasil no ranking mundial de geração de lixo eletrônico?",
        opcoes: [
            { id: "a", texto: "1º lugar" },
            { id: "b", texto: "5º lugar" },
            { id: "c", texto: "10º lugar" },
            { id: "d", texto: "15º lugar" }
        ],
        correta: "b"
    },
    {
        categoria: "Eletrônicos",
        pergunta: "Qual destas atitudes é a mais recomendada ANTES de descartar um eletrônico que ainda funciona?",
        opcoes: [
            { id: "a", texto: "Vender para alguém que não tem um" },
            { id: "b", texto: "Doar para instituições de caridade" },
            { id: "c", texto: "Descartar no lixo comum do dia a dia" },
            { id: "d", texto: "Mandar para o lixão sem apagar nada" }
        ],
        correta: "b"
    },
    {
        categoria: "Eletrônicos",
        pergunta: "O que acontece com as pilhas e baterias quando descartadas corretamente nos pontos de coleta?",
        opcoes: [
            { id: "a", texto: "Elas são enterradas em aterros sanitários" },
            { id: "c", texto: "São queimadas em fornos industriais" },
            { id: "b", texto: "São encaminhadas para reciclagem e reaproveitamento de materiais" },
            { id: "d", texto: "São jogadas em rios e lagos" }
        ],
        correta: "b"
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;

// Seleção dos elementos do DOM com base no seu HTML (questoes.html)
const elementoStepIndicator = document.getElementById('current-step');
const elementoCategoria = document.querySelector('.category-badge');
const elementoProgressBar = document.querySelector('.progress-fill');
const elementoPergunta = document.querySelector('.question-body h2');
const elementoContainerOpcoes = document.querySelector('.options-container');
const btnProxima = document.querySelector('.btn-primary');

// Carrega a pergunta atual na tela
function carregarPergunta() {
    const dadosPergunta = perguntas[indicePerguntaAtual];

    // Atualiza indicadores de progresso
    if (elementoStepIndicator) elementoStepIndicator.innerText = indicePerguntaAtual + 1;
    if (elementoCategoria) elementoCategoria.innerText = dadosPergunta.categoria;

    // Atualiza largura da barra de progresso (%)
    const porcentagem = ((indicePerguntaAtual + 1) / perguntas.length) * 100;
    if (elementoProgressBar) elementoProgressBar.style.width = `${porcentagem}%`;

    // Atualiza texto da pergunta
    if (elementoPergunta) elementoPergunta.innerText = dadosPergunta.pergunta;

    // Renderiza as opções de resposta
    elementoContainerOpcoes.innerHTML = '';
    dadosPergunta.opcoes.forEach(opcao => {
        const labelOpcao = document.createElement('label');
        labelOpcao.className = 'option-card';
        labelOpcao.innerHTML = `
            <input type="radio" name="resposta" value="${opcao.id}">
            <span class="custom-radio">${opcao.id.toUpperCase()}</span>
            <span class="option-text">${opcao.texto}</span>
        `;
        elementoContainerOpcoes.appendChild(labelOpcao);
    });
}

// Avança para a próxima pergunta ou encerra o quiz
function proximaPergunta() {
    const opcaoSelecionada = document.querySelector('input[name="resposta"]:checked');

    if (!opcaoSelecionada) {
        alert("Por favor, selecione uma opção antes de prosseguir!");
        return;
    }

    // Verifica se a resposta está correta
    if (opcaoSelecionada.value === perguntas[indicePerguntaAtual].correta) {
        pontuacao++;
    }

    indicePerguntaAtual++;

    if (indicePerguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        exibirResultado();
    }
}

// Exibe o resultado final ao concluir o quiz
function exibirResultado() {
    const quizCard = document.querySelector('.quiz-card');
    quizCard.innerHTML = `
        <header class="quiz-header">
            <h2>Quiz Concluído!</h2>
        </header>
        <section class="question-body" style="text-align: center; margin: 20px 0;">
            <p style="font-size: 1.2rem; margin-bottom: 15px;">
                Você acertou <strong>${pontuacao}</strong> de <strong>${perguntas.length}</strong> perguntas.
            </p>
        </section>
        <footer class="quiz-footer">
            <a href="index.html" class="btn-secondary">Voltar ao Início</a>
        </footer>
    `;
}

// Event Listeners e Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarPergunta();
    if (btnProxima) {
        btnProxima.addEventListener('click', proximaPergunta);
    }
});