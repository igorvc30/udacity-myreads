import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Card, Icon, Menu, Dropdown, Button, message, Rate } from "antd";

class BookCard extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBookShelf: PropTypes.func.isRequired,
}

  handleMenuClick = (e) => {
    const { book, updateBookShelf } = this.props;
    const { key } = e;
    message.info(`Click on menu item. ${key}`);
    updateBookShelf(book, key)
  }

  handleStarChange = (value) => {
    // this.setState({ value });
    console.log("starts: ", value);
  }

  render() {
    const { Meta } = Card;
    const { book } = this.props;
    const MenuItemGroup = Menu.ItemGroup;

    const menu = (
      <Menu onClick={this.handleMenuClick} inlineIndent={0}> 
        <MenuItemGroup key="g1" title="Move to...">
          <Menu.Item key="currentlyReading">
            Currently Reading &nbsp;
            {book.shelf === "currentlyReading" && <Icon type="check" />}
          </Menu.Item>
          <Menu.Item key="wantToRead">
            Want to read &nbsp;
            {book.shelf === "wantToRead" && <Icon type="check" />}
          </Menu.Item>
          <Menu.Item key="read">
            Read &nbsp;
            {book.shelf === "read" && <Icon type="check" />}
          </Menu.Item>
          <Menu.Item key="none">
            None &nbsp;
            {book.shelf === "none" &&<Icon type="check" />}
          </Menu.Item>
        </MenuItemGroup>
      </Menu>
    );

    return (
      <Card style={{ width: 200, marginTop: 16 }}
        cover={
          <img
            height="220px"
            alt="Book cover"
            src={book.imageLinks.smallThumbnail}
          />
        }
        actions={[
          <Rate disabled value={book.averageRating} />,
          <Dropdown overlay={menu}>
            <Button type="primary" shape="circle" size="small" icon="caret-down" />
          </Dropdown>
        ]}
      >
        <Meta
          // avatar={
          //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          // }
          title={book.title}
          description={
            book.authors.map((item, index) => (<span key={index}>{index > 0? ", ":""}{item}</span>))
          }
        />
      </Card>
    );
  }
}

export default BookCard;
