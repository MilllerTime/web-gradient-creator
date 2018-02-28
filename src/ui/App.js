import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import { cyan500, cyan700, grey400 } from 'material-ui/styles/colors';

import Theme from 'enums/Theme';
import DocumentClass from 'ui/DocumentClass';
import GradientConfig from 'ui/GradientConfig';
import StopEditor from 'ui/StopEditor';
import GradientDemos from 'ui/GradientDemos';
import Toaster from 'ui/Toaster';
import { backgroundSelector } from 'ducks/activeGradient';

import 'css/App.css';


// const themeLight = getMuiTheme({

// });

// const themeDark = getMuiTheme({
// 	palette: {
// 		textColor: '#FFF',
// 		primary1Color: '#777',
// 		primary2Color: '#AAA',
// 		primary3Color: '#444',
// 		accent1Color: cyan500,
// 		accent2Color: cyan700,
// 		accent3Color: grey400,
// 	}
// });


const App = ({ background }) => {
	return (
		<MuiThemeProvider muiTheme={getMuiTheme(background === Theme.Dark ? darkBaseTheme : lightBaseTheme)}>
			<div className="app">
				<DocumentClass className={`theme--${background}`} />
				<GradientConfig />
				<div>
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
