import React from 'react';
import './App.css';
import { Layout } from 'antd';
import { HashRouter as Router, Link } from 'react-router-dom';
import BookManager from './screens/BookManager';

const App = () => {
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

        <Content style={{ padding: '30px 50px 10px 50px', minHeight: 400, marginBottom: '20px' }}>
          <BookManager />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(0,21,41, 0.7)',
            color: 'white'
          }}
        >
          MyReads ©2019 Created by Igor V. Costa
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
