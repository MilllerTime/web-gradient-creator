import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { lightBlue500, lightBlue700, grey400, grey500, grey600 } from 'material-ui/styles/colors';

import Theme from 'enums/Theme';
import DocumentClass from 'ui/DocumentClass';
import AppHeader from 'ui/AppHeader';
import GradientConfig from 'ui/GradientConfig';
import StopEditor from 'ui/StopEditor';
import GradientDemos from 'ui/GradientDemos';
import Toaster from 'ui/Toaster';
import { backgroundSelector } from 'ducks/activeGradient';

import 'css/App.css';



const themeDark = getMuiTheme({
	...darkBaseTheme,
	palette: {
		...darkBaseTheme.palette,
		accent1Color: lightBlue500,
		accent2Color: lightBlue500,
		accent3Color: grey500,
		primary1Color: lightBlue700,
		primary2Color: lightBlue700,
		primary3Color: grey600
	}
});

const themeLight = getMuiTheme({
	...lightBaseTheme,
	palette: {
		...lightBaseTheme.palette,
		accent1Color: lightBlue500,
		accent2Color: lightBlue500,
		accent3Color: grey500,
		primary1Color: lightBlue500,
		primary2Color: lightBlue500,
		primary3Color: grey400
	}
});


const App = ({ background }) => {
	return (
		<MuiThemeProvider muiTheme={background === Theme.Dark ? themeDark : themeLight}>
			<div className="app">
				<DocumentClass className={`theme--${background}`} />
				<AppHeader />
				<GradientConfig />
				<div className="stop-editors">
					<StopEditor stopIndex={0} />
					<StopEditor stopIndex={1} />
				</div>
				<GradientDemos />

				<Toaster />
			</div>
		</MuiThemeProvider>
	);
};


const mapStateToProps = state => ({
	background: backgroundSelector(state)
});

export default connect(mapStateToProps)(App);
