import React, { Component } from "react";
import { getAll } from '../api/BooksAPI';
import BookCard from './BookCard'
import { Skeleton, Row, Col } from 'antd';

class Bookshelf extends Component {
    state = {
        books: []
      }
    
      constructor(){
        super();
        getAll().then((books) => this.setState({ books }));
        console.log(this.state.books);
      }

      render() {
        const { books } = this.state;
          return this.state.books.length === 0? <Skeleton active loading avatar={false} paragraph/> 
          : 
            (
              <Row type="flex" >
                {books.map((item, index) => 
                  <Col xs={4} sm={4} md={6} lg={6} xl={4}>
                    <BookCard book={item} />
                  </Col>
                )}
              </Row>
            )
          
      }
}

export default Bookshelf ;