import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Card, Button, Rate, Empty } from "antd";
import { Link } from "react-router-dom";
import MenuShelf from './MenuShelf';
import "./BookCard.css";

class BookCard extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
  }

  static defaultProps = {
    book: {},
    updateBookShelf: () =>{},
  };

 

  render() {
    const { Meta } = Card;
    const { book, updateBookShelf } = this.props;

    // const menu = (
    //   <Menu onClick={this.handleMenuClick} inlineIndent={0}> 
    //     <MenuItemGroup key="g1" title="Move to...">
    //       <Menu.Item key="currentlyReading">
    //         Currently Reading &nbsp;
    //         {book.shelf === "currentlyReading" && <Icon type="check" />}
    //       </Menu.Item>
    //       <Menu.Item key="wantToRead">
    //         Want to read &nbsp;
    //         {book.shelf === "wantToRead" && <Icon type="check" />}
    //       </Menu.Item>
    //       <Menu.Item key="read">
    //         Read &nbsp;
    //         {book.shelf === "read" && <Icon type="check" />}
    //       </Menu.Item>
    //       <Menu.Item key="none">
    //         None &nbsp;
    //         {book.shelf === "none" &&<Icon type="check" />}
    //       </Menu.Item>
    //     </MenuItemGroup>
    //   </Menu>
    // );

    return (
      <Card style={{ width: 200, marginTop: 16 }}
        cover={
          <div class="container">
            {
            book.imageLinks?
            (
            <img
              height="220px"
              alt="Book cover"
              className="image"
              src={book.imageLinks.smallThumbnail}
            />
            )
            :
            <Empty />
            }
            {/* <Link to={`/info/${book.id}`}> */}
            <Link
              to={{
                  pathname: `/info/${book.id}`,
                  state: {
                    updateBookShelf: updateBookShelf
                  }
                }}
              >
              <div class="middle">
                <Button type="primary" shape="circle" icon="search" size="large"/>
              </div>
            </Link>

          </div>
        }
        actions={[
          <Rate disabled value={book.averageRating} />,
          <MenuShelf updateBookShelf={updateBookShelf} book={book}/>

          // <Dropdown 
          //   overlay={
          //     <MenuShelf updateBookShelf={updateBookShelf} />
          //   }>
          //   <Button type="primary" shape="circle" size="small" icon="caret-down" />
          // </Dropdown>
        ]}
      >
        <Meta
          title={book.title}
          description={
            book.authors?
              book.authors.map((item, index) => (<span key={index}>{index > 0? ", ":""}{item}</span>))
              :
              <span>Unknown Author</span>
            }
        />
      </Card>
    );
  }
}

export default BookCard;
