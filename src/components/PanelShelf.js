import React from "react";
import PropTypes from "prop-types";
import { Spin, Collapse } from "antd";
import BookList from "./BookList";


const PanelShelf = props => {
  const Panel = Collapse.Panel;
  const { title, index, isLoading, booksList, updateBookShelf } = props;
  return (
    <Collapse bordered={false} defaultActiveKey={["1"]} loadding={isLoading}>
      <Panel header={title} key={index}>
        {isLoading ? (
          <Spin size="large" tip="Loading..." />
        ) : booksList.length === 0 ? (
          <div className="col-xs-12 shelf">
            <h3>Shelf is empty </h3>
          </div>
        ) : (
          <BookList books={booksList} updateBookShelf={updateBookShelf} />
        )}
      </Panel>
    </Collapse>
  );
};

PanelShelf.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  booksList: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired
};

export default PanelShelf;
