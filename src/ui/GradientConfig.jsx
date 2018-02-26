import React from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

import Theme from 'enums/Theme';
import ColorSpaceSelector from 'ui/ColorSpaceSelector';
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
		<React.Fragment>
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
					hideRGB
					value={colorSpace}
					onChange={setColorSpace}
				/>
			</div>
			<div>
				<Slider
					className="stop-count-slider"
					value={stopCount}
					onChange={setStopCount}
					min={2}
					max={10}
					step={1}
					style={{ width: 200 }}
				/>
				<TextField
					name="stopCount"
					type="number"
					inputMode="numeric"
					pattern="\d*"
					value={stopCount}
					onChange={setStopCount}
					style={{ width: 40, marginLeft: 12 }}
				/>
			</div>
		</React.Fragment>
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
