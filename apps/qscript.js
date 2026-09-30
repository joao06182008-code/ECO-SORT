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
        correta: "c"
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

    // Calcula a porcentagem
    const porcentagem = Math.round((pontuacao / perguntas.length) * 100);

    // Define ícone, título e mensagem de acordo com a pontuação
    let icone = '🎉';
    let titulo = 'Parabéns!';
    let mensagem = 'Excelente trabalho! Você demonstra um ótimo conhecimento sobre a reciclagem e o descarte correto.';

    if (porcentagem < 50) {
        icone = '🌱';
        titulo = 'Bom esforço!';
        mensagem = 'Continue aprendendo! O planeta agradece cada pequeno gesto de conscientização.';
    } else if (porcentagem < 80) {
        icone = '👏';
        titulo = 'Muito bem!';
        mensagem = 'Você tem bons conhecimentos sobre o descarte e a reciclagem em Olinda!';
    }

    // Renderiza o resultado com estilos inline para garantir o alinhamento
    quizCard.innerHTML = `
        <div style="text-align: center; padding: 10px 0;">
            <div style="font-size: 3rem; margin-bottom: 8px;">${icone}</div>
            
            <h2 style="color: #1b5e20; font-size: 1.6rem; margin: 0 0 16px 0; font-weight: 700;">${titulo}</h2>
            
            <div style="background-color: #e8f5e9; border: 2px solid #66bb6a; border-radius: 12px; padding: 14px 20px; display: inline-block; margin-bottom: 16px;">
                <span style="font-size: 1.8rem; font-weight: bold; color: #2e7d32; display: block;">${pontuacao} / ${perguntas.length}</span>
                <span style="font-size: 0.85rem; color: #388e3c; font-weight: 600;">respostas corretas (${porcentagem}%)</span>
            </div>

            <p style="color: #4f4f4f; font-size: 0.95rem; line-height: 1.4; max-width: 360px; margin: 0 auto 20px auto;">
                ${mensagem}
            </p>

            <div style="border-top: 1px solid #e0e0e0; padding-top: 16px; margin-top: 10px;">
                <a href="index.html" class="btn-primary" style="text-decoration: none; display: inline-block;">
                    Voltar ao Início
                </a>
            </div>
        </div>
    `;
}
// Event Listeners e Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarPergunta();
    if (btnProxima) {
        btnProxima.addEventListener('click', proximaPergunta);
    }
});