import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from '../api/BooksAPI';
import { Card, Rate, Empty, Row, Col, Affix, Button, Tag, Icon, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import MenuShelf from './../components/MenuShelf';
import './BookInfo.css';

class BookInfo extends Component {
  
  static propTypes = {
    updateBookShelf: PropTypes.func.isRequired
  };

  state = {
    book: {},
    isLoading: true,
    errorMessage: 'Loading...'
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id.length > 0) {
      get(id).then(
        success => {
          this.setState({ book: success, isLoading: false })
        },
      error => {
        this.setState({ errorMessage: 'No book found with the id provided.'});
      }
        );
    } else {
      this.setState({ errorMessage: 'No book id provided, unable to search.'});
    }
  }

  render() {
    const { book, errorMessage } = this.state;
    const { updateBookShelf } = this.props;
    const { Meta } = Card;
    //checks if the book object is empty to render a Skeleton while aplication is fetching data
    return (
      <div>
      {Object.keys(book).length ? (
      <div>
        <Row>
          <Col span={8}>
            <Card
              style={{ width: '70%', marginLeft: 40 }}
              cover={
                book.imageLinks ? (
                  <img alt="Book cover" className="image" src={book.imageLinks.smallThumbnail} />
                ) : (
                  <Empty />
                )
              }
              actions={[
                <Rate disabled value={book.averageRating} />,
                <MenuShelf updateBookShelf={updateBookShelf} book={book} />
              ]}
            >
              <Meta
                description={
                  book.industryIdentifiers ? (
                    book.industryIdentifiers.map((item, index) => (
                      <span key={index}>
                        {`${item.type}: ${item.identifier}`}
                        <br />
                      </span>
                    ))
                  ) : (
                    <span>No identifier</span>
                  )
                }
              />
            </Card>
          </Col>

          <Col span={16}>
            <h1 className="info">{book.title || ''}</h1>
            <h2 className="info">{book.subtitle || ''}</h2>
            <span className="subheader ">
              Written by:{' '}
              {book.authors ? (
                book.authors.map((item, index) => (
                  <span key={index}>
                    {index > 0 ? ', ' : ''}
                    {item}
                  </span>
                ))
              ) : (
                <span>Unknown Author</span>
              )}
            </span>

            <div className="bg-description">
              <p>{book.description || 'No description.'}</p>
            </div>
            {book.printType && <Tag color="#108ee9">{book.printType}</Tag>}
            {book.language && <Tag>{book.language.toUpperCase()}</Tag>}
            {book.infoLink && (
              <p>
                <Icon type="link" /> <a href={book.infoLink}>More details</a>
              </p>
            )}
          </Col>
        </Row>
      </div>
    ) : (
      <div>
        <h2>{ errorMessage }</h2>
        <Skeleton active loading paragraph={{ rows: 10 }} />
      </div>
    )}
      <Affix offsetBottom={80} style={{ position: 'absolute', right: 50 }}>
                <Link to="/">
                  <Button shape="circle" size="large" icon="home" type="primary" />
                </Link>
        </Affix>
      </div>
    )
  }
}

export default BookInfo;
