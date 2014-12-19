var canvas  = document.getElementById('myCanvas'),
	context = canvas.getContext('2d');

context.font = '38pt Arial'; 
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue'; // color of text

context.fillText('hello myCanvas', canvas.width/2 - 150, canvas.height/2 + 15); // content of in text

context.strokeText('hello myCanvas', canvas.width/2 - 150, canvas.height/2 + 15); // border of out text