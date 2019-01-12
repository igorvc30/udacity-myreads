import React, { Component } from "react";
import { getAll, update } from "../api/BooksAPI";
import { Layout, Affix, Button, message } from "antd";
import PanelShelf from "./../components/PanelShelf";
import { Link } from "react-router-dom";

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
    let books = [...this.state.books];
    update(book, shelf)
      .then(
        success => {
            books[index].shelf = shelf,
            this.setState({ books }),
            message.success(`${book.title} has changed to ${shelf} shelf!`);
        },
        error => {
          message.error(`Houston we have a problem! Try again, it will work!`);
        }
      )
      .finally(this.setState({ isLoading: false }));
  };

  render() {
    const { Header, Content, Footer } = Layout;

    const { books, isLoading } = this.state;
    const currentlyReadingList = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToReadList = books.filter(book => book.shelf === "wantToRead");
    const readList = books.filter(book => book.shelf === "read");
    const panelContent = [
      { title: "Currently Reading", booksList: currentlyReadingList },
      { title: "Want to Read", booksList: wantToReadList },
      { title: "Read", booksList: readList }
    ];
    return (
      <Layout className="layout">
        <Header>
          <Link to="/">
            <h2 id="top">MyReads</h2>
          </Link>
        </Header>
        {/* The content inside will be displayed in the order of priority, it can only show one option:
            1st: while fetching data it will display a loading
            2nd: in case the list of books in a shelf is 0, it will display "Shelf is Empty"
            3rd: display the list of books */}
        <Content style={{ padding: "30px 50px 10px 50px" }}>
          {panelContent.map((panel, index) => (
            <PanelShelf
              title={panel.title}
              index={1}
              isLoading={isLoading}
              booksList={panel.booksList}
              updateBookShelf={this.updateBookShelf}
              key={index}
            />
          ))}

          <Affix offsetBottom={80} style={{ position: "absolute", right: 50 }}>
            <Button
              shape="circle"
              size="large"
              icon="plus"
              type="primary"
              onClick={() => {
                console.log("nada");
              }}
            />
          </Affix>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MyReads ©2019 Created by Igor V. Costa
        </Footer>
      </Layout>
    );
  }
}

export default BookManager;
