import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'material-ui/svg-icons/action/help';

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
import {
	drawerOpenSelector,
	viewportWidthSelector,
	toggleDrawer
} from 'ducks/ui';
import { saveActiveGradient } from 'ducks/saves';

import 'css/GradientConfig.css';


const drawerContainerStyle = {
	padding: 20
};

const saveButtonStyle = {
	marginTop: 20
};




const GradientConfig = (props) => {
	const {
		// active gradient
		background,
		colorSpace,
		stopCount,
		setBackground,
		setColorSpace,
		setStopCount,
		// saving
		saveActiveGradient,
		// ui
		drawerOpen,
		forceDrawerOpen,
		toggleDrawer
	} = props;


	return (
		<Drawer
			className="gradient-config"
			open={drawerOpen || forceDrawerOpen}
			docked={forceDrawerOpen}
			onRequestChange={toggleDrawer}
			swipeAreaWidth={20}
			width={300}
			containerStyle={drawerContainerStyle}
		>
				<LineItem label="Background" hint={<span>Change the app's<br />background color.</span>}>
					<SelectField
						value={background}
						onChange={setBackground}
					>
						<MenuItem value={Theme.Dark} primaryText="Dark" />
						<MenuItem value={Theme.Light} primaryText="Light" />
					</SelectField>
				</LineItem>
				<LineItem label="Color Space" hint={<span>The color space used to<br />generate gradients.</span>}>
					<ColorSpaceSelector
						value={colorSpace}
						onChange={setColorSpace}
					/>
				</LineItem>
				<LineItem label="Stop Count" hint={<span>Number of color stops to<br />generate between user stops.</span>}>
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
					fullWidth
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
	stopCount: stopCountSelector(state),
	drawerOpen: drawerOpenSelector(state),
	forceDrawerOpen: viewportWidthSelector(state) >= 1000
});

const mapDispatchToProps = dispatch => ({
	setBackground: (evt, index, value) => dispatch(setBackground(value)),
	setColorSpace: (evt, index, value) => dispatch(setColorSpace(value)),
	setStopCount: (evt, value) => dispatch(setStopCount(+value)),
	saveActiveGradient: () => dispatch(saveActiveGradient()),
	toggleDrawer: (...args) => dispatch(toggleDrawer(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(GradientConfig);



const hintStyle = {
	width: 22,
	height: 22,
	padding: 3
};

const hintIconStyle = {
	width: 16,
	height: 16
};

const hintTooltipStyle = {
	fontSize: '0.8rem',
	lineHeight: '1.5em',
	letterSpacing: '0.04em',
	padding: '4px 8px',
	top: 18,
	pointerEvents: 'none'
};

const LineItem = ({ label, hint, children }) => {
	return (
		<div className="gradient-config__option">
			<label className="gradient-config__label">
				<span className="gradient-config__labelText">{label}</span>
				{hint &&
					<IconButton
						tooltip={hint}
						style={hintStyle}
						iconStyle={hintIconStyle}
						tooltipStyles={hintTooltipStyle}
					>
						<HelpIcon color="#999" />
					</IconButton>
				}
			</label>
			<div className="gradient-config__input">{children}</div>
		</div>
	);
};

LineItem.propTypes = {
	label: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
};
