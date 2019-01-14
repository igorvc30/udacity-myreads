import React from "react";
import BookCard from './BookCard'
import PropTypes from "prop-types";
import { Skeleton, Row, Col } from 'antd';

const BookList = (props) => {
  const { booksList, updateBookShelf } = props;

  return booksList.length > 0 ?  
      (
        <Row gutter={20} type="flex" justify="space-around" align="bottom">
          {booksList.map((item, index) => 
            <Col key={index}>
              <BookCard book={item} updateBookShelf={updateBookShelf}/>
            </Col>
          )}
        </Row>
      )
      :
      <Skeleton active loading paragraph={{ rows: 5 }}/> 
}

BookList.propTypes = {
  booksList: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired
};

BookList.defaultProps = {
  booksList: [],
  updateBookShelf: ()=> {}
};

export default BookList ;