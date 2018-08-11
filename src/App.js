import React, { Component } from 'react';
import './App.css';
import FootballSimulation from "./football-simulation"
import Simulations from "./repository/simulations"

class App extends Component {

	render() {
		let simulation = Simulations.staticData();
		return (
			<div id="App">
				<FootballSimulation simulation={simulation}/>
			</div>
		);
	}
}

export default App;
