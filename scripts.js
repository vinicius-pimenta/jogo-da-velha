const divElement = document.querySelector('div'),
			tableElement = document.querySelector('table');

const Game = {
	start(){
		this.field = [
			['','',''],
			['','',''],
			['','','']
		];
		this.currentPlayer = 'X';
		this.isFinished = false;
		this.round = 0;
		this.render();
	},

	render(){
		let winner = this.isGameOver();
		divElement.textContent = winner ? `Ganhador: ${winner}` : `Jogador: ${this.currentPlayer}`;

		let template = '';

		if(winner){
			this.isFinished = true;	
		}

		this.field.forEach((line, lineIndex)=>{
			template += '<tr>';
			line.forEach((column, columnIndex)=>{
				template += `<td onclick="Game.setField(${lineIndex}, ${columnIndex})" >${column}</td>`;
			})
			template += '</tr>'
		})

		tableElement.innerHTML = template;

		if (winner) this.paintWinner()
	},

	// Método que atualiza os resultados e verifica se o jogo terminou
	isGameOver(){
		let winner = ''
		let field = this.field,
			rows = 3,
			cols = 3

		for(let i = 0; i < rows; i++){
			totalRow = 0;
			totalCol = 0;

			for(let j = 0; j < cols; j++){
				if(field[i][j] === 'X'){
					totalRow++;
				}
				if(field[i][j] === 'O'){
					totalRow--;
				}
				if(field[j][i] === 'X'){
					totalCol++;
				}
				if(field[j][i] === 'O'){
					totalCol--;
				}
			}

			winner = this.getWinnerByRowsOrCols(totalRow, totalCol)
			if (winner) {
				return winner
			}
		}

		winner = this.getWinnerByTheMainDiagonal()
		if (winner) {
			return winner
		}

		winner = this.getWinnerByTheSecundaryDiagonal()
		if (winner) {
			return winner
		}

		winner = this.getTie(rows, cols) 
		if (winner) {
			return winner
		}
	},

	getWinnerByRowsOrCols(totalRow, totalCol) {
		if(totalRow === 3 || totalCol === 3){
			return 'X';
		}

		if(totalRow === -3 || totalCol === -3){
			return 'O';
		}
	},

	getWinnerByTheMainDiagonal() {
		// Verifica se teve algum ganhador através da diagonal principal
		if(this.field[0][0] !== '' && this.field[0][0] === this.field[1][1] && this.field[1][1] === this.field[2][2]){
			return this.field[0][0];
		}
	},

	getWinnerByTheSecundaryDiagonal() {
		// Verifica se teve algum ganhador através da diagonal secundária
		if(this.field[0][2] !== '' && this.field[0][2] === this.field[1][1] && this.field[1][1] === this.field[2][0]){
			return this.field[0][2];
		}
	},

	getTie(rows, cols) {
		/* Verifica se a quantidade de vezes jogadas é igual ao total de opção disponivél.
			 Caso sim, é um indicativo que não ninguém venceu. */
			if(this.round === rows * cols){
				return 'Empate';
			}
	},

	// Método que faz a marcação dos caracteres X e Y na célula clicada.
	setField(line, column){
		/* Verifica se o jogo não está finalizado e se a célula está vazia.
			 Caso essas duas opções sejam verdades, será feito a marcação. */
		if(!this.isFinished && this.field[line][column] === ''){
			this.field[line][column] = this.currentPlayer;
			this.nextPlayer();
			this.round++;
			this.render();
		}
	},

	// Método que alterna jogagores
	nextPlayer(){
		this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
	},

	paintWinner() {
		if(this.getWinnerByTheMainDiagonal()) {
			for(let i = 0; i <= 8; i=i+4) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = '#38d39f'
			}
		} 
		else if(this.getWinnerByTheSecundaryDiagonal()) {
			for(let i = 2; i <= 6; i=i+2) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = '#38d39f'
			} 
		} 
		else if(this.isTopLineWinner()) {
			for(let i = 0; i <= 2; i++) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = '#38d39f'
			} 
		}
		else if(this.isRightLineWinner()) {
			for(let i = 2; i <= 8; i=i+3) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = '#38d39f'
			} 
		}
		else if(this.isBottomLineWinner()) {
			for(let i = 6; i <= 8; i++) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = '#38d39f'
			} 
		}
		else if(this.isLeftLineWinner()) {
			for(let i = 0; i <= 6; i=i+3) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = '#38d39f'
			} 
		}
		else if(this.isMiddleLineWinnerLeftToRight()) {
			for(let i = 3; i <= 5; i++) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = '#38d39f'
			} 
		}
		else if(this.isMiddleLineWinnerTopToDown()) {
			for(let i = 1; i <= 7; i=i+3) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = '#38d39f'
			} 
		}
		else {
			for (let i = 0; i<= 8; i++) {
				tableElement.querySelectorAll('td')[i].style.backgroundColor = 'yellow'
			}
		}
	},

	isTopLineWinner() {
		if((tableElement.querySelectorAll('td')[0].textContent == 'X' && 
				tableElement.querySelectorAll('td')[1].textContent == 'X' &&
				tableElement.querySelectorAll('td')[2].textContent == 'X') ||
				(tableElement.querySelectorAll('td')[0].textContent == 'O' && 
				tableElement.querySelectorAll('td')[1].textContent == 'O' &&
				tableElement.querySelectorAll('td')[2].textContent == 'O') ) {

			return true;
		}
	},

	isRightLineWinner() {
		if((tableElement.querySelectorAll('td')[2].textContent == 'X' && 
				tableElement.querySelectorAll('td')[5].textContent == 'X' &&
				tableElement.querySelectorAll('td')[8].textContent == 'X') ||
				(tableElement.querySelectorAll('td')[2].textContent == 'O' && 
				tableElement.querySelectorAll('td')[5].textContent == 'O' &&
				tableElement.querySelectorAll('td')[8].textContent == 'O') ) {

			return true;
		}
	},

	isBottomLineWinner() {
		if((tableElement.querySelectorAll('td')[6].textContent == 'X' && 
				tableElement.querySelectorAll('td')[7].textContent == 'X' &&
				tableElement.querySelectorAll('td')[8].textContent == 'X') ||
				(tableElement.querySelectorAll('td')[6].textContent == 'O' && 
				tableElement.querySelectorAll('td')[7].textContent == 'O' &&
				tableElement.querySelectorAll('td')[8].textContent == 'O') ) {

			return true;
		}
	},

	isLeftLineWinner() {
		if((tableElement.querySelectorAll('td')[0].textContent == 'X' && 
				tableElement.querySelectorAll('td')[3].textContent == 'X' &&
				tableElement.querySelectorAll('td')[6].textContent == 'X') ||
				(tableElement.querySelectorAll('td')[0].textContent == 'O' && 
				tableElement.querySelectorAll('td')[3].textContent == 'O' &&
				tableElement.querySelectorAll('td')[6].textContent == 'O') ) {

			return true;
		}
	},

	isMiddleLineWinnerLeftToRight() {
		if((tableElement.querySelectorAll('td')[3].textContent == 'X' && 
				tableElement.querySelectorAll('td')[4].textContent == 'X' &&
				tableElement.querySelectorAll('td')[5].textContent == 'X') ||
				(tableElement.querySelectorAll('td')[3].textContent == 'O' && 
				tableElement.querySelectorAll('td')[4].textContent == 'O' &&
				tableElement.querySelectorAll('td')[5].textContent == 'O') ) {

			return true;
		}
	},

	isMiddleLineWinnerTopToDown() {
		if((tableElement.querySelectorAll('td')[1].textContent == 'X' && 
				tableElement.querySelectorAll('td')[4].textContent == 'X' &&
				tableElement.querySelectorAll('td')[7].textContent == 'X') ||
				(tableElement.querySelectorAll('td')[1].textContent == 'O' && 
				tableElement.querySelectorAll('td')[4].textContent == 'O' &&
				tableElement.querySelectorAll('td')[7].textContent == 'O') ) {

			return true;
		}
	},
}

Game.start()