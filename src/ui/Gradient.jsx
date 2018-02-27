import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import chroma from 'chroma-js';

import { simulatedGradientSelector } from 'ducks/activeGradient';

import 'css/Gradient.css';



const canvasWidth = 16;

class Gradient extends React.Component {
	render() {
		const { simulatedGradient } = this.props;

		return (
			<div className="gradient">
				<div
					className="gradient__gfx"
					style={{ background: simulatedGradient }}
				/>
				<pre className="gradient__code">
					{simulatedGradient}
				</pre>
			</div>
		);
	}
}


const mapStateToProps = state => ({
	simulatedGradient: simulatedGradientSelector(state)
});

export default connect(mapStateToProps)(Gradient);
