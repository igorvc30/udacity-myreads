import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Row, Col } from 'antd';
import BookCard from './BookCard';

const BookList = props => {
  const { booksList, updateBookShelf } = props;

  return booksList.length > 0 ? (
    <Row gutter={20} type="flex" justify="space-around" align="bottom">
      {booksList.map(item => (
        <Col key={item.id}>
          <BookCard book={item} updateBookShelf={updateBookShelf} />
        </Col>
      ))}
    </Row>
  ) : (
    <Skeleton active loading paragraph={{ rows: 5 }} />
  );
};

BookList.propTypes = {
  booksList: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired
};

export default BookList;
