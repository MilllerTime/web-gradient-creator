import React from 'react';
import { connect } from 'react-redux';

import { simulatedGradientSelector } from 'ducks/activeGradient';

import 'css/Gradient.css';



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
