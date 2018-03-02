import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Theme from 'enums/Theme';
import ColorSpaceSelector from 'ui/ColorSpaceSelector';
import ValueSlider from 'ui/ValueSlider';
import {
	setBackground,
	setColorSpace,
	setStopCount,
	backgroundSelector,
	colorSpaceSelector,
	stopCountSelector
} from 'ducks/activeGradient';




const GradientConfig = (props) => {
	const {
		background,
		colorSpace,
		stopCount,
		setBackground,
		setColorSpace,
		setStopCount
	} = props;


	return (
		<div className="gradient-config">
			<div>
				<SelectField
					floatingLabelText="Background"
					value={background}
					onChange={setBackground}
				>
					<MenuItem value={Theme.Dark} primaryText="Dark" />
					<MenuItem value={Theme.Light} primaryText="Light" />
				</SelectField>
			</div>
			<div>
				<ColorSpaceSelector
					floatingLabelText="Color Space"
					value={colorSpace}
					onChange={setColorSpace}
				/>
			</div>
			<div>
				<ValueSlider
					value={stopCount}
					onChange={setStopCount}
					min={2}
					max={16}
					step={1}
					style={{ width: 200 }}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	background: backgroundSelector(state),
	colorSpace: colorSpaceSelector(state),
	stopCount: stopCountSelector(state)
});

const mapDispatchToProps = dispatch => ({
	setBackground: (evt, index, value) => dispatch(setBackground(value)),
	setColorSpace: (evt, index, value) => dispatch(setColorSpace(value)),
	setStopCount: (evt, value) => dispatch(setStopCount(+value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GradientConfig);
