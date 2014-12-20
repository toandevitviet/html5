var context = document.getElementById('ballsCanvas').getContext('2d'),
    startButton = document.getElementById('startButton'),
    glasspane = document.getElementById('spane'),
    paused = true,
    circles = [],
    snapshotButton = document.getElementById('snapshotButton'),
	snapshotImageElement = document.getElementById('snapshotImageElement'),
	loop;


drawGrid(context, 'lightgray', 10, 10);

context.lineWidth = 0.5;
context.font = '32pt Arial';

for (var i=0; i < 50; ++i) {
   circles[i] = { 
       x: 50, 
       y: 50, 
       velocityX: 3*Math.random(), 
       velocityY: 3*Math.random(), 
       radius: 25*Math.random(),
       color: 'rgba(' + (Math.random()*255).toFixed(0) + ', ' +
                        (Math.random()*255).toFixed(0) + ', ' +
                        (Math.random()*255).toFixed(0) + ', 1.0)' };
}

startButton.onclick = function(e) {
   e.preventDefault();
   e.stopPropagation();
   paused = ! paused;
   startButton.innerText = paused ? 'Start' : 'Stop';
};

glasspane.onmousedown = function(e) {
   e.preventDefault();
   e.stopPropagation();
}

context.canvas.onmousedown = function(e) {
    e.preventDefault();
    e.stopPropagation();
};

setInterval(function() {
   if (!paused) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      drawGrid(context, 'lightgray', 10, 10);
   
      circles.forEach(function(circle) {
         context.beginPath();
         context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2, false);
         context.fillStyle = circle.color;
         context.fill(); 
         adjustPosition(circle);
      });
   }
}, 1000 / 60);

function adjustPosition(circle) {
   if (circle.x + circle.velocityX + circle.radius > context.canvas.width ||
       circle.x + circle.velocityX - circle.radius < 0) 
      circle.velocityX = -circle.velocityX;

   if (circle.y + circle.velocityY + circle.radius > context.canvas.height ||
       circle.y + circle.velocityY - circle.radius  < 0) 
      circle.velocityY= -circle.velocityY;

   circle.x += circle.velocityX;
   circle.y += circle.velocityY;
}

function drawGrid(context, color, stepx, stepy) {
   context.strokeStyle = color;
   context.lineWidth = 0.5;

   for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, context.canvas.height);
      context.stroke();
   }

   for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
   }
}

// Event handlers.....................................................
snapshotButton.onclick =function(e){
	var dataUrl;
	if(snapshotButton.value ==='Take snapshot'){
		dataUrl = ballsCanvas.toDataURL();
		clearInterval(loop);
		snapshotImageElement.src = dataUrl;
		snapshotImageElement.style.display ='inline';
		ballsCanvas.style.display ='none';
		snapshotButton.value ='Return to Canvas';
	}
	else{
		ballsCanvas.style.display ='inline';
		snapshotImageElement.style.display ='none';
		//loop =setInterval(drawClock,1000);
		snapshotButton.value ='Take snapshot';
	}
};