import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Theme from 'enums/Theme';
import ColorSpaceSelector from 'ui/ColorSpaceSelector';
import ValueSlider from 'ui/ValueSlider';
import SaveGallery from 'ui/SaveGallery';
import {
	setBackground,
	setColorSpace,
	setStopCount,
	backgroundSelector,
	colorSpaceSelector,
	stopCountSelector
} from 'ducks/activeGradient';
import { saveActiveGradient } from 'ducks/saves';

import 'css/GradientConfig.css';


const drawerContainerStyle = {
	padding: 20
};

const saveButtonStyle = {
	display: 'block',
	width: 200,
	margin: '16px auto 0'
};

const forceOpenDrawer = window.innerWidth >= 1000;


const GradientConfig = (props) => {
	const {
		background,
		colorSpace,
		stopCount,
		setBackground,
		setColorSpace,
		setStopCount,
		saveActiveGradient
	} = props;


	return (
		<Drawer
			className="gradient-config"
			open={forceOpenDrawer}
			docked={forceOpenDrawer}
			swipeAreaWidth={20}
			width={300}
			containerStyle={drawerContainerStyle}
		>
				<LineItem label="Background">
					<SelectField
						value={background}
						onChange={setBackground}
					>
						<MenuItem value={Theme.Dark} primaryText="Dark" />
						<MenuItem value={Theme.Light} primaryText="Light" />
					</SelectField>
				</LineItem>
				<LineItem label="Color Space">
					<ColorSpaceSelector
						value={colorSpace}
						onChange={setColorSpace}
					/>
				</LineItem>
				<LineItem label="Stop Count">
					<ValueSlider
						value={stopCount}
						onChange={setStopCount}
						min={2}
						max={16}
						step={1}
						style={{ width: 200 }}
					/>
				</LineItem>

				<RaisedButton
					label="Save Gradient"
					onClick={saveActiveGradient}
					primary
					className="saveButton"
					style={saveButtonStyle}
				/>

				<SaveGallery />
		</Drawer>
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
	saveActiveGradient: () => dispatch(saveActiveGradient())
});

export default connect(mapStateToProps, mapDispatchToProps)(GradientConfig);




const LineItem = ({ label, children }) => {
	return (
		<div className="gradient-config__option">
			<label className="gradient-config__label">{label}</label>
			<div className="gradient-config__input">{children}</div>
		</div>
	);
};

LineItem.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
};
