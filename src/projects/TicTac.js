import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import './TicTac.css';

class TicTac extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
            winningLine: []
        };
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.handleClick = this.handleClick.bind(this);

    } //end of constructor

    handleClick(event) {
        let squares = this.state.squares;
        squares[event.target.id] = (this.state.xIsNext) ? "X" : "O";
        const theWinner = this.calculateWinner(squares);
        //in React you have to use setState()
        this.setState({
            squares,   //property name == variable name, so can just put squares
            xIsNext: !this.state.xIsNext,
            winner: theWinner.player,
            winningLine: theWinner.winningLine
        });
    }

    calculateWinner(squares) {
        for (let i = 0; i < this.lines.length; i++) {
            const [a, b, c] = this.lines[i];
            if (squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]) {
                return { player: squares[a], winningLine: this.lines[i] };
            }
        }
        return { player: null, winningLine: [] };
    }

    renderSquare(i) {
        const className = (this.state.squares[i] == null) ? "square" :
            (this.state.winner != null && this.state.winner === this.state.squares[i] &&
                this.state.winningLine.includes(i)) ?
                "square-winner" : "square-full";
        const enabled = (this.state.winner == null && this.state.squares[i] == null) ? true : false;
        const eventHandler = (enabled) ? this.handleClick : () => { };
        //changed output from template literals to JSX
        // `${var}` becomes {var}
        const output =
            <div className={className} id={i}
                onClick={eventHandler}>
                {(this.state.squares[i] != null) ? this.state.squares[i] : ""}
            </div>;
        //you don't need quotations above? what variable type is output if not a string?
        return output;
    }

    render() {
        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        const output =
            <Paper>
                <div style = {{display: "inline-block"}}>
                    <div className="status">{status}</div>
                    <div className="row">
                        {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
                    </div>
                    <div className="row">
                        {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
                    </div>
                    <div className="row">
                        {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
                    </div>
                </div>

            </Paper>;

        return output;
    }
} //end of App Component class

export default TicTac;
