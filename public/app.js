getMemeArrayData();
let memeMode = false; 
const memeUrls = []
const postItColors = ['#FFFFA5', '#ff7eb9', '#ff65a3','#7afcff', '#feff9c', "#fff740"];

document.querySelector('#postItEntry').addEventListener('keydown',function(event){
	if(event.key === "Enter"){
  	if(memeMode){
    	appendMemePostIt(this.value);
    }
    else {
    	appendPostIt(this.value);
    }
		
    addEventListenerToPositIts();
	}	
} );

function appendPostIt(content) {
  const divToAppend = document.createElement('div');
  divToAppend.classList.add('postIt');
  divToAppend.style.backgroundColor = getRandomColor();
    divToAppend.classList.add('fadeIn');
  

  
  divToAppend.innerText = content;
  document.getElementsByTagName('body')[0].appendChild(divToAppend);
}

function addEventListenerToPositIts(){
const postIts = document.querySelectorAll('.postIt');
const postItsMemes = document.querySelectorAll('.postItMeme');
[...postIts].forEach(postIt => postIt.addEventListener('click', removalOnClick));
[...postIts].forEach(postIt => postIt.addEventListener('mouseover', addInfoText));
[...postIts].forEach(postIt => postIt.addEventListener('mouseout', removeInfoText));
[...postItsMemes].forEach(postIt => postIt.addEventListener('click', removalOnClick));
[...postItsMemes].forEach(postIt => postIt.addEventListener('mouseover', addInfoText));
[...postItsMemes].forEach(postIt => postIt.addEventListener('mouseout', removeInfoText));
}

function removalOnClick(){
this.removeEventListener('mouseover', addInfoText);
			this.innerHTML = "<h1>BAI!</h1>";
 
      this.classList.add('fadeOut');
      //perserving context of this lazily..
      var that = this; 
      setTimeout(function(){that.parentNode.removeChild(that)},1000);

}

function addInfoText(){
this.innerHTML += "<br> Click on me to remove me :(";
}
function removeInfoText(){
this.innerHTML = this.innerHTML.toString().replace( "<br> Click on me to remove me :(", "");
}

function getRandomColor(){
return postItColors[Math.floor(Math.random() * postItColors.length)];
}

function appendMemePostIt(content) {
  const divToAppend = document.createElement('div');
  divToAppend.classList.add('postItMeme');
  divToAppend.style.backgroundImage = getRandomMemeImage();
    divToAppend.classList.add('fadeIn');
  

  
  divToAppend.innerText = content;
  document.getElementsByTagName('body')[0].appendChild(divToAppend);
}

function getRandomMemeImage(){
return "url("+ memeUrls[Math.floor(Math.random() * memeUrls.length)]+")";

};

const circle = document.querySelector('.circle');
document.querySelector('#toggle').addEventListener('click', toggle)

function toggle() {
	toggleMemeTextOpacity();
	toggleMemeMode();
  if (!circle.classList.contains("toggled")) {
    this.style.backgroundColor = 'green';
        circle.style.border = '2px solid green';

    circle.classList.remove('toggleLeft');
    circle.classList.add('toggleRight');
    circle.classList.add('toggled');



  } else {
    this.style.backgroundColor = 'grey';
     circle.style.border = '2px solid grey'
    circle.classList.remove('toggled');
    circle.classList.remove('toggleRight');
    circle.classList.add('toggleLeft');


  }
}

function toggleMemeMode(){
memeMode = !memeMode; 
console.log(memeMode);
}

function toggleMemeTextOpacity(){
const memeText = document.querySelector('.rainbow');
if(memeText.style.opacity < 1){
	 memeText.style.opacity = 1;
	}
  else {
  memeText.style.opacity = 0;
  }
}

function getMemeArrayData(){
fetch('https://api.imgflip.com/get_memes').then(response => response.json())
  .then(json => json.data.memes.map( data => data.url)).then( data =>  memeUrls.push( ...data));
}


