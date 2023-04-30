
import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {
	const [newTask, setNewTask] = useState("");
	const [list, setList] = useState([]);

	useEffect(()=>{
		getTodos();
	},[])
	
	const getTodos= async ()=>{
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ramhari");
		const data = await response.json();
		setList(data); 
		console.log(data)
	}

	const updateTodoList= async ()=>{
		const templist =[...list, {label:newTask, done:false }];
		setList(templist);
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ramhari",{
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body:JSON.stringify(templist)
		});
		if(response.ok){
			setNewTask("");
		}
	}

	const deleteTodo = async (todoToDelete)=>{
		const templist =list.filter((item, y) => item != todoToDelete)
		setList(templist);
		const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/ramhari",{
		  method: "PUT",
		  headers: {"Content-Type": "application/json"},
		  body:JSON.stringify(templist)  
		});
	  }

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 list-group-item">
					<input className="form-control" value={newTask} placeholder="Add new task" onChange={(e) => { setNewTask(e.target.value) }} onKeyUp={(e) => {
						if (e.key == "Enter"&& newTask!="") {
							console.log("from here"+newTask);
							updateTodoList();
						}
					}} />
					<div className="row d-flex">
						<ul className="list-group d-flex justify-content-between">
							{
								list.map((todo, index) => {
									return <li className="list-group-item d-flex" key={index}>{todo.label}
										<button type="button" className="ms-auto btn btn-danger" onClick={() => {
											deleteTodo(todo)
										}}>DELETE</button>
									</li>
								})
							}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;