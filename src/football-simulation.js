import React, { Component } from 'react';
import * as d3 from "d3";

class FootballSimulation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sliderValue: 0
		};
	}

	move = (step) => {
		var positions = this.props.simulation[step];

		d3.select("#field")
			.selectAll(".player")
			.data(positions)
			.transition()
			.duration(500)
			.ease(d3.easeExp)
			.attr("r", function (d) {
				return d.haveBall ? 15 : 10;
			})
			.attr("cx", function (d) {
				return d.x_axis;
			})
			.attr("cy", function (d) {
				return d.y_axis;
			})
			.style("fill", function (d) {
				return d.color;
			})
			.style("stroke", function (d) {
				return d.haveBall ? "white" : "black";
			});

		d3.select("#field")
			.selectAll(".player-number")
			.data(positions)
			.transition()
			.duration(500)
			.ease(d3.easeExp)
			.attr("x", function (d) {
				return d.x_axis - 4;
			})
			.attr("y", function (d) {
				return d.y_axis + 5;
			});
	};

	playByIntervalFn = (step) => () => {
		++step;
		this.move(step);
		document.getElementById("timeSlider").value = step;
		if (step === Object.keys(this.props.simulation).length - 1) {
			clearInterval(this.timer);
		}
	};

	play = () => {
		let initialStep = document.getElementById("timeSlider").value;
		this.timer = setInterval(this.playByIntervalFn(initialStep), 1000);
	};

	stepMove = (event) => {
		var updatedSliderValue = event.target.value;
		this.setState({
			sliderValue: updatedSliderValue
		});
		this.move(updatedSliderValue);
	};

	componentDidMount() {
		this.props.simulation[0].forEach((position) => {
			let field = d3.select("#field");
			field.append("circle")
				.attr("class", "player")
				.attr("r", position.haveBall ? 15 : 10)
				.attr("cx", position.x_axis)
				.attr("cy", position.y_axis)
				.style("fill", position.color)
				.style("stroke", position.haveBall ? "white" : "black");

			field.append("text")
				.attr("class", "player-number")
				.attr("x", position.x_axis - 4)
				.attr("y", position.y_axis + 5)
				.text(position.player)
				.attr("font-family", "sans-serif")
				.attr("fill", "white");
		});
	}

	render() {
		let {sliderValue} = this.state;
		return <div>
			<svg id="field" width="1150" height="720">
				<rect x="0" y="0" width="1150" height="720" fill="green"/>
				<path d="M 575,20 L 50,20 50,700 1100,700 1100,20 575,20 575,700 z" stroke="white" strokeWidth="2"
				      fill="green"/>
				<circle cx="575" cy="360" r="91.5" stroke="white" strokeWidth="2" fillOpacity="0"/>
				<circle cx="575" cy="360" r="2" stroke="white" fill="white"/>
				<circle cx="160" cy="360" r="2" stroke="white" fill="white"/>
				<circle cx="990" cy="360" r="2" stroke="white" fill="white"/>
				<path d="M 50,324.4 L 40,324.4 40, 396.6 50 396.6 z" stroke="white" strokeWidth="2" fillOpacity="0"/>
				<path d="M 1100,324.4 L 1110,324.4 1110,396.6 1100,396.6 z" stroke="white" strokeWidth="2"
				      fillOpacity="0"/>
				<path d="M 50,269.4 L 105,269.4 105,451.6 50 451.6 z" stroke="white" strokeWidth="2" fillOpacity="0"/>
				<path d="M 1100,269.4 L 1045,269.4 1045,451.6 1100,451.6 z" stroke="white" strokeWidth="2"
				      fillOpacity="0"/>
				<path d="M 50,159.4 L 215,159.4 215,561.6 50 561.6 z" stroke="white" strokeWidth="2" fillOpacity="0"/>
				<path d="M 1100,159.4 L 935,159.4 935,561.6 1100,561.6 z" stroke="white" strokeWidth="2"
				      fillOpacity="0"/>
				<path d="M 215,286.875 A 91.5,91.5 0 0,1 215,433.125 z" stroke="white" strokeWidth="2" fill="green"/>
				<path d="M 935,286.875 A 91.5,91.5 0 0,0 935,433.125 z" stroke="white" strokeWidth="2" fill="green"/>
				<path d="M 50,30 A 10,10 0 0,0 60,20 L 50,20 z" stroke="white" strokeWidth="2" fillOpacity="0"/>
				<path d="M 60,700 A 10,10 0 0,0 50,690 L 50,700 z" stroke="white" strokeWidth="2" fillOpacity="0"/>
				<path d="M 1100,690 A 10,10 0 0,0 1090,700 L 1100,700 z" stroke="white" strokeWidth="2"
				      fillOpacity="0"/>
				<path d="M 1090,20 A 10,10 0 0,0 1100,30 L 1100,20 z" stroke="white" strokeWidth="2" fillOpacity="0"/>
			</svg>

			<div id="buttons">
				<button onClick={this.play}>Play</button>
				<input id="timeSlider" type="range" min={0} max={3} step={1} value={sliderValue} onInput={this.stepMove}/>
			</div>
		</div>
	}
}

export default FootballSimulation;
