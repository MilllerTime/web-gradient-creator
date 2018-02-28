import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import chroma from 'chroma-js';

import ColorSpaceSelector from 'ui/ColorSpaceSelector';
import ColorSlider from 'ui/ColorSlider';
import {
	setStopColorSpace,
	setStopL,
	setStopA,
	setStopB,
	stopSelector,
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

		this.state = {
			cssFocus: false,
			cssValue: ''
		};

		this.setStopColorSpace = (evt, i, value) => props.setStopColorSpace(props.stopIndex, value);
		this.setStopL = this.bindSetNumberAction(props.setStopL);
		this.setStopA = this.bindSetNumberAction(props.setStopA);
		this.setStopB = this.bindSetNumberAction(props.setStopB);

		this.focusCSS = this.focusCSS.bind(this);
		this.blurCSS = this.blurCSS.bind(this);
		this.handleChangeCSS = this.handleChangeCSS.bind(this);
	}

	bindSetNumberAction(action) {
		return (evt, value) => action(this.props.stopIndex, +value);
	}

	focusCSS() {
		this.setState({
			cssFocus: true,
			cssValue: this.props.stop.css
		});
	}

	parseCSS(value) {
		const { stopIndex, setStopL, setStopA, setStopB } = this.props;
		// Catch color parsing errors
		try {
			const color = chroma(value).lab();
			setStopL(stopIndex, color[0]);
			setStopA(stopIndex, color[1]);
			setStopB(stopIndex, color[2]);
		}
		catch(error) {
			console.error(error);
		}
	}

	blurCSS() {
		this.parseCSS(this.state.cssValue);
		this.setState({
			cssFocus: false,
			cssValue: ''
		});
	}

	handleChangeCSS(evt, value) {
		this.parseCSS(value);
		if (this.state.cssFocus) {
			this.setState({ cssValue: value });
		}
	}

	render() {
		const { stop } = this.props;
		const { cssFocus, cssValue } = this.state;

		return (
			<Paper className="stopEditor">
				<div className="stopEditor__preview" style={{ background: stop.css }} />
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

					<TextField
						className="stopEditor__css"
						name="css"
						value={cssFocus ? cssValue : stop.css}
						onChange={cssFocus ? this.handleChangeCSS : null}
						onFocus={this.focusCSS}
						onBlur={this.blurCSS}
					/>
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
	background: backgroundSelector(state)
});

const mapDispatchToProps = {
	setStopColorSpace,
	setStopL,
	setStopA,
	setStopB
};

export default connect(mapStateToProps, mapDispatchToProps)(StopEditor);
