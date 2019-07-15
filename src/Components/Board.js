import React, { Component } from "react";
import Bolt from "./Bolt";

class Board extends Component {
  state = {
    // all cells in the board:
    cells: [],
    rows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    columns: [1, 2, 3, 4, 5, 6, 7, 8],
    // variable that change bolt colors according to players' turn:
    move: true,
    // color classes should begin with capital letter for their css classes to be functional:
    color: ["Black", "White"],
    currentColor: "",
    // index of the last column cells used in calculation for horizontal bolt taking:
    lastColumn: [7, 15, 23, 31, 39, 47, 55, 63],
    // index of the first column cells used in calculation for horizontal bolt taking:
    // in reverse order in order to let find() method find the first instance lower than the clicked item index:
    firstColumn: [56, 48, 40, 32, 24, 16, 8, 0],
    // cells located at the beginning and end of each oblique line on the board:
    // prettier-ignore
    top_left_to_Bottom_right_obliqueRowsLastCells: [7, 15, 23, 31, 39, 47, 55, 56, 57, 58, 59, 60, 61, 62, 63],
    // prettier-ignore
    top_left_to_Bottom_right_obliqueRowsFirstCells: [0, 1, 2, 3, 4, 5, 6, 7, 8, 16, 24, 32, 40, 48, 56],
    // prettier-ignore
    top_right_to_Bottom_left_obliqueRowsLastCells: [0, 8, 16, 24, 32, 40, 48, 56, 57, 58, 59, 60, 61, 62, 63],
    // prettier-ignore
    top_right_to_Bottom_left_obliqueRowsFirstCells: [0, 1, 2, 3, 4, 5, 6, 7, 15, 23, 31, 39, 47, 55, 63]
  };

  componentDidMount() {
    const Allcells = document.getElementsByTagName("td");
    // centered cells' index which should be always filled with bolts at the beginning of the game:
    // the order of this array matters:
    // prettier-ignore
    const centered_cells = [Allcells[27], Allcells[28], Allcells[36], Allcells[35]   ];
    const centered_cells_bolt = centered_cells.map(item => {
      return item.querySelector("span");
    });
    let boolean = true;
    centered_cells_bolt.forEach(item => {
      item.classList.remove("hide");
      if (boolean) {
        item.classList.add(this.state.color[0]);
      } else {
        item.classList.add(this.state.color[1]);
      }
      boolean = !boolean;
    });
  }

