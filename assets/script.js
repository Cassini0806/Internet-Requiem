//Puxa os elementos HTML para o Script
const board = document.getElementById('board')
const squares = document.getElementsByClassName('square')
const players = ['X', 'O']
let currentPlayer = players[0]

//Indica o Turno/Jogador atual
const endMessage = document.createElement('h3')
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
board.after(endMessage)

//Combinações para vencer
const winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,4],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

//cria um loop para verificar cada quadrado
for(let i = 0; i < squares.length; i++){
    squares[i].addEventListener('click', () => {
        //Verifica se o espaço é livre
        if(squares[i].textContent !== ''){
            return
        }
        //Printa X/O
        squares[i].textContent = currentPlayer
        //chama checkwin()
        if(checkWin(currentPlayer)) {
            endMessage.textContent=`Game over! ${currentPlayer} wins!`
            return
        }
        //chama checktie()
        if(checkTie()) {
            endMessage.textContent= `Game is tied!`
            return
        }
        //alterna o jogador atual
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0] 
        //anuncia vencedor de acordo com o jogador da rodada
        if(currentPlayer == players[0]) {
            endMessage.textContent= `X's turn!`
        } else {
            endMessage.textContent= `O's turn!`
        }     
    })   
}

//Verifica se o jogador venceu
function checkWin(currentPlayer) {
    for(let i = 0; i < winning_combinations.length; i++){
        const [a, b, c] = winning_combinations[i]
        if(squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer){
            return true
        }
    }
    return false
}

//Verifica se o jogo empatou
function checkTie(){
    for(let i = 0; i < squares.length; i++) {
        if(squares[i].textContent === '') {
            return false;
        }
    }
    return true
}

//Botao de Restart
function restartButton() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].textContent = ""
    }
    endMessage.textContent=`X's turn!`
    currentPlayer = players[0]
}