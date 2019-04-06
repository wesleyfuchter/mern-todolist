import React, {useEffect, useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './Tasks.css';
import Card from "@material-ui/core/Card";
import {Checkbox, Divider} from "@material-ui/core";
import Icon from '@material-ui/core/Icon';

function Tasks() {

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [editingTask, setEditingTask] = useState({});
	const [editingText, setEditingText] = useState(null);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCancel = () => {
		setTitle(null);
		setOpen(false);
	};

	const handleSubmit = async () => {
		const data = await submit();
		setTasks([...tasks, data]);
		setOpen(false);
	};

	const handleFindAll = async () => {
		const data = await findAll();
		setTasks([...tasks, ...data]);
	};

	const handleMarkAsDone = async (id) => {
		handleMarkAs(id, true);
	};

	const handleMarkAsTodo = async (id) => {
		handleMarkAs(id, false);
	};

	const handleUpdateText = async (task, text) => {
		const newTask = {...task, title: text};
		await updateTask(newTask);
		setTasks([...(tasks.filter(currentTask => currentTask._id !== task._id)), newTask]);
		setEditingTask({});
		setEditingText(null);
	};

	const handleMarkAs = async (id, value) => {
		const currentTask = tasks.find(task => task._id === id);
		const data = await markAs(currentTask, value);
		setTasks([...(tasks.filter(task => task._id !== id)), data]);
	};

	const handleDelete = async (taskToDelete) => {
		setTasks([...(tasks.filter(task => task._id !== taskToDelete._id))]);
		await deleteTask(taskToDelete);
	};

	const findAll = async () => {
		const headers = new Headers({
			"Content-Type": "application/json",
		});
		const request = {
			method: 'GET',
			headers: headers,
			mode: 'cors',
			cache: 'default',
		};
		return await fetch('http://localhost:3333/tasks', request)
			.then(response => response.json());
	};

	const submit = async () => {
		const headers = new Headers({
			"Content-Type": "application/json",
		});
		const request = {
			method: 'POST',
			headers: headers,
			mode: 'cors',
			cache: 'default',
			body: JSON.stringify({
				user_id: "123",
				title: title,
				done: false
			})
		};
		return await fetch('http://localhost:3333/tasks', request)
			.then(response => response.json());
	};

	const markAs = async (task, done) => {
		const headers = new Headers({
			"Content-Type": "application/json",
		});
		const request = {
			method: 'PUT',
			headers: headers,
			mode: 'cors',
			cache: 'default',
			body: JSON.stringify({...task, done: done})
		};
		return await fetch(`http://localhost:3333/tasks/${task._id}`, request)
			.then(response => response.json());
	};

	const updateTask = async (task) => {
		const headers = new Headers({
			"Content-Type": "application/json",
		});
		const request = {
			method: 'PUT',
			headers: headers,
			mode: 'cors',
			cache: 'default',
			body: JSON.stringify(task)
		};
		return await fetch(`http://localhost:3333/tasks/${task._id}`, request)
			.then(response => response.json());
	};

	const deleteTask = async (task) => {
		const headers = new Headers({
			"Content-Type": "application/json",
		});
		const request = {
			method: 'DELETE',
			headers: headers,
			mode: 'cors',
			cache: 'default'
		};
		return await fetch(`http://localhost:3333/tasks/${task._id}`, request);
	};

	useEffect(() => {
		handleFindAll();
	}, []);

	const formModal = () => {
		return (
			<Dialog
				open={open}
				onClose={handleCancel}
				fullWidth={true}
				maxWidth={'sm'}
				onKeyUp={({key}) => key === "Enter" ? handleSubmit() : null}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Create Task</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="description"
						label="Description"
						type="text"
						fullWidth
						onChange={(event) => setTitle(event.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} variant="contained" color="secondary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} variant="contained" color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	const addButton = () => {
		return (
			<Fab className={'fab-button'} color="primary" aria-label="Add" onClick={handleClickOpen}>
				<AddIcon/>
			</Fab>
		);
	};

	const youreDone = () => {
		return (tasks.filter(task => !task.done).length === 0 && <h1 className={`youre-done`}>You're done!</h1>);
	};

	const divider = () => {
		return (tasks.filter(task => task.done).length > 0 && <Divider/>);
	};

	const taskList = (predicate) => {
		return (
			tasks.filter(predicate).length > 0 &&
			(<ul>
				{(tasks.filter(predicate).map(task => {
					return (
						<Card className={'item-list-card'} key={task._id} onClick={() => {
							setEditingText(task.title);
							setEditingTask(task);
						}}>
							<Checkbox
								checked={task.done}
								onChange={({target}) => task.done ? handleMarkAsTodo(target.value) : handleMarkAsDone(target.value)}
								value={task._id}
							/>
							{editingTask._id === task._id ?
								<TextField
									autoFocus
									margin="normal"
									id="description"
									type="text"
									value={editingText}
									onChange={(event) => setEditingText(event.target.value)}
									onKeyUp={({key}) => key === "Enter" ? handleUpdateText(task, editingText) : null}
								/>
								: task.title}
							<Button className={'delete-button'} onClick={() => handleDelete(task)}>
								<Icon>delete</Icon>
							</Button>
						</Card>
					);
				}))}
			</ul>)
		);
	};

	return (
		<div>
			{youreDone()}
			{taskList(task => !task.done)}
			{divider()}
			{taskList(task => task.done)}
			{addButton()}
			{formModal()}
		</div>
	);

}

export default Tasks;
