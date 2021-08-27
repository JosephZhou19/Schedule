import React, {useState, useRef, useEffect} from 'react';

function Home(){
    const todoTaskName = useRef(null)
    const todoDate = useRef(null);
    const todoLength = useRef(null);
    const [color, setColor] = useState('');
    function onChangeValue(event){
        console.log(this.event.value);
    }
    useEffect(() =>{
        console.log("ran");
        renderCalendar();
        //Allows for the swapping between calendar types
        document.querySelector(".swap button").addEventListener("click", ()=>{
            document.querySelector(".calendar").style.display = "none";
            document.querySelector(".weekCalendar").style.display = "block";
            renderWeek();
        });
        document.querySelector(".swapBack button").addEventListener("click", ()=> {
            document.querySelector(".weekCalendar").style.display = "none";
            document.querySelector(".calendar").style.display = "block";
            date = new Date(wDate.getFullYear(), wDate.getMonth(), 1);
            renderCalendar();
        });
        //sets up all the buttons between each week/month of the calendars
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
        renderWeek();
        const input = document.querySelector(".taskNameAdd");
    })


    function clickModal(e){
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
    function unClickModal(e){
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    function showGraph(e){
        document.querySelector(".list").style.display = "none";
        document.querySelector(".graphic").style.display = "block";

        showGraphic();
    }
    function closeGraphic(e){
        document.querySelector(".list").style.display = "block";
        document.querySelector(".graphic").style.display = "none";
    }
    let date = new Date();
    let wDate = new Date();
    const [tasks, setTasks] = useState([])
    function renderCalendar(e){
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
        document.querySelector(".date h1").innerHTML += " " + date.getFullYear();
        document.querySelector(".date p").innerHTML = new Date().toDateString();
        let days = "";
        for(let x = firstDayIndex; x > 0; x--){
            days += `<div class = "prev-date">${prevLastDay - x}</div>`;

        }
        for (let i = 1; i <= lastDay; i++) {
            if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
                days += `<div class="today">${i}</div>`;
            } else{
                days += `<div class="day">${i}</div>`;
                monthDays.innerHTML = days;
            }
        }
        for(let j = 1; j <= nextDays; j++){
            days += `<div class = "next-date">${j}</div>`;
            monthDays.innerHTML = days;
        }
        let x = document.getElementsByClassName("day");
        for(let i = 0; i < x.length; i++){
            x[i].addEventListener("click", ()=>{
                document.querySelector(".calendar").style.display = "none";
                document.querySelector(".weekCalendar").style.display = "block";
                wDate = new Date(date.getFullYear(), date.getMonth(), x[i].innerHTML);
                renderWeek();
            });
        }
        document.querySelector(".today").addEventListener("click", ()=>{
            document.querySelector(".calendar").style.display = "none";
            document.querySelector(".weekCalendar").style.display = "block";
            wDate = new Date(date.getFullYear(), date.getMonth(), document.querySelector(".today").innerHTML);
            renderWeek();
        });
        let y = document.getElementsByClassName("prev-date");
        for(let i = 0; i < y.length; i++){
            y[i].addEventListener("click", ()=>{
                document.querySelector(".calendar").style.display = "none";
                document.querySelector(".weekCalendar").style.display = "block";
                wDate = new Date(date.getFullYear(), date.getMonth() - 1, y[i].innerHTML);
                renderWeek();
            });
        }
        let z = document.getElementsByClassName("next-date");
        for(let i = 0; i < z.length; i++){
            z[i].addEventListener("click", ()=>{
                document.querySelector(".calendar").style.display = "none";
                document.querySelector(".weekCalendar").style.display = "block";
                wDate = new Date(date.getFullYear(), date.getMonth() + 1, z[i].innerHTML);
                renderWeek();
            });
        }

    };

    //Renders the weekly calendar
    function renderWeek(){
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
        document.querySelector(".today h1").innerHTML += " " + date.getFullYear();
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
    function addList(e){
        let modal = document.getElementById("myModal");
        const input = document.querySelector(".taskNameAdd")
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
        if(todoTaskName.current.value !=='' ){
            let save = todoTaskName.current.value
            console.log(todoTaskName)
            newLi.textContent = todoTaskName.current.value;

            newLi.style.background = color;
            console.log(color);
            const dateTime = new Date(todoDate.current.value);
            console.log(dateTime.toLocaleTimeString())
            time.innerHTML =dateTime.toLocaleTimeString();//.substring(dateTime.getTime().getIndex('t') + 1);
            time.innerHTML += "-";
            const duration = todoLength.current.value;
            console.log(duration)
            let newDate = new Date(dateTime.getTime() + parseInt(duration)*3600000);
            time.innerHTML += newDate.toLocaleTimeString()//.substring(newDate.getTime().getIndex('t') + 1);
            console.log(time.innerHTML);
            notCompleted.appendChild(newLi);
            newLi.appendChild(time);
            description.innerHTML = document.querySelector(".description > input").value;
            newLi.appendChild(description);
            newLi.appendChild(delBtn);
            newLi.appendChild(checkBtn);
            setTasks(prevTasks=>{
                return [...prevTasks, {name: save, length: parseInt(duration), color: color, end: newDate.getTime()}]
            })
            console.log(tasks);
            modal.style.display = "none";
        }
        //color.current.value = "";
        todoDate.current.value = null;
        todoLength.current.value = null;
        todoTaskName.current.value = null;
        setColor('')
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
    // Graphic
    function showGraphic(e){
        for(let i = 0; i < tasks.length; i++){
            console.log(tasks[i]);
            let value = document.createElement("li");
            value.innerHTML = tasks[i].name;
            console.log(tasks[i].name);
            value.style.height = tasks[i].length*100/24 + "%";
            console.log(tasks[i].length*100/24 + "%");
            value.style.background = tasks[i].color;
            document.querySelector(".graphic").appendChild(value);
        }
    }
    //check time
    function isFinished(e){
        if(e < Date.now())
            return true;
        return false;
    }
        return (
                    <div className="container">
                        <div className="leftHalf">
                            <div className="calendar">
                                <div className="swap">
                                    <button id="swapCal">Week</button>
                                </div>
                                <div className="month">
                                    <i className="fas fa-angle-left prev"></i>
                                    <div className="date">
                                        <h1></h1>
                                        <p></p>
                                    </div>
                                    <i className="fas fa-angle-right next"></i>
                                </div>
                                <div className="weekdays">
                                    <div>Sun</div>
                                    <div>Mon</div>
                                    <div>Tue</div>
                                    <div>Wed</div>
                                    <div>Thu</div>
                                    <div>Fri</div>
                                    <div>Sat</div>
                                </div>
                                <div className="days"></div>
                            </div>
                            <div className="weekCalendar">
                                <div className="swapBack">
                                    <button id="swapCal">Week</button>
                                </div>
                                <div className="week">
                                    <i className="fas fa-angle-left prev"></i>
                                    <div className="today">
                                        <h1></h1>
                                        <p></p>
                                        <p className="weekLength"></p>
                                    </div>
                                    <i className="fas fa-angle-right next"></i>
                                </div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <th></th>
                                        <th>Sunday</th>
                                        <th>Monday</th>
                                        <th>Tuesday</th>
                                        <th>Wednesday</th>
                                        <th>Thursday</th>
                                        <th>Friday</th>
                                        <th>Saturday</th>
                                    </tr>
                                    <tr className="weekDate">

                                    </tr>
                                    <tr>
                                        <td>12:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>1:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>2:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>3:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>4:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>5:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>6:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>7:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>8:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>9:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>10:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>11:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td>12:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>1:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>2:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>3:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>4:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>5:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>6:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>7:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>8:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>9:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>10:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>11:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td>12:00 AM</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="rightHalf">

                            <div className="list">
                                <div className="addTask">
                                    <button onClick={clickModal}id="modalBtn">Add</button>
                                    <button onClick={showGraph} id="graphic">Visual</button>
                                    <div id="myModal" className="modal">
                                        <div className="modal-content">
                                            <span onClick={unClickModal} className="close">&times;</span>
                                            <p>Add your new task here</p>
                                            <div className="taskName">
                                                <input type="text" ref={todoTaskName} className="taskNameAdd" placeholder="Name of task"/>
                                            </div>
                                            <div className="basics">
                                                <div className="event">
                                                    <input type="radio" className="taskType" value="Event"/><label
                                                    htmlFor="Event">Event</label>
                                                    <input type="radio" className="taskType" value="Work"/><label
                                                    htmlFor="Event">Work</label>
                                                </div>
                                                <label htmlFor="dateTime">Date</label><input ref={todoDate} type="datetime-local" className="dateTime"/>
                                                <label htmlFor="length">Length</label><input type="number" ref={todoLength} className="length"/>
                                            </div>
                                            <div className="repeats">
                                                <label htmlFor="repeat">Repeats</label>
                                                <select className="repeats">
                                                    <option value="never">Never</option>
                                                    <option value="week">Once a week</option>
                                                    <option value="month">Once a month</option>
                                                    <option value="year">Once a year</option>
                                                    <option value="custom">Custom</option>
                                                </select>
                                                <p>Repeat on which days</p>
                                                <input type="checkbox" value="Sunday"/><label
                                                htmlFor="Sunday">Sunday</label>
                                                <input type="checkbox" value="Monday"/><label
                                                htmlFor="Monday">Monday</label>
                                                <input type="checkbox" value="Tuesday"/><label
                                                htmlFor="Tuesday">Tuesday</label>
                                                <input type="checkbox" value="Wednesday"/><label
                                                htmlFor="Wednesday">Wednesday</label>
                                                <input type="checkbox" value="Thursday"/><label
                                                htmlFor="Thursday">Thursday</label>
                                                <input type="checkbox" value="Friday"/><label
                                                htmlFor="Friday">Friday</label>
                                                <input type="checkbox" value="Saturday"/><label
                                                htmlFor="Saturday">Saturday</label>
                                                <label htmlFor="date">Repeat until what date</label><input type="date"
                                                                                                           className="repeatDate"/>
                                                <label htmlFor="times">Repeat how many times</label><input type="number"
                                                                                                           className="times"/>
                                            </div>
                                            <div className="description">
                                                <input type="text" placeholder="Add description"/>
                                            </div>
                                            <div onChange={event => setColor(event.target.value)} className="color">
                                                <input type="radio" checked = {color === 'Red'} name="color" value="Red"/><label
                                                htmlFor="Red">Red</label>
                                                <input type="radio" checked = {color === 'Blue'}name="color" value="Blue"/><label
                                                htmlFor="Blue">Blue</label>
                                                <input type="radio" checked = {color === 'Green'}name="color" value="Green"/><label
                                                htmlFor="Green">Green</label>
                                                <input type="radio" checked = {color === 'Yellow'}name="color" value="Yellow"/><label
                                                htmlFor="Yellow">Yellow</label>
                                                <input type="radio"checked = {color === 'Purple'}name="color" value="Purple"/><label
                                                htmlFor="Purple">Purple</label>
                                                <input type="radio" checked = {color === 'Orange'}name="color" value="Orange"/><label
                                                htmlFor="Orange">Orange</label>
                                                <input type="radio" checked = {color === 'Pink'}name="color" value="Pink"/><label
                                                htmlFor="Pink">Pink</label>
                                                <input type="radio" checked = {color ==='Turquoise'}name="color" value="Turquoise"/><label
                                                htmlFor="Turqoise">Turquoise</label>
                                            </div>
                                            <button onClick={addList} id="addBtn">Add</button>
                                        </div>

                                    </div>
                                </div>
                                <ol className="notCompleted">
                                    <h3>Not Completed</h3>
                                </ol>
                                <ol className="Completed">
                                    <h3>Completed</h3>
                                </ol>
                            </div>
                            <div className="graphic">
                                <button onClick={closeGraphic}id="retGraphic">Visual</button>
                            </div>
                        </div>
                    </div>
        );
}
export default Home;