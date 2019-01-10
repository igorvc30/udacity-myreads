import React, { Component } from "react";
import { Card, Icon, Menu, Dropdown, Button, message, Rate } from "antd";

class BookCard extends Component {

  handleMenuClick = (e) => {
    message.info('Click on menu item.', e.key);
    console.log('click', e.key);
  }

  handleStarChange = (value) => {
    // this.setState({ value });
    console.log("starts: ", value);
  }

  render() {
    const { Meta } = Card;
    const { book } = this.props;
    const MenuItemGroup = Menu.ItemGroup;
    console.log(book);

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
      <Card style={{ width: 250, marginTop: 16 }}
        cover={
          <img
            height="220px"
            alt="Book cover"
            src={book.imageLinks.smallThumbnail}
          />
        }
        actions={[
          <Rate disabled={!book.averageRating} allowClear={false} onChange={this.handleStarChange} value={book.averageRating} />,
          <Dropdown overlay={menu}>
            <Button type="primary" shape="circle" icon="caret-down" />
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
