import React, { Component } from "react";
import BookCard from './BookCard'
import { Skeleton, Row, Col } from 'antd';

class BookList extends Component {
    
      render() {
        const { books, updateBookShelf } = this.props;
        return books.length === 0? <Skeleton active loading paragraph={{ rows: 5 }}/> 
          : 
            (
              <Row gutter={20} type="flex" justify="start" align="bottom">
                {books.map((item, index) => 
                  <Col key={index}>
                    <BookCard book={item} updateBookShelf={updateBookShelf}/>
                    <div className="col-xs-12 shelf" />
                  </Col>
                )}
              </Row>
            )
          
      }
}

export default BookList ;