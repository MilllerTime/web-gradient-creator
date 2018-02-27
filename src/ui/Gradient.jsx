import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma from 'chroma-js';

import { stopsSelector } from 'ducks/activeGradient';


const canvasWidth = 100;

class Gradient extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.drawGradient();
	}

	componentDidUpdate(prevProps, prevState) {
		this.drawGradient();
	}

	drawGradient() {
		const { stops } = this.props;

		const stop1 = stops[0];
		const stop2 = stops[1];
		const stop1Color = chroma.lab(stop1.l, stop1.a, stop1.b);
		const stop2Color = chroma.lab(stop2.l, stop2.a, stop2.b);

		const ctx = this.canvas.getContext('2d');

		for (let i=0; i<canvasWidth; i++) {
			const ratio = i / canvasWidth;
			const color = chroma.mix(stop1Color, stop2Color, ratio, 'lab');
			ctx.fillStyle = color.css();
			// Single pixel
			ctx.fillRect(i, 0, 1, 1);
		}
	}

	render() {
		return (
			<canvas
				className="gradient-canvas"
				width={canvasWidth}
				height="1"
				ref={node => this.canvas = node}
			/>
		);
	}
}


const mapStateToProps = state => ({
	stops: stopsSelector(state)
});

export default connect(mapStateToProps)(Gradient);
