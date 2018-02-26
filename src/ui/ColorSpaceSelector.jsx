import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ColorSpace from 'enums/ColorSpace';


const valuesComplete = Object.values(ColorSpace);
const valuesNoAll = valuesComplete.filter(v => v !== ColorSpace.All);
const valuesNoRGB = valuesComplete.filter(v => v !== ColorSpace.RGB);


const ColorSpaceSelector = ({ hideAll, hideRGB, ...otherProps }) => {
	let values = valuesComplete;
	if (hideAll) {
		values = valuesNoAll;
	} else if (hideRGB) {
		values = valuesNoRGB;
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
	// Hide specific values from the available options
	hideAll: PropTypes.bool,
	hideRGB: PropTypes.bool
};

export default ColorSpaceSelector;
