var t;
var x;
var y;
var o;
var grid;
var blockColors;
var ctx;
var timer;
function initialize(){
	t=0;
	x=4;
	y=18;
	o=0;
	blockColors=[180,280,40,240,60,120,80,0];
	grid=new Array(22);
	for(i=0;i< 22;i++){
		grid[i]=new Array(10);
		for(j=0;j< 10;j++){
			grid[i][j]=7;
		}
	}
	c=document.getElementById("myCanvas");
	ctx=c.getContext("2d");
	clearInterval(timer);
	timer=setInterval(function(){gameStep()},1000);
}

function drawBlock(x,y,t){
	var pixelX=x*20;
	var pixelY=(19-y)*20;
	var c=blockColors[t];
	console.log(c);
	ctx.fillStyle="hsl("+c+",100%,50%)";
	ctx.fillRect(pixelX+2,pixelY+2,16,16);

	/*Draw upper edge shading*/
	ctx.fillStyle="hsl("+c+",100%,70%)";
	ctx.beginPath();
	ctx.moveTo(pixelX,pixelY);
	ctx.lineTo(pixelX+20,pixelY);
	ctx.lineTo(pixelX+18,pixelY+2);
	ctx.lineTo(pixelX+2,pixelY+2);
	ctx.fill();
	/* Draw right edge shading*/
	ctx.fillStyle="hsl("+c+",100%,20%)";
	ctx.beginPath();
	ctx.moveTo(pixelX+20,pixelY);
	ctx.lineTo(pixelX+20,pixelY+20);
	ctx.lineTo(pixelX+18,pixelY+18);
	ctx.lineTo(pixelX+18,pixelY+2);
	ctx.fill();

	/*Draw bottom edge shading*/
	ctx.fillStyle="hsl("+c+",100%,40%)";
	ctx.beginPath();
	ctx.moveTo(pixelX+20,pixelY+20);
	ctx.lineTo(pixelX,pixelY+20);
	ctx.lineTo(pixelX+2,pixelY+18);
	ctx.lineTo(pixelX+18,pixelY+18);
	ctx.fill();

	/*Draw left edge shading*/
	ctx.fillStyle="hsl("+c+",100%,60%)";
	ctx.beginPath();
	ctx.moveTo(pixelX,pixelY+20);
	ctx.lineTo(pixelX,pixelY);
	ctx.lineTo(pixelX+2,pixelY+2);
	ctx.lineTo(pixelX+2,pixelY+18);
	ctx.fill();

}

function drawTetrimino(x,y,t,o,d){
	var c;
	if(d===0){
		console.log("Setting clearbit!");
		c=7;
	}
	else if(d===-1){
		c=-1;
	}else c=t;
	var valid=true;
	if(t===0){//for I shape
	 	// c=180;
		if(o===0){
			valid=valid && setGrid(x-1,y,c);
			valid=valid && setGrid(x,y,c);
			valid=valid && setGrid(x+1,y,c);
			valid=valid && setGrid(x+2,y,c);
		}else if(o===1){
			valid=valid && setGrid(x+1,y+1,c);
			valid=valid && setGrid(x+1,y,c);
			valid=valid && setGrid(x+1,y-1,c);
			valid=valid && setGrid(x+1,y-2,c);
		}else if(o==2){
			valid=valid && setGrid(x-1,y-1,c);
			valid=valid && setGrid(x,y-1,c);
			valid=valid && setGrid(x+1,y-1,c);
			valid=valid && setGrid(x+2,y-1,c);
		}else{
			valid=valid && setGrid(x+1,y-2,c);
			valid=valid && setGrid(x+1,y-1,c);
			valid=valid && setGrid(x+1,y,c);
			valid=valid && setGrid(x+1,y+1,c);
		}
	}else if(t===1){//for L shape
	 	// c=280;
		if(o===0){
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y+2,c);
		}else if(o===1){
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x+1,y+1,c);
			valid= valid && setGrid(x+2,y+1,c);
		}else if(o==2){
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x+1,y+1,c);
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x+1,y-1,c);
		}else{
			valid= valid && setGrid(x+1,y+1,c);
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x-1,y,c);
		}
	}else if(t===2){//for J shape
	 	// c=40;
		if(o===0){
			valid= valid && setGrid(x-1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y+2,c);
		}else if(o===1){
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x+2,y,c);
		}else if(o===2){
			valid= valid && setGrid(x+1,y+1,c);
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y-1,c);
		}else{
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x+1,y+1,c);
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x-1,y+1,c);
		}
	}else if(t===3){//for T shape
	 	// c=240;
		if(o===0){
			valid= valid && setGrid(x-1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x,y-1,c);
		}else if(o===1){
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y-1,c);
			valid= valid && setGrid(x-1,y,c);
		}else if(o==2){
			valid= valid && setGrid(x-1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x,y+1,c);
		}else{
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y-1,c);
			valid= valid && setGrid(x+1,y,c);
		}
	}else if(t===4){//O shape
		// c=60;
		valid= valid && setGrid(x,y,c);
		valid= valid && setGrid(x+1,y,c);
		valid= valid && setGrid(x,y-1,c);
		valid= valid && setGrid(x+1,y-1,c);
	}else if(t===5){//for S shape
	 	// c=120;
		if(o===0){
			valid= valid && setGrid(x-1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x+1,y+1,c);
		}else if(o===1){
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x+1,y-1,c);
		}else if(o==2){
			valid= valid && setGrid(x-1,y-1,c);
			valid= valid && setGrid(x,y-1,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x+1,y,c);
		}else{
			valid= valid && setGrid(x-1,y+1,c);
			valid= valid && setGrid(x-1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y-1,c);
		}
	}else if(t===6){//for Z shape
	 	// c=80;
		if(o===0){
			valid= valid && setGrid(x-1,y+1,c);
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x+1,y,c);
		}else if(o===1){
			valid= valid && setGrid(x+1,y+1,c);
			valid= valid && setGrid(x+1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y-1,c);
		}else if(o==2){
			valid= valid && setGrid(x-1,y,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x,y-1,c);
			valid= valid && setGrid(x+1,y-1,c);
		}else{
			valid= valid && setGrid(x,y+1,c);
			valid= valid && setGrid(x,y,c);
			valid= valid && setGrid(x-1,y,c);
			valid= valid && setGrid(x-1,y-1,c);
		}
	}
	return valid
}

