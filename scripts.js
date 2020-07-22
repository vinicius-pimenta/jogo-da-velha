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
		
		if(winner){
			this.isFinished = true;
		}

		let template = '';
		this.field.forEach((line, lineIndex)=>{
			template += '<tr>';
			line.forEach((column, columnIndex)=>{
				template += `<td onclick="Game.setField(${lineIndex}, ${columnIndex})" >${column}</td>`;
			})
			template += '</tr>'
		})
		tableElement.innerHTML = template;
	},

	isWinnerByTheDiagonal(rows, cols) {
		// Verifica se teve algum ganhador através da diagonal principal
		if(this.field[0][0] !== '' && this.field[0][0] === this.field[1][1] && this.field[1][1] === this.field[2][2]){
			return field[0][0];
		}

		// Verifica se teve algum ganhador através da diagonal secundária
		if(this.field[0][2] !== '' && this.field[0][2] === this.field[1][1] && this.field[1][1] === this.field[2][0]){
			return field[0][2];
		}

		/* Verifica se a quantidade de vezes jogadas é igual ao total de opção disponivél.
			 Caso sim, é um indicativo que não ninguém venceu. */
		if(this.round === rows * cols){
			return 'Nobody';
		}
	},

	isWinnerByRowsOrCols(totalRow, totalCol) {
		if(totalRow === 3 || totalCol === 3){
			return 'X';
		}

		if(totalRow === -3 || totalCol === -3){
			return 'O';
		}

		return '';
	},

	// Método que atualiza os resultados e verifica se o jogo terminou
	isGameOver(){
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

			const winner = this.isWinnerByRowsOrCols(totalRow, totalCol)
			if (winner !== '') {
				return winner
			}
		}

		this.isWinnerByTheDiagonal(rows, cols)
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
}

Game.start();