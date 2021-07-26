import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Header from './Header';
import DemoPage from './main/DemoPage';
import EnrollmentPage from './main/EnrollmentPage';
import ParsePage from './main/ParsePage';

import './App.css';
import 'devextreme/dist/css/dx.dark.css';
import Footer from './Footer';

function App() {
	return (
		<div className="app">
			<div className={'app-header'}>
				<Header/>
			</div>
			<div className={'app-body'}>
				<BrowserRouter>
					<Switch>
						<Route exact path={'/'} component={DemoPage}/>
						<Route exact path={'/enroll'} component={EnrollmentPage}/>
						<Route exact path={'/parse'} component={ParsePage}/>
					</Switch>
				</BrowserRouter>
			</div>
			<div className={'app-footer'}>
				<Footer/>
			</div>
		</div>
	);
}

export default App;
