import React from 'react';
import PropTypes from 'prop-types';
import { lightBlue600 } from 'material-ui/styles/colors';

import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

import 'css/ValueSlider.css';


const textFieldStyle = {
	width: 50
};

const textInputStyle = {
	color: lightBlue600
};

const textFieldUnderlineStyle = {
	visibility: 'hidden'
};

const sliderStyle = {
	touchAction: 'none'
};



class ValueSlider extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			inputActive: false
		};

		this.handleInputFocus = () => this.setState({ inputActive: true });
		this.handleInputBlur  = () => this.setState({ inputActive: false });
	}

	render() {
		const { value, onChange, min, max, step, label } = this.props;
		const { inputActive } = this.state;

		return (
			<div className="valueSlider">
				{label &&
					<label className="valueSlider__label">
						{label}
					</label>
				}
				<Slider
					className="valueSlider__slider"
					value={value}
					onChange={onChange}
					min={min}
					max={max}
					step={step}
					style={sliderStyle}
				/>
				<TextField
					className="valueSlider__text"
					style={textFieldStyle}
					inputStyle={inputActive ? null : textInputStyle}
					underlineStyle={inputActive ? null : textFieldUnderlineStyle}
					name={label || 'val'}
					value={max <= 1 ? value.toFixed(2) : Math.round(value)}
					onChange={onChange}
					onFocus={this.handleInputFocus}
					onBlur={this.handleInputBlur}
					type="number"
					inputMode="numeric"
					pattern="\d*"
				/>
			</div>
		);
	}
}

ValueSlider.propTypes = {
	label: PropTypes.string,
	value: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default ValueSlider;
