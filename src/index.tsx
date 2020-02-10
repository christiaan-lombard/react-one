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

class Board extends React.Component<any, {squares: string[], nextIsX: boolean}> {

    constructor(props: any) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            nextIsX: true
        };
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {

        const winner = calculateWinner(this.state.squares);
        const draw = calculateDraw(this.state.squares);

        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else if(draw) {
            status = 'Draw';
        } else {
            status = 'Next player: ' + (this.state.nextIsX ? 'X' : 'O');
        }


        return (
            <div>
                <div className="status">{status}</div>
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

    handleClick(i) {
        const squares = this.state.squares.slice();

        if(calculateDraw(squares) || calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = this.state.nextIsX ? 'X' : 'O';
        this.setState({
            squares: squares,
            nextIsX: !this.state.nextIsX
        });
    }



}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
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
