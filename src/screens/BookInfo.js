import React, { Component } from "react";
import { get } from "../api/BooksAPI";
import { Card, Rate, Empty, Row, Col, Affix, Button, Tag, Icon } from "antd";
import { Link } from "react-router-dom";

import MenuShelf from "./../components/MenuShelf";
import "./BookInfo.css";

class BookInfo extends Component {
  state = {
    book: {},
    isLoading: true,
    updateBookShelf: () => {}
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    get(id).then(book => this.setState({ book, isLoading: false }));
    this.setState({
      updateBookShelf: this.props.location.state.updateBookShelf
    });
  }

  render() {
    const { book, updateBookShelf } = this.state;
    const { Meta } = Card;

    return (
      <div>
        <Row>
          <Col span={8}>
            <Card
              style={{ width: "70%", marginLeft: 40 }}
              cover={
                book.imageLinks ? (
                  <img
                    alt="Book cover"
                    className="image"
                    src={book.imageLinks.smallThumbnail}
                  />
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
            <h1 className="info">{book.title || ""}</h1>
            <h2 className="info">{book.subtitle || ""}</h2>
            <span className="subheader ">
              Written by:{" "}
              {book.authors ? (
                book.authors.map((item, index) => (
                  <span key={index}>
                    {index > 0 ? ", " : ""}
                    {item}
                  </span>
                ))
              ) : (
                <span>Unknown Author</span>
              )}
            </span>

            <div className="bg-description">
              <p>{book.description || "No description."}</p>
            </div>
            {book.printType && <Tag color="#108ee9">{book.printType}</Tag>}
            {book.language && <Tag>{book.language.toUpperCase()}</Tag>}
            {book.infoLink && (
              <p>
                <Icon type="link" /> <a url={book.infoLink}>More details</a>
              </p>
            )}
          </Col>
        </Row>
        <Affix offsetBottom={80} style={{ position: "absolute", right: 50 }}>
        <Link to="/">    
          <Button shape="circle" size="large" icon="home" type="primary" />
        </Link>
        </Affix>
      </div>
    );
  }
}

export default BookInfo;
