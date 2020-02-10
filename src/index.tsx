import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import react_o_image from './react_o.svg';
import react_x_image from './react_x.svg';

class Square extends React.Component<{ value: string, onClick: ()=>void }> {

    render() {

        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                { this.renderImage(this.props.value) }
            </button>
        );
    }

    renderImage(value: string){
        if(value){
            return <img className="symbol" src={this.symbolUrl(value)} alt={value} />;
        }
        return undefined;
    }

    symbolUrl(value: string){
        if(value === 'X') return react_x_image;
        if(value === 'O') return react_o_image;
        return undefined;
    }

}

class Board extends React.Component<BoardState & {onClick: (i: number)=>void}> {

    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }

}


interface GameState {
    history: BoardState[];
}
interface BoardState {
    squares: string[];
    xIsNext: boolean;
}

class Game extends React.Component<{}, GameState> {

    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                xIsNext: true
            }],
        };
    }


    render() {

        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        const draw = calculateDraw(current.squares);
        let status;
    
        if (winner) {
            status = 'Winner: ' + winner;
        } else if(draw) {
            status = 'Draw';
        } else {
            status = 'Next player: ' + (current.xIsNext ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} xIsNext={current.xIsNext} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        );
    }

    handleClick(i) {

        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(calculateDraw(squares) || calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = current.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares,
                xIsNext: !current.xIsNext
            }])
        });
    }

    jumpTo(move: number){

        this.setState({
            history: this.state.history.slice(0, move + 1)
        });

    }

}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function calculateDraw(squares){
    for(let i = 0; i < squares.length; i++){
        if(squares[i] === null) return false;
    }
    return true;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
