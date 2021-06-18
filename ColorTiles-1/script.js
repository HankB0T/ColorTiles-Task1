function color3x3() {
    let qor=0; let qob=0; let qoy=0; let qog=0; let qow=0; let qoo=0;
    for(let j=0;j<=8;j++) {
      let y = Math.floor(Math.random() * 6);
  
  
      if (y===0 && qor<4) {
          qor+=1;
          document.getElementById("a"+j).style.backgroundColor="red";
          }
      else if (y===0 && qor>=4) {
          if (qob<4) document.getElementById("a"+j).style.backgroundColor="blue";
          if (qoy<4) document.getElementById("a"+j).style.backgroundColor="yellow";
          if (qog<4) document.getElementById("a"+j).style.backgroundColor="green";
          if (qow<4) document.getElementById("a"+j).style.backgroundColor="white";
          if (qoo<4) document.getElementById("a"+j).style.backgroundColor="orange";
      }
  
      if (y===1 && qob<4) {
          qob+=1;
          document.getElementById("a"+j).style.backgroundColor="blue";
          }
      else if (y===1 && qob>=4) {
          if (qor<4) document.getElementById("a"+j).style.backgroundColor="red";
          if (qoy<4) document.getElementById("a"+j).style.backgroundColor="yellow";
          if (qog<4) document.getElementById("a"+j).style.backgroundColor="green";
          if (qow<4) document.getElementById("a"+j).style.backgroundColor="white";
          if (qoo<4) document.getElementById("a"+j).style.backgroundColor="orange";
      }
  
  
      if (y===2 && qoy<4) {
          qoy+=1;
          document.getElementById("a"+j).style.backgroundColor="yellow";
          }
      else if (y===2 && qoy>=4) {
          if (qor<4) document.getElementById("a"+j).style.backgroundColor="red";
          if (qob<4) document.getElementById("a"+j).style.backgroundColor="blue";
          if (qog<4) document.getElementById("a"+j).style.backgroundColor="green";
          if (qow<4) document.getElementById("a"+j).style.backgroundColor="white";
          if (qoo<4) document.getElementById("a"+j).style.backgroundColor="orange";
      }
  
  
      if (y===3 && qog<4) {
          qog+=1;
          document.getElementById("a"+j).style.backgroundColor="green";
          }
      else if (y===3 && qog>=4) {
          if (qor<4) document.getElementById("a"+j).style.backgroundColor="red";
          if (qob<4) document.getElementById("a"+j).style.backgroundColor="blue";
          if (qoy<4) document.getElementById("a"+j).style.backgroundColor="yellow";
          if (qow<4) document.getElementById("a"+j).style.backgroundColor="white";
          if (qoo<4) document.getElementById("a"+j).style.backgroundColor="orange";
      }
  
  
      if (y===4 && qow<4) {
          qow+=1;
          document.getElementById("a"+j).style.backgroundColor="white";
          }
      else if (y===4 && qow>=4) {
          if (qor<4) document.getElementById("a"+j).style.backgroundColor="red";
          if (qob<4) document.getElementById("a"+j).style.backgroundColor="blue";
          if (qoy<4) document.getElementById("a"+j).style.backgroundColor="yellow";
          if (qog<4) document.getElementById("a"+j).style.backgroundColor="green";
          if (qoo<4) document.getElementById("a"+j).style.backgroundColor="orange";
      }
  
  
      if (y===5 && qoo<4) {
          qoo+=1;
          document.getElementById("a"+j).style.backgroundColor="orange";
          }
      else if (y===5 && qoo>=4) {
          if (qor<4) document.getElementById("a"+j).style.backgroundColor="red";
          if (qob<4) document.getElementById("a"+j).style.backgroundColor="blue";
          if (qoy<4) document.getElementById("a"+j).style.backgroundColor="yellow";
          if (qog<4) document.getElementById("a"+j).style.backgroundColor="green";
          if (qow<4) document.getElementById("a"+j).style.backgroundColor="white";
      }
    }
  }
  
  class Box {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
    
      getTopBox() {
        if (this.y === 0) return null;
        return new Box(this.x, this.y - 1);
      }
    
      getRightBox() {
        if (this.x === 4) return null;
        return new Box(this.x + 1, this.y);
      }
    
      getBottomBox() {
        if (this.y === 4) return null;
        return new Box(this.x, this.y + 1);
      }
    
      getLeftBox() {
        if (this.x === 0) return null;
        return new Box(this.x - 1, this.y);
      }
    
      getNextdoorBoxes() {
        return [
          this.getTopBox(),
          this.getRightBox(),
          this.getBottomBox(),
          this.getLeftBox()
        ].filter(box => box !== null);
      }
    
      getRandomNextdoorBox() {
        const nextdoorBoxes = this.getNextdoorBoxes();
        return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
      }
    }
    
    const swapBoxes = (grid, box1, box2) => {
      const temp = grid[box1.y][box1.x];
      grid[box1.y][box1.x] = grid[box2.y][box2.x];
      grid[box2.y][box2.x] = temp;
    };
    
    const isSolved = grid => {
      return (
        document.getElementById("a0").style.backgroundColor === grid[1][1] &&
        document.getElementById("a1").style.backgroundColor === grid[1][2] &&
        document.getElementById("a2").style.backgroundColor === grid[1][3] &&
        document.getElementById("a3").style.backgroundColor === grid[2][1] &&
        document.getElementById("a4").style.backgroundColor === grid[2][2] &&
        document.getElementById("a5").style.backgroundColor === grid[2][3] &&
        document.getElementById("a6").style.backgroundColor === grid[3][1] &&
        document.getElementById("a7").style.backgroundColor === grid[3][2] &&
        document.getElementById("a8").style.backgroundColor === grid[3][3]
      );
    };
    
    const getRandomGrid = () => {
      let grid=[["red", "red", "red", "red", "blue"], 
      ["blue", "blue", "blue", "yellow", "yellow"],     
      ["yellow", "yellow", "green", "green", "green"],
      ["green", "white", "white", "white", "white"],
      ["orange", "orange", "orange", "orange", "grey"],
      ];
    
      // Randomize
      let blankBox = new Box(4, 4);
      for (let i = 0; i < 1000; i++) {
        const randomNextdoorBox = blankBox.getRandomNextdoorBox();
        swapBoxes(grid, blankBox, randomNextdoorBox);
        blankBox = randomNextdoorBox;
      }
      if (isSolved(grid)) return getRandomGrid();
      return grid;
    };
    
    class State {
      constructor(grid, move, time, status) {
        this.grid = grid;
        this.move = move;
        this.time = time;
        this.status = status;
      }
    
      static ready() {
        return new State(
      [["grey", "grey", "grey", "grey", "grey"], 
      ["grey", "grey", "grey", "grey", "grey"],    
      ["grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey"],
      ["grey", "grey", "grey", "grey", "grey"],
      ],
          0,
          0,
          "ready"
        );
      }
    
      static start() {
        color3x3();
        return new State(getRandomGrid(), 0, 0, "playing");
      }
    }
    
    class Game {
      constructor(state) {
        this.state = state;
        this.tickId = null;
        this.tick = this.tick.bind(this);
        this.render();
        this.handleClickBox = this.handleClickBox.bind(this);
      }
    
      static ready() {
        return new Game(State.ready());
      }
    
      tick() {
        this.setState({ time: this.state.time + 1 });
      }
    
      setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
      }
    
      handleClickBox(box) {
        return function() {
          const nextdoorBoxes = box.getNextdoorBoxes();
          const blankBox = nextdoorBoxes.find(
            nextdoorBox => this.state.grid[nextdoorBox.y][nextdoorBox.x] === "grey"
          );
          if (blankBox) {
            const newGrid = [...this.state.grid];
            swapBoxes(newGrid, box, blankBox);
            if (isSolved(newGrid)) {
              clearInterval(this.tickId);
              this.setState({
                status: "won",
                grid: newGrid,
                move: this.state.move + 1
              });
            } else {
              this.setState({
                grid: newGrid,
                move: this.state.move + 1
              });
            }
          }
        }.bind(this);
      }
    
      render() {
        const { grid, move, time, status } = this.state;
    
        // Render grid
        const newGrid = document.createElement("div");
        newGrid.className = "grid5";
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            const button = document.createElement("button");
            button.id = "z"+(j+(i*5));
            button.style.backgroundColor=grid[i][j];
            if (status === "playing") {
              button.addEventListener("click", this.handleClickBox(new Box(j, i)));
            }
            newGrid.appendChild(button);
          }
        }
        document.querySelector(".grid5").replaceWith(newGrid);
        // Render button
        const newButton = document.createElement("button");
        if (status === "ready") newButton.textContent = "Play";
        if (status === "playing") newButton.textContent = "Reset";
        if (status === "won") newButton.textContent = "Play";
        newButton.addEventListener("click", () => {
          clearInterval(this.tickId);
          this.tickId = setInterval(this.tick, 1000);
          this.setState(State.start());
        });
        document.querySelector(".footer button").replaceWith(newButton);
    
        // Render move
        document.getElementById("move").textContent = `Move: ${move}`;
    
        // Render time
        document.getElementById("time").textContent = `Time: ${time}`;
  
        // Render message1 and message2
        if (status === "won") {
          document.querySelector(".message1").textContent = "YOU WIN!";
          document.querySelector(".message2").textContent = `Your score: ${Math.ceil(600000/(this.state.time*this.state.move))}`;
        } else {
          document.querySelector(".message1").textContent = "";
          document.querySelector(".message2").textContent = "";
        }
      }
    }
    
    const GAME = Game.ready();