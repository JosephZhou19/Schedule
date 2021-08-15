const date = new Date();
let wDate = new Date();
const renderCalendar = () =>{
date.setDate(1);
const monthDays = document.querySelector(".days");
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const firstDayIndex = date.getDay();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
const nextDays = 7 - lastDayIndex - 1;
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
 document.querySelector(".date h1").innerHTML = months[date.getMonth()];

 document.querySelector(".date p").innerHTML = new Date().toDateString();
 let days = "";
for(let x = firstDayIndex; x > 0; x--){
	days += `<div class = "prev-date">${prevLastDay - x}</div>`;

}
for (let i = 1; i <= lastDay; i++) {
	if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
		days += `<div class="today">${i}</div>`;
	} else{
    	days += `<div>${i}</div>`;
    	monthDays.innerHTML = days;
 	}
 }
for(let j = 1; j <= nextDays; j++){
	days += `<div class = "next-date">${j}</div>`;
	monthDays.innerHTML = days;
}
};
const renderWeek = () =>{
    const weekDays = document.querySelector(".weekDate");
const lastDay = new Date(wDate.getFullYear(), wDate.getMonth() + 1, 0).getDate();
let firstDayIndex = wDate.getDay();
let lastDayIndex = new Date(wDate.getFullYear(), wDate.getMonth() + 1, 0).getDay();
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.querySelector(".today h1").innerHTML = months[wDate.getMonth()];
 document.querySelector(".today p").innerHTML = new Date().toDateString();

 let days = "<th></th>";
 for (let i = 1; i <= lastDay; i++) {
    if(i === new Date().getDate()){
        firstDayIndex = new Date(wDate.getFullYear(), wDate.getMonth(), wDate.getDate() - wDate.getDay());
        lastDayIndex = new Date(wDate.getFullYear(), wDate.getMonth(), wDate.getDate()- wDate.getDay() + 7);
        break;
    }
 }
  document.querySelector(".weekLength").innerHTML = firstDayIndex.toDateString() + " - " + lastDayIndex.toDateString();
 wDate = firstDayIndex;
 while(wDate.getDate() != lastDayIndex.getDate()){
    days += `<th>${wDate.getDate()}</th>`
    wDate = new Date(wDate.getFullYear(), wDate.getMonth(), wDate.getDate() + 1);
 }
weekDays.innerHTML = days;
wDate = firstDayIndex;
};
document.querySelector(".week .prev").addEventListener("click", ()=>{
    wDate.setDate(wDate.getDate() - 1)    
    renderWeek();
});
document.querySelector(".week .next").addEventListener("click", ()=>{
    wDate.setDate(wDate.getDate() + 7)    
    renderWeek();
});
document.querySelector(".month .prev").addEventListener("click", ()=>{
	date.setMonth(date.getMonth() - 1);
	renderCalendar();
});
document.querySelector(".month .next").addEventListener("click", ()=>{
	date.setMonth(date.getMonth() + 1);
	renderCalendar();
});

renderCalendar();
renderWeek();
document.querySelector(".swap button").addEventListener("click", ()=>{
    document.querySelector(".calendar").style.display = "none";
    document.querySelector(".weekCalendar").style.display = "block";
});
document.querySelector(".swapBack button").addEventListener("click", ()=>{
    document.querySelector(".weekCalendar").style.display = "none";
    document.querySelector(".calendar").style.display = "block";
});