  add = e => {
    // -----how to change player bolt colors:-----

    // bolt selector:
    const bolt = e.currentTarget.querySelector("span");
    const boltCell = e.currentTarget;
    bolt.classList.remove("hide");

    // conditionally change the bolt player colors on turns:
    if (this.state.move) {
      bolt.classList.add(this.state.color[0]);
      this.setState({ currentColor: this.state.color[0] });
    } else {
      bolt.classList.add(this.state.color[1]);
      this.setState({ currentColor: this.state.color[1] });
    }

    // bolt player selector according to the turns:
    this.setState({ move: !this.state.move });
    setTimeout(() => {
      bolt.style.transform = "rotateY(180deg)";
    }, 1);

    // -----how to take opponent's bolts-----
    //    ---- horizontal bolt taking (X axis) ----
    // an array of all td elements on the board:
    const Allcells = document.getElementsByTagName("td");
    for (let i = 0; i < Allcells.length; i++) {
      // selecting the clicked cell in Allcells array:
      if (Allcells[i] === boltCell) {
        // return the first and last column cell of the clicked cell:
        const lastcolumnIndex = this.state.lastColumn.find(item => {
          return item >= i;
        });
        const firstcolumnIndex = this.state.firstColumn.find(item => {
          return item <= i;
        });

        //check if the next clicked cell is clicked (doesn't have "hide" class) and is of a different bolt color(second index of their class list element isn't equal)
        if (
          i !== lastcolumnIndex &&
          !Allcells[i + 1].querySelector("span").classList.contains("hide") &&
          Allcells[i + 1].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray = [];
          // check if there is any bolts of the same color in the row:
          for (let l = i + 1; l <= lastcolumnIndex; l++) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt with the same color in the same row):
              for (let x = i + 1; x < l; x++) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              if (emptyCellsArray.length === 0) {
                for (let x = i + 1; x < l; x++) {
                  //check to see if the length of the empty array cells is 0:
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }

        //check if the next clicked cell is clicked (doesn't have "hide" class) and is of a different bolt color(second index of their class list element isn't equal)
        if (
          i !== firstcolumnIndex &&
          !Allcells[i - 1].querySelector("span").classList.contains("hide") &&
          Allcells[i - 1].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray = [];
          // check if there is any bolts of the same color in the row:
          for (let l = i - 1; l >= firstcolumnIndex; l--) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i - 1; x > l; x--) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray.length === 0) {
                for (let x = i - 1; x > l; x--) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
      }
    }
    //       ---- vertical bolt taking (Y axis) ----
    //      -- from top to bottom bolt taking --
    for (let i = 0; i < Allcells.length; i++) {
      // selecting the clicked cell in Allcells array:
      if (Allcells[i] === boltCell) {
        // return the first and last column cells of the clicked cell:
        const emptyLastArr = [];
        for (let l = i; l <= 63; l += 8) {
          emptyLastArr.push(l);
        }
        const lastrowIndex = emptyLastArr.pop();
        const emptyFirstArr = [];
        for (let l = i; l >= 0; l -= 8) {
          emptyFirstArr.push(l);
        }
        const firstrowIndex = emptyFirstArr.pop();

        //check if the next clicked cell is clicked (doesn't have "hide" class) and is of a different bolt color(second index of their class list element isn't equal)
        if (
          i !== lastrowIndex &&
          !Allcells[i + 8].querySelector("span").classList.contains("hide") &&
          Allcells[i + 8].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray = [];
          // check if there is any bolts of the same color in the row:
          for (let l = i + 8; l <= lastrowIndex; l += 8) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt with the same color in the same row):
              for (let x = i + 8; x < l; x += 8) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray.length === 0) {
                for (let x = i + 8; x < l; x += 8) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        //    -- from buttom to top bolt taking --
        //check if the next clicked cell is clicked (doesn't have "hide" class) and is of a different bolt color(second index of their class list element isn't equal)
        if (
          i !== firstrowIndex &&
          !Allcells[i - 8].querySelector("span").classList.contains("hide") &&
          Allcells[i - 8].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray = [];
          // check if there is any bolts of the same color in the column:
          for (let l = i - 8; l >= firstrowIndex; l -= 8) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i - 8; x > l; x -= 8) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray.length === 0) {
                for (let x = i - 8; x > l; x -= 8) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        //        -----oblique bolt taking (Z axis)-----
        //          -- from top left to bottom right --
        const lastCells_array = [];
        for (let l = i; l <= 63; l += 9) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value = this.state.top_left_to_Bottom_right_obliqueRowsLastCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value !== undefined) {
            lastCells_array.push(array_value);
          }
        }
        // shifting the first value of the array
        const selected_oblique_lastCell = lastCells_array.shift();
        if (
          i !== selected_oblique_lastCell &&
          !Allcells[i + 9].querySelector("span").classList.contains("hide") &&
          Allcells[i + 9].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray = [];
          // check if there is any bolts of the same color in the column:
          for (let l = i + 9; l <= selected_oblique_lastCell; l += 9) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i + 9; x < l; x += 9) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray.length === 0) {
                for (let x = i + 9; x < l; x += 9) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        // -- from bottom right to top left --

        const lastCells_array2 = [];
        for (let l = i; l >= 0; l -= 9) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value2 = this.state.top_left_to_Bottom_right_obliqueRowsFirstCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value2 !== undefined) {
            lastCells_array2.push(array_value2);
          }
        }
        // shifting the first value of the array
        const selected_oblique_FirstCell = lastCells_array2.shift();
        if (
          i !== selected_oblique_FirstCell &&
          !Allcells[i - 9].querySelector("span").classList.contains("hide") &&
          Allcells[i - 9].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray2 = [];
          // check if there is any bolts of the same color in the oblique column:
          for (let l = i - 9; l >= selected_oblique_FirstCell; l -= 9) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i - 9; x > l; x -= 9) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray2.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray2.length === 0) {
                for (let x = i - 9; x > l; x -= 9) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        // -- from top right to bottom left --
        console.log(i);
        const lastCells_array3 = [];
        for (let l = i; l <= 63; l += 7) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value3 = this.state.top_right_to_Bottom_left_obliqueRowsLastCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value3 !== undefined) {
            lastCells_array3.push(array_value3);
          }
        }
        // shifting the first value of the array
        const selected_oblique_lastCell3 = lastCells_array3.shift();
        if (
          i !== selected_oblique_lastCell3 &&
          !Allcells[i + 7].querySelector("span").classList.contains("hide") &&
          Allcells[i + 7].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray3 = [];
          // check if there is any bolts of the same color in the column:
          for (let l = i + 7; l <= selected_oblique_lastCell3; l += 7) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i + 7; x < l; x += 7) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray3.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray3.length === 0) {
                for (let x = i + 7; x < l; x += 7) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
        // -- from bottom left to top right --

        const lastCells_array4 = [];
        for (let l = i; l >= 0; l -= 7) {
          // taking the 2 values of last cells in both X and Y axis:
          const array_value4 = this.state.top_right_to_Bottom_left_obliqueRowsFirstCells.find(
            item => {
              return item === l;
            }
          );
          // pushing the 2 returned values to an empty array:
          if (array_value4 !== undefined) {
            lastCells_array4.push(array_value4);
          }
        }
        // shifting the first value of the array
        const selected_oblique_FirstCell4 = lastCells_array4.shift();
        if (
          i !== selected_oblique_FirstCell4 &&
          !Allcells[i - 7].querySelector("span").classList.contains("hide") &&
          Allcells[i - 7].querySelector("span").classList[1] !==
            bolt.classList[1]
        ) {
          let emptyCellsArray4 = [];
          // check if there is any bolts of the same color in the oblique column:
          for (let l = i - 7; l >= selected_oblique_FirstCell4; l -= 7) {
            if (
              Allcells[l].querySelector("span").classList[1] ===
              bolt.classList[1]
            ) {
              // change the bolts in between in a row( "i" is the clicked element index and "l" is the bolt's index with the same color in the same row):
              for (let x = i - 7; x > l; x -= 7) {
                //check if the cells in between are not empty:
                if (
                  Allcells[x].querySelector("span").classList.contains("hide")
                ) {
                  // pushing the unclicked cells into the emptycells array:
                  emptyCellsArray4.push(Allcells[x]);
                }
              }
              //check to see if the length of the empty array cells is 0:
              if (emptyCellsArray4.length === 0) {
                for (let x = i - 7; x > l; x -= 7) {
                  Allcells[x]
                    .querySelector("span")
                    .classList.remove(
                      Allcells[x].querySelector("span").classList[1]
                    );
                  Allcells[x]
                    .querySelector("span")
                    .classList.add(bolt.classList[1]);
                  // animation when bolts color is being changed:
                  Allcells[x].querySelector("span").style.transform =
                    "rotateY(0)";
                }
              }
            }
          }
        }
      }
    }
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
