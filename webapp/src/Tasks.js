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

function Tasks() {

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState(null);
	const [tasks, setTasks] = useState([]);

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

	useEffect(() => {
		findAll().then(data => setTasks([...tasks, ...data]));
	}, []);

	return (
		<div>
			<ul>
				{(tasks.map(task => <li key={task._id}>{task.title}</li>))}
			</ul>
			<Fab className={'fab-button'} color="primary" aria-label="Add" onClick={handleClickOpen}>
				<AddIcon/>
			</Fab>
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
		</div>
	);
}

export default Tasks;
