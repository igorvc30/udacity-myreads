import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spin, Collapse } from "antd";
import BookList from "./BookList";

/* The content inside will be displayed in the order of priority, it can only show one option:
  1st: while fetching data it will display a loading
  2nd: in case the list of books in a shelf is 0, it will display "Shelf is Empty"
  3rd: display the list of books */
class PanelShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    booksList: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  };

  static defaultProps = {
    title: "",
    index: 0,
    isLoading: false,
    booksList: [],
    updateBookShelf: () => {},
    emptyText: "Shelf is empty"
 };

  render() {
    const Panel = Collapse.Panel;
    const { title, index, isLoading, booksList, updateBookShelf, emptyText } = this.props;
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={["0", "1", "2"]}
        loadding={isLoading}
        accordion={false}
      >
        <Panel 
          header={<h2 style={{margin: 0}}>{title}</h2>} 
          key={index} 
          className="shelfside"
          >
          {isLoading ? (
            <div style={{textAlign: 'center', marginBottom: 20}}>
              <Spin size="large" tip="Loading..." />
            </div>
          ) : booksList.length === 0 ? (
            <div className="col-xs-12 shelf">
              <span className="subheader ">{ emptyText }</span>
            </div>
          ) : (
            <BookList booksList={booksList} updateBookShelf={updateBookShelf} />
          )}
        </Panel>
        <div className="shelf" />
      </Collapse>
    );
  }
}

export default PanelShelf;
