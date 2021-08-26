var tasks = [];
//const input = document.querySelector('input');
const btn = document.getElementById("addBtn")
const input = document.querySelector(".taskName > input")
btn.addEventListener('click', addList);
input.addEventListener('keyup', (e)=>{
	(e.keyCode == 13 ? addList(e) : null);
});
function addList(e){
	const notCompleted = document.querySelector(".notCompleted");
	const Completed = document.querySelector(".Completed");
	const newLi = document.createElement("li");
	const checkBtn = document.createElement("button");
	const delBtn = document.createElement("button");
	const undoBtn = document.createElement("button");
	const time = document.createElement("text");
	const description = document.createElement("text");
	checkBtn.innerHTML = '<i class="fa fa-check"></i>'
	delBtn.innerHTML = '<i class="fa fa-trash"></i>'
	undoBtn.innerHTML = '<i class="fa fa-undo"></i>'
	if(input.value !=='' ){
		newLi.textContent = input.value;

		var radios = document.getElementsByName('color');

		for (var i = 0, length = radios.length; i < length; i++) {
  		if (radios[i].checked) {
    	// do whatever you want with the checked radio
    		newLi.style.background = radios[i].value;
    		radios[i].checked = false;
    	// only one radio can be logically checked, don't check the rest
    	break;
  		}
		}
		const dateTime = new Date(document.querySelector(".basics input[name='dateTime']").value);
		time.innerHTML =dateTime.toLocaleTimeString();//.substring(dateTime.getTime().getIndex('t') + 1);
		time.innerHTML += "-";
		const duration =  document.querySelector(".basics input[name='length']").value;
		var newDate = new Date(dateTime.getTime() + parseInt(duration)*3600000);
		time.innerHTML += newDate.toLocaleTimeString()//.substring(newDate.getTime().getIndex('t') + 1);
		console.log(time.innerHTML);
		notCompleted.appendChild(newLi);
		newLi.appendChild(time);
		description.innerHTML = document.querySelector(".description > input").value;
		newLi.appendChild(description);
		newLi.appendChild(delBtn);
		newLi.appendChild(checkBtn);
		tasks.push([input.value, parseInt(duration), radios[i].value, newDate.getTime()]);
		modal.style.display = "none";
		input.value ='';
		document.querySelector(".basics input[name='dateTime']").value = "";
		document.querySelector(".basics input[name='length']").value = "";
		document.querySelector(".description > input").value = "";
		for(var i = 0; i < tasks.length; i++){
			if(isFinished(tasks[i][3])){
				const parent = document.querySelector(".notCompleted li");
				parent.remove();
				Completed.appendChild(parent);
				checkBtn.remove();
				parent.appendChild(undoBtn);
				tasks.shift();
			}
		}
	}
	//Buttons to move the tasks to different places
	checkBtn.addEventListener("click", function(){
		const parent = this.parentNode;
		parent.remove();
		Completed.appendChild(parent);
		checkBtn.remove();
		parent.appendChild(undoBtn);
	});
	delBtn.addEventListener("click", function(){
		const parent = this.parentNode;
		parent.remove();
	});
	undoBtn.addEventListener("click", function(){
		const parent = this.parentNode;
		parent.remove();
		notCompleted.appendChild(parent);
		undoBtn.remove();
		parent.appendChild(checkBtn);
	})
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modalBtn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
modalBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Graphic
function showGraphic(e){
	for(var i = 0; i < tasks.length; i++){
		var value = document.createElement("li");
		value.innerHTML = tasks[i][0];
		console.log(tasks[i][0]);
		value.style.height = tasks[i][1]*100/24 + "%";
		console.log(tasks[i][1]*100/24 + "%");
		value.style.background = tasks[i][2];
		if(isFinished(tasks[i][3]))
			value.style.opacity = ".5";
		document.querySelector(".graphic").appendChild(value);
	}
}
var graphic = document.getElementById("graphic");
graphic.onclick	= function(){
	document.querySelector(".list").style.display = "none";
	document.querySelector(".graphic").style.display = "block";
	showGraphic();
}
document.getElementById("retGraphic").onclick= function(){
	document.querySelector(".list").style.display = "block";
	document.querySelector(".graphic").style.display = "none";
}
//check time
function isFinished(e){
	if(e < Date.now())
		return true;
	return false;
}
