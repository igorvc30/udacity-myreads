import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Dropdown, Button } from 'antd';

class MenuShelf extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  };

  static defaultProps = {
    book: {},
    updateBookShelf: () => {}
  };

  handleMenuClick = e => {
    const { book, updateBookShelf } = this.props;
    const { key } = e;
    updateBookShelf(book, key);
  };

  render() {
    const MenuItemGroup = Menu.ItemGroup;
    const { book } = this.props;
    const options = [
      { name: 'Currently Reading', shelf: 'currentlyReading' },
      { name: 'Want To Read', shelf: 'wantToRead' },
      { name: 'Read', shelf: 'read' },
      { name: 'None', shelf: 'none' }
    ];
    return (
      <Dropdown
        overlay={
          <Menu onClick={this.handleMenuClick} inlineIndent={0}>
            <MenuItemGroup key="g1" title="Move to...">
              {options.map((item, index) => (
                <Menu.Item key={item.shelf} disabled={book.shelf === item.shelf}>
                  {item.name} &nbsp;
                  {book.shelf === item.shelf && <Icon type="check" />}
                </Menu.Item>
              ))}
            </MenuItemGroup>
          </Menu>
        }
      >
        <Button type="primary" shape="circle" size="small" icon="caret-down" />
      </Dropdown>
    );
  }
}

export default MenuShelf;
