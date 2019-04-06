import React, {useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Users from "./Users";
import Tasks from "./Tasks";

function App() {

	const [showSideBar, setShowSideBar] = useState(true);

	return (
		<>
			<BrowserRouter>
				<div className={'nav-div'}>
					<Button className={'nav-menu-item'} onClick={() => setShowSideBar(!showSideBar)}>
						<Icon className={'nav-menu-item-icon'}>menu</Icon>
					</Button>
					<Button className={'nav-menu-item-right'}>
						<Icon className={'nav-menu-item-icon'}>power_settings_new</Icon>
					</Button>
				</div>
				<div className={'sidebar-main-div'}>
					{(showSideBar &&
						<div className={'sidebar-left-div'}>
							<List component="nav">
								<ListItem {...{to: "/users"}} component={Link} button={true}>
									<ListItemIcon>
										<Icon>people</Icon>
									</ListItemIcon>
									<ListItemText primary="Users"/>
								</ListItem>
								<ListItem {...{to: "/tasks"}} component={Link} button={true}>
									<ListItemIcon>
										<Icon>list</Icon>
									</ListItemIcon>
									<ListItemText primary="Tasks"/>
								</ListItem>
							</List>
						</div>
					)}
					<div className={'sidebar-body-div'}>
						<div className="sidebar-body-div-outlet">
							<Switch>
								<Route path="/users" exact={true} component={Users}/>
								<Route path="/tasks" component={Tasks}/>
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		</>
	);

}

export default App;
