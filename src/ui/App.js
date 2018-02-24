import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import { cyan500, cyan700, grey400 } from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';

import store from 'store';
import DocumentClass from 'ui/DocumentClass';

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


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { theme: 'dark' };
	}

	handleChange = (event, index, value) => this.setState({ theme: value });

	render() {
		return (
			<Provider store={store}>
				<MuiThemeProvider muiTheme={getMuiTheme(this.state.theme === 'dark' ? darkBaseTheme : lightBaseTheme)}>
					<div className="app">
						<DocumentClass className={`theme--${this.state.theme}`} />
						<div>
							<RaisedButton label="Primary" primary />
						</div>
						<div>
							<DropDownMenu value={this.state.theme} onChange={this.handleChange} autoWidth={false} style={{ width: 200 }}>
								<MenuItem value="dark" primaryText="Dark" />
								<MenuItem value="light" primaryText="Light" />
							</DropDownMenu>
						</div>
						<div>
							<Slider style={{ width: 300 }} />
						</div>
					</div>
				</MuiThemeProvider>
			</Provider>
		);
	}
}

export default App;
