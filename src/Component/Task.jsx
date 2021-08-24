import { useState } from "react";
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/isToday";





const FORMAT ="dd/MM/yyyy";
function formatDate(date, format, locale) {
return dateFnsFormat(date, format, { locale });
};
const AddTask = ({onCancel, onAddTask}) => {
    const [task, setTask] = useState("");
    const [date, setDate] = useState(null);
    return(
        <div className="add-task-dialogue">
            <input value={task} onChange={(e)=> setTask(e.target.value)}/>
            <div className="add-task-action-container">
                <div className="btn-container">
                    <button 
                    disabled={!task}
                    className="add-btn" 
                    onClick={()=> {
                        onAddTask(task, date);
                        onCancel(); 
                        setTask("");}}>Add task</button>
                    <button className="cancel-btn" 
                    onClick={()=> {
                        onCancel(); 
                        setTask("");}}>Cancel</button>
                </div>
                <div className="icon-container">
                    <DayPickerInput onDayChange={(day) => setDate(day)} placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                    formatDate={formatDate}
                    format={FORMAT}
                    dayPickerProps={{
                        modifiers:{
                            disabled : [{before: new Date()}],
                        },
                    }}/>
                </div>
            </div>

        </div>
    )    
}

const Task_header_mapping = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 days",
}

const TaskItems = ({selectedtab, tasks})=>{
    let tasktoRender = [...tasks];
    if(selectedtab==='NEXT_7'){
        tasktoRender = tasktoRender.filter((task)=>isAfter(task.date, new Date()) && isBefore(task.date, addDays(new Date(),7)));
        
    }

    if(selectedtab==='TODAY'){
        tasktoRender = tasktoRender.filter((task)=>isToday(task.date));
        
    }

    return (
        <div className="tasks-item-container">
            {tasktoRender.map((task)=>(
                <div className="task-item">
                    <p>{task.text}</p>
                    <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
                </div>
        ))}
        </div>
    )
}


const Task = ({selectedtab}) => {
    const [showAddTask, setshowAddTask] = useState(false);
    const [tasks, setTasks] = useState([]);

    const addNewTask = (text, date)=>{
        const newTaskItem = {text, date: date || new Date()}
        setTasks((prevState)=>[...prevState, newTaskItem]);
    };

    return (
        <div className="tasks">
            <h1>{Task_header_mapping[selectedtab]}</h1>
            {selectedtab === 'INBOX' ? <div className="add-task-btn" 
                onClick={()=>setshowAddTask((prevState) => !prevState)}>
                <span className="plus">+</span>
                <span className="add-task-text">Add</span>

            </div>: null}
            { showAddTask && (<AddTask onAddTask={addNewTask} onCancel={()=>setshowAddTask(false)}/>)}
            {tasks.length>0 ? (
                <TaskItems tasks={tasks} selectedtab={selectedtab}/>
            ):(
                <p>No Task yet.</p>
            )}
        </div>
    )
}

export default Task
