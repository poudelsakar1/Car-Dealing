import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './container/home';
import ResultsPage from './container/results';
import DetailsPage from './container/details';
import './App.css';
import AppBar from './container/app-bar';
import FooterCTA from './container/footer-cta';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AppBar />
        <React.Suspense fallback={<div />}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={`/results`} component={ResultsPage} />
            <Route path={`/details`} component={DetailsPage} />
          </Switch>
        </React.Suspense>
        <FooterCTA />
      </Router>
    </>
  )
}

export default App;
