import React, {Component} from "react";
import PropTypes from "prop-types";
import { Menu, Icon, Dropdown, Button } from "antd";


class MenuShelf extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        updateBookShelf: PropTypes.func.isRequired,
      }
    
      static defaultProps = {
        book: {},
        updateBookShelf: () =>{},
      };
      
    handleMenuClick = (e) => {
        const { book, updateBookShelf } = this.props;
        const { key } = e;
        updateBookShelf(book, key)
      }

  render() {  
    const MenuItemGroup = Menu.ItemGroup;
    const { book } = this.props;
    console.log(JSON.stringify(this.props));
    return  (
        <Dropdown 
            overlay={
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
            }>
            <Button type="primary" shape="circle" size="small" icon="caret-down" />
          </Dropdown>
        
        )
    }
}

export default MenuShelf ;