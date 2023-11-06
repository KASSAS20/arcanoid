let container = document.createElement('div');
container.classList.add('container');
container.style.position = 'relative'; 
let x = 0;
let y = 0;


for (let i = 0; i < 200; i++) {
  let div = document.createElement('div');
  div.classList.add('block');
  div.classList.add('b'+i);
  div.style.position = 'absolute'; 
  div.style.left = x + 'vw'; 
  div.style.top = y + 'vw'; 
  x+=5;
  if (x > 95){
    x = 0;
    y += 5;
  }
  let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  div.style.backgroundColor = randomColor;
  container.appendChild(div);
}
document.body.appendChild(container);


let platform = document.createElement('div');
platform.style.position = 'relative';
platform.classList.add('platform');
platform.style.left = 45 + 'vw'; 
platform.style.top = 100 + 'vw'; 
document.body.appendChild(platform);



let ball = document.createElement('div');
ball.style.position = 'relative';
ball.classList.add('ball');
ball.setAttribute('tag', ('ball'));
ball.style.left = 45 + 'vw'; 
ball.style.top = 100 + 'vw'; 
document.body.appendChild(ball);


let platforms = document.querySelector('.platform');
let x_p = 45; 
let step = 2; 


function movePlatform(event) {
  switch (event.key) {
    case 'ArrowLeft':
      x_p -= step;
      break;
    case 'ArrowRight':
      x_p += step; 
      break;
  }
  if (x_p > 87.5){
    x_p = 87.5;
  }else if(x_p < 0){
    x_p = 0;
  }
  platforms.style.left = x_p + 'vw';

}
document.addEventListener('keydown', movePlatform);


let balls = document.querySelector('.ball');
x_b = 49;
y_b = 96;
vector_x = true;
vector_y = false;
let step_b = 1
balls.style.left = x_b + 'vw';
balls.style.top = y_b + 'vw';


function moveBall() {
    let direction;
  if (vector_x && vector_y){
    direction = 0;
  } else if (vector_x && !vector_y){
    direction = 1;
  } else if (!vector_x && vector_y){
    direction = 2;
  } else if (!vector_x && !vector_y){
    direction = 3;
  }


  switch (direction) {
    case 0:
      x_b += step_b; 
      y_b -= step_b; 
      break;
    case 1:
      x_b += step_b; 
      y_b += step_b; 
      break;
    case 2:
      x_b -= step_b; 
      y_b -= step_b; 
      break;
    case 3:
      x_b -= step_b; 
      y_b += step_b; 
      break;}
  

    if (x_b < 0){
    vector_x = !vector_x;
    x_b += 2;
  } else if (x_b > 95){
    x_b -= 2;
    vector_x = !vector_x;
  }
  if (y_b < 0){
    vector_y = !vector_y;
    y_b += 2;
  } else if (y_b > 100){
    location.reload();
  }


for (let i = 0; i < 200; i++) {
  try {
    let div1 = document.querySelector('.b' + i);
    let div2 = document.querySelector('.ball');
    let div3 = document.querySelector('.platform');
    let rect1 = div1.getBoundingClientRect();
    let rect2 = div2.getBoundingClientRect();
    let rect3 = div3.getBoundingClientRect();


    if (
      rect1.right >= rect2.left &&
      rect1.left <= rect2.right &&
      rect1.bottom >= rect2.top &&
      rect1.top <= rect2.bottom
    ) {
      div1.parentNode.removeChild(div1);
      vector_y = !vector_y;
      x_b += 2; 
      y_b += 2; 
      break; 
    }
    if (
      rect2.right >= rect3.left &&
      rect2.left <= rect3.right &&
      rect2.bottom >= rect3.top &&
      rect2.top <= rect3.bottom
    ){
      vector_y = !vector_y;
      y_b -= 2;
      break;
    }
  } catch (error) {
    console.log(error);
    continue;
  }
  
}
ball.style.left = x_b + 'vw';
ball.style.top = y_b + 'vw';}


setInterval(moveBall, 50);


