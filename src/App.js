import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import AppRoutes from './router/AppRouter';
import { Layout } from 'antd';

class App extends Component {
  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Router>
        <Layout className="layout">
          <Header>
            <Link to="/">
              <h1 className="my-reads" id="top">
                MyReads
              </h1>
            </Link>
          </Header>

          <Content style={{ padding: '30px 50px 10px 50px', minHeight: 400 }}>
            {AppRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
          </Content>
          <Footer
            style={{ textAlign: 'center', backgroundColor: 'rgba(0,21,41, 0.7)', color: 'white' }}
          >
            MyReads ©2019 Created by Igor V. Costa
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