function keyDown(event){
	var x2,y2,o2;
	ctx.clearRect(0,0,200,400);
	console.log(event.keyCode);
	switch(event.keyCode){
	case 37:{//left arrow
		drawTetrimino(x,y,t,o,0);
		x2=x-1;
		if(drawTetrimino(x2,y,t,o,-1)){
			x=x2;
		}
		break;
	}
	case 38:{//up arrow
		drawTetrimino(x,y,t,o,0);
		o2=(o+1)%4;
		if(drawTetrimino(x,y,t,o2,-1)){
			o=o2;
		}
		break;
	}
	case 39:{//right arrow
		drawTetrimino(x,y,t,o,0);
		x2=x+1;
		if(drawTetrimino(x2,y,t,o,-1)){
			x=x2;
		}
		break;
	}
	case 40:{// down arrow
		drawTetrimino(x,y,t,o,0);
		console.log("Pressing 40 moving down");
		y2=y-1;
		if(drawTetrimino(x,y2,t,o,-1)){
			y=y2;
		}
		break;
	}
	case 32:{
		drawTetrimino(x,y,t,o,0);
		while(drawTetrimino(x,y-1,t,o,-1)){
			y-=1;
		}
		break;
	}
	default: 
	//{
	// 	drawTetrimino(x,y,t,o,0);
	// 	t=Math.floor((Math.random())* 7);
	// 	x=4;
	// 	y=18;
	// 	o=0;
	// } }
	}
	drawTetrimino(x,y,t,o,1);
	drawGrid();
}
function drawGrid(){
	ctx.clearRect(0,0,200,400);
	console.log("Rectangle has been cleard");
	for(i=0;i< 20;i++){
		for(j=0;j< 10;j++){
			drawBlock(j,i,grid[i][j]);
		}
	}
}

function setGrid(x,y,t){
	if( x>=0 && x<10 && y>=0 && y<22){
		if(t===-1)return grid[y][x]===7;
		grid[y][x]=t;
		return true;
	}
	console.log("beyond visible grid"+y);
return false;
}

function gameStep(){
	var x2,y2,o2,t2;
	drawTetrimino(x,y,t,o,0);
	y2=y-1;
	if(drawTetrimino(x,y2,t,o,-1)){
		y=y2;
	}else{
		drawTetrimino(x,y,t,o,1)
		checkLines();
		t2=Math.floor((Math.random()*6));
		console.log("The new type random number is:" + t2);
		x2=4;
		y2=19;
		o2=0;
		if(drawTetrimino(x2,y2,t2,o2,-1)){
			x=x2;
			y=y2;
			t=t2;
			o=o2;
		}else{
			alert("Game Over");
			initialize();
			return;
		}
	}
	drawTetrimino(x,y,t,o,1);
	console.log("Drawing grid");
	drawGrid();
}

function checkLines(){
	for(i=0;i<20;i++){
		var full=true;
		for(j=0;j<10;j++){
			full= full && grid[i][j]!==7;
		}
		if(full){
			for(ii=i;ii<19;ii++){
				for(jj=0;jj<10;jj++){
					grid[ii][jj]=grid[ii+1][jj];
				}
			}
			for(jj=0;jj<10;jj++){
				grid[19][jj]=7;
			}
			i--;
		}
	}
}

function tetriminoDrawingTest(){
	//Test for I shape
	drawTetrimino(1,2,0,0,1);
	drawTetrimino(3,2,0,1,1);
	drawTetrimino(6,2,0,2,1);
	drawTetrimino(8,2,0,3,1);
	//Test for L shape
	drawTetrimino(0,4,1,0,1);
	drawTetrimino(2,4,1,1,1);
	drawTetrimino(5,4,1,2,1);
	drawTetrimino(8,4,1,3,1);
	//Test for J shape	
	drawTetrimino(1,7,2,0,1);
	drawTetrimino(2,7,2,1,1);
	drawTetrimino(5,7,2,2,1);
	drawTetrimino(8,7,2,3,1);
	//Test for T shape	
	drawTetrimino(1,11,3,0,1);
	drawTetrimino(4,11,3,1,1);
	drawTetrimino(6,11,3,2,1);
	drawTetrimino(8,11,3,3,1);
	//Test for O shape	
		drawTetrimino(0,13,4,0,1);
	drawTetrimino(2,13,4,1,1);
	drawTetrimino(5,13,4,2,1);
	drawTetrimino(8,13,4,3,1);
	//Test for S shape
		drawTetrimino(1,15,5,0,1);
	drawTetrimino(3,15,5,1,1);
	drawTetrimino(6,15,5,2,1);
	drawTetrimino(9,15,5,3,1);
	//Test for Z shape
		drawTetrimino(1,18,6,0,1);
	drawTetrimino(3,18,6,1,1);
	drawTetrimino(6,18,6,2,1);
	drawTetrimino(9,18,6,3,1);
	drawGrid();
}