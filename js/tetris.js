
var GameState={
	currentTetrimino: {
		orientation: 0,
		x: 4,
		y: 19,
		type: 0
	},
	grid: undefined,
	ctx: undefined,
	timer: undefined,
	score: 0,
	level: 1,
	timestep: 1000,
	paused: false,
	constants:{
		tetriminoByType:{
			0: "I",
			1: "L",
			2: "J",
			3: "T",
			4: "O",
			5: "S",
			6: "Z",
			7: "Empty"
		},
		blockColors: [180,280,40,240,60,120,80,0]
		},
		initialize: function(){
			GameState.score=0;
			GameState.level=1;
			GameState.timestep=1000;
			GameState.currentTetrimino.type=0;
			GameState.currentTetrimino.x=4;
			GameState.currentTetrimino.y=18;
			GameState.currentTetrimino.orientation=0;
			GameState.grid=new Array(22);
			for(i=0;i< 22;i++){
				GameState.grid[i]=new Array(10);
				for(j=0;j< 10;j++){
					GameState.grid[i][j]=7;
				}
			}
			var c=document.getElementById("myCanvas");
			GameState.ctx=c.getContext("2d");
			clearInterval(GameState.timer);
			GameState.timer=setInterval(function(){GameState.gameStep()},GameState.timestep);
			GameState.drawGrid();
			GameState.updateScore();
							
		},
		pause: function(){
			// console.log("Pause called");
			if(GameState.paused){
				GameState.timer=setInterval(GameState.gameStep,GameState.timestep);
				document.getElementById("pause").innerHTML="Pause";
				GameState.paused=false;
			}else{
				clearInterval(GameState.timer);
				document.getElementById("pause").innerHTML="Unpause";
				GameState.paused=true;
			}
		},
		keyDown: function(event){
			if(GameState.paused)return;
			var x2,y2,o2;
			GameState.ctx.clearRect(0,0,200,400);
			// console.log(event.keyCode);
			switch(event.keyCode){
			case 37:{//left arrow
				GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,0);
				x2=GameState.currentTetrimino.x-1;
				if(GameState.drawTetrimino(x2,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,-1)){
					GameState.currentTetrimino.x=x2;
				}
				break;
			}
			case 38:{//up arrow
				GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,0);
				o2=(GameState.currentTetrimino.orientation+1)%4;
				if(GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,o2,-1)){
					GameState.currentTetrimino.orientation=o2;
				}
				break;
			}
			case 39:{//right arrow
				GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,0);
				x2=GameState.currentTetrimino.x+1;
				if(GameState.drawTetrimino(x2,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,-1)){
					GameState.currentTetrimino.x=x2;
				}
				break;
			}
			case 40:{// down arrow
				GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,0);
				// console.log("Pressing 40 moving down");
				y2=GameState.currentTetrimino.y-1;
				if(GameState.drawTetrimino(GameState.currentTetrimino.x,y2,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,-1)){
					GameState.currentTetrimino.y=y2;
				}
				break;
			}
			case 32:{
				GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,0);
				while(GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y-1,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,-1)){
					GameState.currentTetrimino.y-=1;
				}
				break;
			}
			default: 
			//{
			// 	GameState.drawTetrimino(x,y,t,o,0);
			// 	t=Math.floor((Math.random())* 7);
			// 	x=4;
			// 	y=18;
			// 	o=0;
			// } }
			}
			GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,1);
			GameState.drawGrid();
		},
		drawGrid: function(){
			GameState.ctx.clearRect(0,0,200,400);
			// console.log("Rectangle has been cleard");
			for(i=0;i< 20;i++){
				for(j=0;j< 10;j++){
					GameState.drawBlock(j,i,GameState.grid[i][j]);
				}
			}
		},
		gameStep: function(){
			var x2,y2,o2,t2;
			GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,0);
			y2=GameState.currentTetrimino.y-1;
			if(GameState.drawTetrimino(GameState.currentTetrimino.x,y2,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,-1)){
				GameState.currentTetrimino.y=y2;
			}else{
				GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,1)
				GameState.checkLines();
				t2=Math.floor((Math.random()*6));
				// console.log("The new type random number is:" + t2);
				x2=4;
				y2=19;
				o2=0;
				if(GameState.drawTetrimino(x2,y2,t2,o2,-1)){
					GameState.currentTetrimino.x=x2;
					GameState.currentTetrimino.y=y2;
					GameState.currentTetrimino.type=t2;
					GameState.currentTetrimino.orientation=o2;
				}else{
					alert("Game Over");
					GameState.initialize();
					return;
				}
			}
			GameState.drawTetrimino(GameState.currentTetrimino.x,GameState.currentTetrimino.y,GameState.currentTetrimino.type,GameState.currentTetrimino.orientation,1);
			// console.log("Drawing grid");
			GameState.drawGrid();
		},
		checkLines: function(){
			for(i=0;i<20;i++){
				var full=true;
				for(j=0;j<10;j++){
					full= full && GameState.grid[i][j]!==7;
				}
				if(full){
					for(ii=i;ii<19;ii++){
						for(jj=0;jj<10;jj++){
							GameState.grid[ii][jj]=GameState.grid[ii+1][jj];
						}
					}
					for(jj=0;jj<10;jj++){
						GameState.grid[19][jj]=7;
					}
					GameState.score+=1;
					GameState.levelUp();
					GameState.updateScore();
					i--;
				}
			}
		},
		levelUp: function(){
			if(GameState.score>=GameState.level*10){
				GameState.level++;
				GameState.timestep*=0.8;
				clearInterval(GameState.timer);
				GameState.timer=setInterval(GameState.gameStep,GameState.timestep);
			}
		},
		updateScore: function(){
			// console.log("Updating Score"+document.getElementById("score"));
			document.getElementById("score").innerHTML="Level:"+GameState.level+" , Score: "+ GameState.score;
		},
		drawBlock: function(x,y,t){
			var pixelX=x*20;
			var pixelY=(19-y)*20;
			var c=GameState.constants.blockColors[t];
			// console.log(c);
			GameState.ctx.fillStyle="hsl("+c+",100%,50%)";
			GameState.ctx.fillRect(pixelX+2,pixelY+2,16,16);

			/*Draw upper edge shading*/
			GameState.ctx.fillStyle="hsl("+c+",100%,70%)";
			GameState.ctx.beginPath();
			GameState.ctx.moveTo(pixelX,pixelY);
			GameState.ctx.lineTo(pixelX+20,pixelY);
			GameState.ctx.lineTo(pixelX+18,pixelY+2);
			GameState.ctx.lineTo(pixelX+2,pixelY+2);
			GameState.ctx.fill();
			/* Draw right edge shading*/
			GameState.ctx.fillStyle="hsl("+c+",100%,20%)";
			GameState.ctx.beginPath();
			GameState.ctx.moveTo(pixelX+20,pixelY);
			GameState.ctx.lineTo(pixelX+20,pixelY+20);
			GameState.ctx.lineTo(pixelX+18,pixelY+18);
			GameState.ctx.lineTo(pixelX+18,pixelY+2);
			GameState.ctx.fill();

			/*Draw bottom edge shading*/
			GameState.ctx.fillStyle="hsl("+c+",100%,40%)";
			GameState.ctx.beginPath();
			GameState.ctx.moveTo(pixelX+20,pixelY+20);
			GameState.ctx.lineTo(pixelX,pixelY+20);
			GameState.ctx.lineTo(pixelX+2,pixelY+18);
			GameState.ctx.lineTo(pixelX+18,pixelY+18);
			GameState.ctx.fill();

			/*Draw left edge shading*/
			GameState.ctx.fillStyle="hsl("+c+",100%,60%)";
			GameState.ctx.beginPath();
			GameState.ctx.moveTo(pixelX,pixelY+20);
			GameState.ctx.lineTo(pixelX,pixelY);
			GameState.ctx.lineTo(pixelX+2,pixelY+2);
			GameState.ctx.lineTo(pixelX+2,pixelY+18);
			GameState.ctx.fill();
		},
		drawTetrimino: function(x,y,t,o,d){
			var c;
			if(d===0){
				// console.log("Setting clearbit!");
				c=7;
			}
			else if(d===-1){
				c=-1;
			}else c=t;
			var valid=true;
			if(t===0){//for I shape
			 	// c=180;
				if(o===0){
					valid=valid && GameState.setGrid(x-1,y,c);
					valid=valid && GameState.setGrid(x,y,c);
					valid=valid && GameState.setGrid(x+1,y,c);
					valid=valid && GameState.setGrid(x+2,y,c);
				}else if(o===1){
					valid=valid && GameState.setGrid(x+1,y+1,c);
					valid=valid && GameState.setGrid(x+1,y,c);
					valid=valid && GameState.setGrid(x+1,y-1,c);
					valid=valid && GameState.setGrid(x+1,y-2,c);
				}else if(o==2){
					valid=valid && GameState.setGrid(x-1,y-1,c);
					valid=valid && GameState.setGrid(x,y-1,c);
					valid=valid && GameState.setGrid(x+1,y-1,c);
					valid=valid && GameState.setGrid(x+2,y-1,c);
				}else{
					valid=valid && GameState.setGrid(x+1,y-2,c);
					valid=valid && GameState.setGrid(x+1,y-1,c);
					valid=valid && GameState.setGrid(x+1,y,c);
					valid=valid && GameState.setGrid(x+1,y+1,c);
				}
			}else if(t===1){//for L shape
			 	// c=280;
				if(o===0){
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y+2,c);
				}else if(o===1){
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x+1,y+1,c);
					valid= valid && GameState.setGrid(x+2,y+1,c);
				}else if(o==2){
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x+1,y+1,c);
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x+1,y-1,c);
				}else{
					valid= valid && GameState.setGrid(x+1,y+1,c);
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x-1,y,c);
				}
			}else if(t===2){//for J shape
			 	// c=40;
				if(o===0){
					valid= valid && GameState.setGrid(x-1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y+2,c);
				}else if(o===1){
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x+2,y,c);
				}else if(o===2){
					valid= valid && GameState.setGrid(x+1,y+1,c);
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y-1,c);
				}else{
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x+1,y+1,c);
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x-1,y+1,c);
				}
			}else if(t===3){//for T shape
			 	// c=240;
				if(o===0){
					valid= valid && GameState.setGrid(x-1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x,y-1,c);
				}else if(o===1){
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y-1,c);
					valid= valid && GameState.setGrid(x-1,y,c);
				}else if(o==2){
					valid= valid && GameState.setGrid(x-1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x,y+1,c);
				}else{
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y-1,c);
					valid= valid && GameState.setGrid(x+1,y,c);
				}
			}else if(t===4){//O shape
				// c=60;
				valid= valid && GameState.setGrid(x,y,c);
				valid= valid && GameState.setGrid(x+1,y,c);
				valid= valid && GameState.setGrid(x,y-1,c);
				valid= valid && GameState.setGrid(x+1,y-1,c);
			}else if(t===5){//for S shape
			 	// c=120;
				if(o===0){
					valid= valid && GameState.setGrid(x-1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x+1,y+1,c);
				}else if(o===1){
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x+1,y-1,c);
				}else if(o==2){
					valid= valid && GameState.setGrid(x-1,y-1,c);
					valid= valid && GameState.setGrid(x,y-1,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x+1,y,c);
				}else{
					valid= valid && GameState.setGrid(x-1,y+1,c);
					valid= valid && GameState.setGrid(x-1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y-1,c);
				}
			}else if(t===6){//for Z shape
			 	// c=80;
				if(o===0){
					valid= valid && GameState.setGrid(x-1,y+1,c);
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x+1,y,c);
				}else if(o===1){
					valid= valid && GameState.setGrid(x+1,y+1,c);
					valid= valid && GameState.setGrid(x+1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y-1,c);
				}else if(o==2){
					valid= valid && GameState.setGrid(x-1,y,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x,y-1,c);
					valid= valid && GameState.setGrid(x+1,y-1,c);
				}else{
					valid= valid && GameState.setGrid(x,y+1,c);
					valid= valid && GameState.setGrid(x,y,c);
					valid= valid && GameState.setGrid(x-1,y,c);
					valid= valid && GameState.setGrid(x-1,y-1,c);
				}
			}
			return valid
		},
		setGrid: function(x,y,t){
			if( x>=0 && x<10 && y>=0 && y<22){
				if(t===-1)return GameState.grid[y][x]===7;
				GameState.grid[y][x]=t;
				return true;
			}
			// console.log("beyond visible grid"+y);
		return false;
		},
		tetriminoDrawingTest: function(){
			//Test for I shape
			GameState.drawTetrimino(1,2,0,0,1);
			GameState.drawTetrimino(3,2,0,1,1);
			GameState.drawTetrimino(6,2,0,2,1);
			GameState.drawTetrimino(8,2,0,3,1);
			//Test for L shape
			GameState.drawTetrimino(0,4,1,0,1);
			GameState.drawTetrimino(2,4,1,1,1);
			GameState.drawTetrimino(5,4,1,2,1);
			GameState.drawTetrimino(8,4,1,3,1);
			//Test for J shape	
			GameState.drawTetrimino(1,7,2,0,1);
			GameState.drawTetrimino(2,7,2,1,1);
			GameState.drawTetrimino(5,7,2,2,1);
			GameState.drawTetrimino(8,7,2,3,1);
			//Test for T shape	
			GameState.drawTetrimino(1,11,3,0,1);
			GameState.drawTetrimino(4,11,3,1,1);
			GameState.drawTetrimino(6,11,3,2,1);
			GameState.drawTetrimino(8,11,3,3,1);
			//Test for O shape	
				GameState.drawTetrimino(0,13,4,0,1);
			GameState.drawTetrimino(2,13,4,1,1);
			GameState.drawTetrimino(5,13,4,2,1);
			GameState.drawTetrimino(8,13,4,3,1);
			//Test for S shape
				GameState.drawTetrimino(1,15,5,0,1);
			GameState.drawTetrimino(3,15,5,1,1);
			GameState.drawTetrimino(6,15,5,2,1);
			GameState.drawTetrimino(9,15,5,3,1);
			//Test for Z shape
				GameState.drawTetrimino(1,18,6,0,1);
			GameState.drawTetrimino(3,18,6,1,1);
			GameState.drawTetrimino(6,18,6,2,1);
			GameState.drawTetrimino(9,18,6,3,1);
			GameState.drawGrid();
		}
	};

	function updateDoom(id,text){
		// console.log(document.getElementById("score"));
		document.getElementById("id").innerHTML="abc";
	}