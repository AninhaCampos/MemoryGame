
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector ('.timer');

const personagens = [ /*adicionando as imagens a uma funcao*/
'mabel',
'porco',
'dipper e mabel',
'stan2',
'bill',
'muie',
];

const createElements = (tag, className) =>{ //funcao para criar um elemento no js atraves da tag no html
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

let firstCard= '';
let secondCard= '';

const checkWin = () => { //funcao para verificar se tds as cartas foram reveladas e o usuario ganhou o jogo.
    const disabledCards = document.querySelectorAll('.desabilitar-carta');

    if(disabledCards.length === 12) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);

    }
}
const checkCards= () => { //funcao para checar se as duas cartas selecionadas sao iguais.
    const firstPersonagem = firstCard.getAttribute('data-character');
    const secondPersonagem = secondCard.getAttribute('data-character');

    if(firstPersonagem === secondPersonagem){

        firstCard.firstChild.classList.add('desabilitar-carta');
        secondCard.firstChild.classList.add('desabilitar-carta');

        firstCard = '';
        secondCard = '';

        checkWin();

    }else {
        setTimeout(() => {
        firstCard.classList.remove('revelar-card');
        secondCard.classList.remove('revelar-card');

        firstCard = '';
        secondCard = '';

         } ,500);

    }
}
const revelarCard = ({target}) =>{

    if(target.parentNode.className.includes('revelar-card')){
        return;
    }

    if(firstCard === ''){
        target.parentNode.classList.add('revelar-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){

        target.parentNode.classList.add('revelar-card');
        secondCard = target.parentNode;

        checkCards();
    }
    

}
const createCard = (personagem) => {//criando a funcao para criar as cartas de modo aleatorio
    const card = createElements('div','card');
    const frente = createElements('div','face frente');
    const atras = createElements('div','face atras');

    frente.style.backgroundImage = `url('../Imagens/${personagem}.jpg')`;

    card.appendChild(frente);
    card.appendChild(atras);

    card.addEventListener('click', revelarCard);
    card.setAttribute('data-character',personagem);

    return card;
}

const loadGame = () =>{

    const duplicatePersonagens = [ ...personagens, ...personagens ]; //funcao para duplicar os personagens da funcao personagens.

    const Embaralhar = duplicatePersonagens.sort(() => Math.random() - 0.5); //funcao para organizar as cartas de maneira aleatoria.

    

    Embaralhar.forEach((personagem) => {

        const card = createCard(personagem);
        grid.appendChild(card);
    });
}

const startTimer = () => { //funcao para contar o tempo.

    this.loop = setInterval(() => {

        const tempoAtual = + timer.innerHTML;
        timer.innerHTML = tempoAtual + 1;

    }, 1000);
}

window.onload = () => { //funcao para colocar o nome do player na tela.

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
