import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

import ColorSpaceSelector from 'ui/ColorSpaceSelector';
import ColorSlider from 'ui/ColorSlider';
import {
	setStopColorSpace,
	setStopL,
	setStopA,
	setStopB,
	stopSelector,
	stopColorCSSSelector,
	backgroundSelector
} from 'ducks/activeGradient';

import 'css/StopEditor.css';


const colorSpaceStyle = {
	display: 'block',
	width: 100,
	margin: '0 auto'
};


class StopEditor extends React.Component {

	constructor(props) {
		super(props);

		this.setStopColorSpace = (evt, i, value) => props.setStopColorSpace(props.stopIndex, value);
		this.setStopL = this.bindSetNumberAction(props.setStopL);
		this.setStopA = this.bindSetNumberAction(props.setStopA);
		this.setStopB = this.bindSetNumberAction(props.setStopB);
	}

	bindSetNumberAction(action) {
		return (evt, value) => action(this.props.stopIndex, +value);
	}

	render() {
		const { stopIndex, stop, stopColor } = this.props;

		return (
			<Paper className="stopEditor">
				<div className="stopEditor__preview" style={{ background: stopColor }} />
				<div className="stopEditor__form">
					<ColorSpaceSelector
						value={stop.colorSpace}
						onChange={this.setStopColorSpace}
						hideAll
						style={colorSpaceStyle}
					/>
					<ColorSlider
						label="L"
						value={stop.l}
						onChange={this.setStopL}
						min={0}
						max={100}
						step={1}
					/>
					<ColorSlider
						label="A"
						value={stop.a}
						onChange={this.setStopA}
						min={-250}
						max={250}
						step={1}
					/>
					<ColorSlider
						label="B"
						value={stop.b}
						onChange={this.setStopB}
						min={-250}
						max={250}
						step={1}
					/>

					<div className="stopEditor__rgb">{stopColor}</div>
				</div>
			</Paper>
		);
	}
};

StopEditor.propTypes = {
	stopIndex: PropTypes.number.isRequired
};


const mapStateToProps = (state, ownProps) => ({
	stop: stopSelector(state, ownProps.stopIndex),
	stopColor: stopColorCSSSelector(state, ownProps.stopIndex),
	background: backgroundSelector(state)
});

const mapDispatchToProps = {
	setStopColorSpace,
	setStopL,
	setStopA,
	setStopB
};

export default connect(mapStateToProps, mapDispatchToProps)(StopEditor);
