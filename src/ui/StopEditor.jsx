import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import chroma from 'chroma-js';

import getRangeForColorComponent from 'helpers/getRangeForColorComponent';
import ColorSpaceSelector from 'ui/ColorSpaceSelector';
import ValueSlider from 'ui/ValueSlider';
import {
	setStopColorSpace,
	setStopColor,
	stopSelector,
	backgroundSelector
} from 'ducks/activeGradient';

import 'css/StopEditor.css';


const colorSpaceStyle = {
	display: 'block',
	width: 100,
	margin: '0 auto'
};

const cssErrorStyle = {
	textAlign: 'center'
};


class StopEditor extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			cssFocus: false,
			cssValue: '',
			cssInvalid: false
		};

		this.setStopColorSpace = (evt, i, value) => props.setStopColorSpace(props.stopIndex, value);
		// Only ever three stop indexes given the valid color spaces.
		this.setStopColorIndexList = [
			this.bindSetColorIndexAction(0),
			this.bindSetColorIndexAction(1),
			this.bindSetColorIndexAction(2)
		];

		this.focusCSS = this.focusCSS.bind(this);
		this.blurCSS = this.blurCSS.bind(this);
		this.handleChangeCSS = this.handleChangeCSS.bind(this);
	}

	bindSetColorIndexAction(index) {
		return (evt, value) => {
			const { stopIndex, stop, setStopColor } = this.props;
			const fullColor = [...stop.color];
			fullColor[index] = +value;
			setStopColor(stopIndex, fullColor);
		};
	}

	focusCSS() {
		this.setState({
			cssFocus: true,
			cssValue: this.props.stop.css,
			cssInvalid: false
		});
	}

	// Returns true if successful
	parseCSS(value) {
		const { stopIndex, stop, setStopColor } = this.props;
		// Catch color parsing errors
		try {
			const color = chroma(value)[stop.colorSpace]();
			setStopColor(stopIndex, color);
			return true;
		}
		catch(error) {
			console.error(error);
			return false;
		}
	}

	blurCSS() {
		this.parseCSS(this.state.cssValue);
		this.setState({
			cssFocus: false,
			cssValue: '',
			cssInvalid: false
		});
	}

	handleChangeCSS(evt, value) {
		const parseSuccessful = this.parseCSS(value);
		if (this.state.cssFocus) {
			this.setState({
				cssValue: value,
				cssInvalid: !parseSuccessful
			});
		}
	}

	render() {
		const { stop } = this.props;
		const { cssFocus, cssValue, cssInvalid } = this.state;
		const { colorSpace } = stop;

		return (
			<Paper className="stopEditor">
				<div className="stopEditor__preview" style={{ background: stop.css }} />
				<div className="stopEditor__form">
					<ColorSpaceSelector
						value={colorSpace}
						onChange={this.setStopColorSpace}
						onlyPickable
						style={colorSpaceStyle}
					/>
					{stop.color.map((value, index) => {
						const range = getRangeForColorComponent(colorSpace, index);
						return (
							<ValueSlider
								label={colorSpace.charAt(index).toUpperCase()}
								value={value}
								onChange={this.setStopColorIndexList[index]}
								step={range.max <= 1 ? 0.01 : 1}
								min={range.min}
								max={range.max}
								key={index}
							/>
						);
					})}

					<TextField
						className="stopEditor__css"
						name="css"
						value={cssFocus ? cssValue : stop.css}
						errorText={cssInvalid ? 'Unrecognized color' : null}
						errorStyle={cssErrorStyle}
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
	setStopColor
};

export default connect(mapStateToProps, mapDispatchToProps)(StopEditor);
