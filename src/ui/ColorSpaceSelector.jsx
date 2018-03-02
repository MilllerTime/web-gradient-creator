import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ColorSpace from 'enums/ColorSpace';


const valuesComplete = Object.values(ColorSpace);
const valuesPickable = valuesComplete.filter(v => v !== ColorSpace.All && v !== ColorSpace.LRGB);


const ColorSpaceSelector = ({ onlyPickable, ...otherProps }) => {
	let values = valuesComplete;
	if (onlyPickable) {
		values = valuesPickable;
	}

	return (
		<SelectField
			{...otherProps}
		>
			{values.map(value => (
				<MenuItem value={value} primaryText={value.toUpperCase()} key={value} />
			))}
		</SelectField>
	);
};

ColorSpaceSelector.propTypes = {
	// Hide values from the available options that don't apply to a color picker.
	onlyPickable: PropTypes.bool
};

export default ColorSpaceSelector;
