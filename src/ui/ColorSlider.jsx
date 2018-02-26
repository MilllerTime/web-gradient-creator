import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

import 'css/ColorSlider.css';


const textInputStyle = {
	width: 50
};

const sliderStyle = {
	touchAction: 'none'
};


const ColorSlider = ({ value, onChange, min, max, step, label }) => {

	return (
		<div className="colorSlider">
			<label className="colorSlider__label">
				{label}
			</label>
			<Slider
				className="colorSlider__slider"
				value={value}
				onChange={onChange}
				min={min}
				max={max}
				step={step}
				style={sliderStyle}
			/>
			<TextField
				className="colorSlider__text"
				style={textInputStyle}
				name={label}
				value={value}
				onChange={onChange}
				type="number"
				inputMode="numeric"
				pattern="\d*"
			/>
		</div>
	);
};

ColorSlider.propTypes = {
	value: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default ColorSlider;
