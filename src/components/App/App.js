import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../Home'
import About from '../About'
import NeedHelp from '../NeedHelp'
import './App.css'
import Footer from '../Footer/Footer'
import FAQ from '../FAQ'
import Header from '../Header/Header'
import Team from '../Team/Team'
import DonationStatus from '../DonationStatus/DonationStatus'
import {PageView, initGA} from '../Tracking/index.js';


const App = () => {
  initGA('UA-68989854-7');
    PageView();
  return (
    <Router>

      <Header />

      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route path="/needhelp">
            <NeedHelp />
          </Route>
          <Route path='/team'>
            <Team />
          </Route>
          <Route path='/donations/:ref'>
            <DonationStatus />
          </Route>
        </Switch>
      </main>

      <Footer />
    </Router>
  )
}

export default App;