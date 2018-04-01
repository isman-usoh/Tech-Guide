import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';

import { HomeContainer } from 'containers/Home/HomeContainer';
import { ContactContainer } from 'containers/Contact/ContactContainer';
import { LoginContainer } from 'containers/Login/LoginContainer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <main id='main'>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/contact" component={ContactContainer} />
            <Route path="/login" component={LoginContainer} />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
