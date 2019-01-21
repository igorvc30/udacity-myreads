import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Affix, Button } from 'antd';
import { search } from '../api/BooksAPI';
import { Link } from 'react-router-dom';
import BookList from './../components/BookList';

class SearchBook extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  };

  static defaultProps = {
    myBooks: [],
    updateBookShelf: () => {}
  };

  constructor() {
    super();
    this.timeout = null;
  }

  /**
   * variable emptyText will flag when to show a text, the text will indicate if the page is loading,
   * if there is any result from the query or any error from api
   */
  state = {
    books: [],
    isLoading: false,
    emptyText: '',
    searchText: ''
  };

  componentDidMount() {
    this.setState({
      myBooks: this.props.books
    });
  }

  onInputChange = e => {
    let searchText = e.target.value; // this is the search text
    this.setState({ searchText });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (searchText.trim().length === 0) {
        this.setState({ books: [], emptyText: '' });
      } else {
        this.searchBooks(searchText);
      }
    }, 300);
  };

  searchBooks = query => {
    this.setState({ isLoading: true, emptyText: 'Searching...' });
    search(query)
      .then(
        success => {
          /* if the query found books, the response will be an array, otherwise it will be a object
           * but, ${books} is expected to be an array. Once the state is updated, it will call a method
           * to update the status of all books
           */
          this.setState(
            {
              books: Array.isArray(success) ? success : [],
              emptyText: Array.isArray(success) ? '' : 'Sorry, no book found.'
            },
            this.setMyBooksShelves
          );
        },
        error => {
          this.setState({ emptyText: error.error });
        }
      )
      .finally(this.setState({ isLoading: false }));
  };

  /**
   * All books return from the search will be compare whith the books currently in the shelves.
   * And if a book from the search is currently in any shelf it will have its shelf updated, otherwise
   * it will have its value set to "none"
   */
  setMyBooksShelves() {
    const { myBooks, books } = this.state;
    let tempBooks = [...books];
    for (let i = 0; i < books.length; i++) {
      const found = myBooks.filter(b => books[i].id === b.id);
      if (found[0]) {
        tempBooks[i].shelf = found[0].shelf;
      } else {
        tempBooks[i].shelf = 'none';
      }
      this.setState({ books: tempBooks });
    }
  }

  render() {
    const { books, isLoading, emptyText, searchText } = this.state;
    const { updateBookShelf } = this.props;
    const backToHome = (
      <Link to="/">
        <Icon type="arrow-left" />
      </Link>
    );
    return (
      <div>
        <div>
          <div style={{ marginBottom: 16 }}>
            <Input
              value={searchText}
              addonBefore={backToHome}
              placeholder="Search by title or author"
              size="large"
              onChange={this.onInputChange}
            />
          </div>
        </div>
        {books.length === 0 && <h2>{emptyText}</h2>}
        {books.length > 0 && (
          <BookList
            title="Search Results"
            booksList={books}
            updateBookShelf={updateBookShelf}
            isLoading={isLoading}
          />
        )}

        <Affix offsetBottom={80} style={{ position: 'absolute', right: 50 }}>
          <Link to="/">
            <Button shape="circle" size="large" icon="home" type="primary" />
          </Link>
        </Affix>
      </div>
    );
  }
}

export default SearchBook;
