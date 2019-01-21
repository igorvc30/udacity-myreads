import React, { Component } from 'react';
import { getAll, update } from '../api/BooksAPI';
import { message } from 'antd';
import MyShelves from './MyShelves';
import SearchBook from './../screens/SearchBook';
import BookInfo from './../screens/BookInfo';

import { Route, Switch } from 'react-router-dom';

class BookManager extends Component {
  state = {
    books: [],
    isLoading: true
  };

  componentDidMount() {
    getAll().then(books => this.setState({ books, isLoading: false }));
  }

  /** When user changes the shelf of a book, it will send a request, and after the request it will
   * update the state, and therefore update the book shelves.
   * To update the state of the object, the index of it was found so that the book inside of it could
   * have its data altered inside of state, and finaly trigger the rendering to update the shelves.
   * Solution found at https://stackoverflow.com/questions/45878147/how-to-update-an-object-in-an-array-of-objects-using-setstate
   * If the API request is successful the state of the book will be update to the new shelf and a
   * notification will apear, in case o error a notification will apear and once the promise is solve
   * the loading state will be changed to false
   */
  updateBookShelf = (book, shelf) => {
    this.setState({ isLoading: true });

    const index = this.state.books.findIndex(b => b.id === book.id);
    // https://stackoverflow.com/questions/42844535/how-to-update-react-state-array-of-objects
    let books = this.state.books.map(b => Object.assign({}, b));


    update(book, shelf)
      .then(
        success => {
          //if the book is already at any shelf it will be update at books state, 
          //otherwise it will be inserted at books state
          if (index >= 0) {
            books[index] = {...book, shelf};
          } else {
            book.shelf = shelf;
            books = [...books, book];
          }
          this.setState({ books },() => message.success(`${book.title} has changed to ${shelf} shelf!`));
        },
        error => {
          message.error(`Houston we have a problem! Try again soon!`);
        }
      )
      .finally(this.setState({ isLoading: false }));
  };

  render() {
    const { books, isLoading } = this.state;

    return (
      <Switch>
        <Route
          name="Home"
          path="/"
          exact={true}
          render={() => (
            <MyShelves books={books} isLoading={isLoading} updateBookShelf={this.updateBookShelf} />
          )}
        />

        <Route
          name="Search"
          path="/search"
          exact={true}
          component={() => (
            <SearchBook
              books={books}
              isLoading={isLoading}
              updateBookShelf={this.updateBookShelf}
            />
          )}
        />
        {/* https://stackoverflow.com/questions/35352638/how-to-get-parameter-value-from-query-string */}
        <Route
          name="Information"
          path="/info/:id"
          exact={true}
          component={props => <BookInfo updateBookShelf={this.updateBookShelf} {...props} />}
        />
        <Route
          render={() => (
            <MyShelves books={books} isLoading={isLoading} updateBookShelf={this.updateBookShelf} />
          )}
        />
      </Switch>
    );
  }
}

export default BookManager;
