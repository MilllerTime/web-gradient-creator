import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import NavMenuIcon from 'material-ui/svg-icons/navigation/menu';

import Theme from 'enums/Theme';
import { toggleDrawer } from 'ducks/ui';
import { backgroundSelector } from 'ducks/activeGradient';



const AppHeader = ({ openDrawer, background }) => {

	return (
		<div className="appHeader">
			<IconButton className="appHeader__menuBtn" onClick={openDrawer}>
				<NavMenuIcon color={background === Theme.Dark ? '#ddd' : '#333'} />
			</IconButton>
		</div>
	);
};

const mapStateToProps = state => ({
	// We don't need to know the specific background, but the app
	// header needs to rerender when the background/theme changes.
	background: backgroundSelector(state)
});

const mapDispatchToProps = dispatch => ({
	openDrawer: () => dispatch(toggleDrawer(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
