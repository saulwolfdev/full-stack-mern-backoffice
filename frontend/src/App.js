import React, { Component,Fragment } from 'react'
import Routes from './routes/Routes';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() { 
		return (
			<Fragment>
				<Routes/>
			</Fragment>
		);
	}
}
 
export default App;

