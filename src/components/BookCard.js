import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Rate, Empty } from 'antd';
import { Link } from 'react-router-dom';
import MenuShelf from './MenuShelf';
import './BookCard.css';

class BookCard extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  };

  static defaultProps = {
    book: {},
    updateBookShelf: () => {}
  };

  render() {
    const { Meta } = Card;
    const { book, updateBookShelf } = this.props;

    return (
      <Card
        style={{ width: 200, marginTop: 16 }}
        cover={
          <div class="container">
            {book.imageLinks ? (
              <img
                height="220px"
                alt="Book cover"
                className="image"
                src={book.imageLinks.smallThumbnail}
              />
            ) : (
              <Empty />
            )}
            <Link
              to={{
                pathname: `/info/${book.id}`,
                state: {
                  updateBookShelf: updateBookShelf
                }
              }}
            >
              <div class="middle">
                <Button type="primary" shape="circle" icon="search" size="large" />
              </div>
            </Link>
          </div>
        }
        actions={[
          <Rate disabled value={book.averageRating} />,
          <MenuShelf updateBookShelf={updateBookShelf} book={book} />
        ]}
      >
        <Meta
          title={book.title}
          description={
            book.authors ? (
              book.authors.map((item, index) => (
                <span key={index}>
                  {index > 0 ? ', ' : ''}
                  {item}
                </span>
              ))
            ) : (
              <span>Unknown Author</span>
            )
          }
        />
      </Card>
    );
  }
}

export default BookCard;
