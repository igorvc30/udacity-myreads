import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input, Icon, Affix, Button } from "antd";
import PanelShelf from "./../components/PanelShelf";
import { search } from "../api/BooksAPI";
import { Link } from "react-router-dom";

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

  state = {
    books: null, //null means: not showing the result list and that nothing has been search
    isLoading: false,
    emptyText: ""
  };

  componentDidMount() {
    console.log(this.props.location.state);
    this.setState({
      myBooks: this.props.location.state.myBooks,
      updateBookShelf: this.props.location.state.updateBookShelf
    });
  }

  onInputChange = e => {
    let searchText = e.target.value; // this is the search text
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (searchText.trim().length === 0) {
        this.setState({ books: null });
      } else {
        this.searchBooks(searchText);
      }
    }, 300);
  };

  searchBooks = query => {
    this.setState({ isLoading: true });
    search(query)
      .then(
        success => {
          /* if the query found books, the response will be an array, otherwise it will be a object
           * but, ${books} is expected to be an array. Once the state is updated, it will call a method
           * to update the status of all books
           */
          this.setState(
            { books: Array.isArray(success) ? success : [] },
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
        console.log("%d: %s", i, JSON.stringify(found[0]));
        tempBooks[i].shelf = found[0].shelf;
      } else {
        tempBooks[i].shelf = "none";
      }
      this.setState({ books: tempBooks });
    }
  }

  render() {
    const { books, updateBookShelf, isLoading, emptyText } = this.state;
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
              addonBefore={backToHome}
              placeholder="Search by title or author"
              size="large"
              onChange={this.onInputChange}
            />
          </div>
        </div>
        {books && (
          <PanelShelf
            title="Search Results"
            booksList={books}
            updateBookShelf={updateBookShelf}
            emptyText={
              emptyText.length > 1 ? emptyText : "Sorry, no book found."
            }
            isLoading={isLoading}
            index={0}
          />
        )}
        <Affix offsetBottom={80} style={{ position: "absolute", right: 50 }}>
        <Link to="/">    
          <Button shape="circle" size="large" icon="home" type="primary" />
        </Link>
        </Affix>
      </div>
    );
  }
}

export default SearchBook;
