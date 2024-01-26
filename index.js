const selectElement = document.querySelector('select');
const span = document.querySelector('#resultado');
const botao = document.getElementById('botao');
const highscoreNumero = document.getElementById('highscorenumero')

let cps = 0;

let clicks = 0;
let segundos = 10;
let display = document.getElementById('display');

let jaClicou = false;
let tempo = Number(selectElement.value);


function clicar(){
    if (!jaClicou){
        startTimeout();
        jaClicou = true;
        botao.classList.add('ativo')
        botao.innerText = "Começou!"
    }
    clicks += 1;
    display.value = clicks;
    
}

function mudarSpan() {
    span.innerText = cps.toFixed(1).replace('.', ",");
}

function startTimeout(){
    setTimeout(() => {
        console.log(tempo + " dale " + clicks);
        tempoAcabou();
        mudarSpan();
        modal.showModal();
        jaClicou = false;
        clicks = 0;
        display.value = clicks;
    }, tempo * 1000);
}

function setCPS(){
    cps = clicks / segundos;
}

function tempoAcabou(){
    cps = clicks / tempo;
    console.log(cps);
    botao.classList.remove('ativo')
    botao.innerText = "Clique aqui para começar"

    tentarAtualizarHighscore(cps)
}

function changeTempo() {
    tempo = Number(selectElement.value);    
}

function resetarCPS() {
    localStorage.clear()
    highscoreNumero.innerText = "0"
}

function tentarAtualizarHighscore(cpsAtual) {
    console.log(localStorage.getItem('highscore'))

    // Caso não tenha nada no localStorage
    if (localStorage.getItem('highscore') === null) {
        highscoreNumero.innerText = cpsAtual
        localStorage.setItem('highscore', cps);
        return;
    }

    const ultimoHighscoreNumero = Number(localStorage.getItem('highscore'))
    if (cpsAtual > ultimoHighscoreNumero) {
        highscoreNumero.innerText = cpsAtual
        localStorage.setItem('highscore', cps);
    }

    console.log(localStorage.getItem('highscore'))
}

function inicializarHighscore() {
    highscoreNumero.innerText = localStorage.getItem('highscore') === null ? '0' : localStorage.getItem('highscore');
}
inicializarHighscore();

selectElement.addEventListener('change', changeTempo)

const modalbutton = document.getElementById('modalbutton')
const modal = document.getElementById('caixinhaResultado')
