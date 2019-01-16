import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Collapse, Affix, Button } from 'antd';
import { Link } from 'react-router-dom';
import BookList from '../components/BookList';

/* The content inside will be displayed in the order of priority, it can only show one option:
  1st: while fetching data it will display a loading
  2nd: in case the list of books in a shelf is 0, it will display "Shelf is Empty"
  3rd: display the list of books */
class MyShelves extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    books: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  };

  static defaultProps = {
    isLoading: false,
    books: [],
    updateBookShelf: () => {}
  };

  render() {
    const Panel = Collapse.Panel;
    const { books, isLoading, updateBookShelf } = this.props;

    const currentlyReadingList = books.filter(book => book.shelf === 'currentlyReading');
    const wantToReadList = books.filter(book => book.shelf === 'wantToRead');
    const readList = books.filter(book => book.shelf === 'read');
    const shelvesContent = [
      { title: 'Currently Reading', booksList: currentlyReadingList },
      { title: 'Want to Read', booksList: wantToReadList },
      { title: 'Read', booksList: readList }
    ];
    return (
      <div>
        <Collapse bordered={false} defaultActiveKey={['0', '1', '2']} loadding={isLoading}>
          {shelvesContent.map((shelf, index) => (
            <Panel
              header={<h2 style={{ margin: 0 }}>{shelf.title}</h2>}
              key={index}
              className="shelfside"
            >
              {isLoading ? (
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <Spin size="large" tip="Loading..." />
                </div>
              ) : shelf.booksList.length === 0 ? (
                <div className="col-xs-12 shelf">
                  <span className="subheader ">Shelf is empty.</span>
                </div>
              ) : (
                <BookList booksList={shelf.booksList} updateBookShelf={updateBookShelf} />
              )}
              {/* Here is a code for style as a shelf, its throwing many error on console.  */}
              <div className="shelf" />
            </Panel>
          ))}
        </Collapse>
        <Affix offsetBottom={80} style={{ position: 'absolute', right: 50 }}>
          <Link to="/search">
            <Button shape="circle" size="large" icon="plus" type="primary" />
          </Link>
        </Affix>
      </div>
    );
  }
}

export default MyShelves;
