import React, { Component } from "react";
import Bolt from "./Bolt";

class Board extends Component {
  state = {
    cells: [],
    rows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    columns: [1, 2, 3, 4, 5, 6, 7, 8],
    move: true
  };
  add = e => {
    // -----how to change player bolt colors:-----

    // bolt selector:
    const bolt = e.currentTarget.querySelector("span");
    bolt.classList.remove("hide");

    // conditionally change the bolt player colors on turns:
    (this.state.move && bolt.classList.add("Black")) ||
      (!this.state.move && bolt.classList.add("White"));

    // bolt player selector according to the turns:
    this.setState({ move: !this.state.move });
    setTimeout(() => {
      bolt.style.transform = "rotateY(180deg)";
    }, 1);

    // -----how to take opponent's bolts-----

    // an array of all td elements on the board:
    const cells = document.getElementsByTagName("td");
    const clickedCellIndex = cells.indexOf(e.currentTarget);
    console.log(clickedCellIndex);

    // an array of all td values on the board:
    const Boardcellvalues = [];
    for (let index = 0; index < cells.length; index++) {
      Boardcellvalues[index] = cells[index].textContent;
    }

    // clicked cell text value:
    const clickedCell = e.currentTarget.textContent;

    // clicked row values extracted from all cells by the first letter of the clicked cell text value:
    const clickedRowCellvalues = Boardcellvalues.filter(item => {
      return item.indexOf(clickedCell[0]) === 0;
    });
    // selecting row tds according to the values of the clicked row:
    // const clickedRowtds = [];
    // for (let index = 0; index < clickedRowCellvalues.length; index++) {
    //   clickedRowtds[index] = cells.filter(item => {
    //     return item.textContent === clickedRowCellvalues[index];
    //   });
    // }
    // console.log(clickedRowtds);
    // cell value written in the clicked td:

    // extracting the clicked row cells with the first letter of the clicked td value by boltCell[0]:
    // const clickedRow = cellValues.filter(item => {
    //   return item[0] === boltCell[0];
    // });
    // console.log(clickedRow);
  };
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          style={{
            cursor: "pointer",
            backgroundColor: "green",
            color: "white"
          }}
          className="Board m-3"
        >
          <tbody>
            {this.state.rows.map((item, index) => {
              const rowName = this.state.rows[index];
              return (
                <tr key={rowName} ref={rowName}>
                  {this.state.columns.map((item, index) => {
                    const columnName = this.state.columns[index];
                    const cellName = rowName + columnName;
                    return (
                      <td
                        onClick={this.add}
                        style={{
                          border: "3px solid white",
                          height: "80px",
                          width: "80px",
                          position: "relative",
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0
                        }}
                        key={cellName}
                        ref={cellName}
                      >
                        <Bolt />
                        {cellName}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
