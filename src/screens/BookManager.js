import React, { Component } from "react";
import { getAll, update } from "../api/BooksAPI";
import { Collapse, Layout, Affix, Button, Spin } from "antd";
import BookList from "./../components/BookList";
import { Link } from 'react-router-dom'

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
   * Solution found at https://stackoverflow.com/questions/45878147/how-to-update-an-object-in-an-array-of-objects-using-setstate */
  updateBookShelf = (book, shelf) => {
    this.setState({ isLoading: true });
    const index = this.state.books.findIndex(b => b.id === book.id);
    let books = [...this.state.books];
    books[index].shelf = shelf;
    update(book, shelf).then(this.setState({ books, isLoading: false }));
  };

  render() {
    const Panel = Collapse.Panel;
    const { Header, Content, Footer } = Layout;

    const { books } = this.state;
    const currentlyReadingList = books.filter(
      book => book.shelf === "currentlyReading"
    );
    const wantToReadList = books.filter(book => book.shelf === "wantToRead");
    const readList = books.filter(book => book.shelf === "read");
    return (
      <Layout className="layout">
        <Header>
        <Link to="/"><h2 id="top">MyReads</h2></Link>
        </Header>
        {/* The content inside will be displayed in the order of priority, it can only show one option:
            1st: while fetching data it will display a loading
            2nd: in case the list of books in a shelf is 0, it will display "Shelf is Empty"
            3rd: display the list of books */}
        <Content style={{ padding: "30px 50px 10px 50px" }}>
          <Collapse bordered={false} defaultActiveKey={["1"]} loadding>
            <Panel header="Currently Reading" key="1">
              {this.state.isLoading ? (
                <Spin size="large" tip="Loading..." />
              ) : currentlyReadingList.length === 0 ? (
                <div className="col-xs-12 shelf">
                  <h3>Shelf is empty </h3>
                </div>
              ) : (
                <BookList
                  books={currentlyReadingList}
                  updateBookShelf={this.updateBookShelf}
                />
              )}
            </Panel>

            <Panel header="Want To Read" key="2">
              {this.state.isLoading ? (
                <Spin size="large" tip="Loading..." />
              ) : wantToReadList.length === 0 ? (
                <div className="col-xs-12 shelf">
                  <h3>Shelf is empty </h3>
                </div>
              ) : (
                <BookList
                  books={wantToReadList}
                  updateBookShelf={this.updateBookShelf}
                />
              )}
            </Panel>
            <Panel header="Read" key="3">
              {this.state.isLoading ? (
                <Spin size="large" tip="Loading..." />
              ) : readList.length === 0 ? (
                <div className="col-xs-12 shelf">
                  <h3>Shelf is empty </h3>
                </div>
              ) : (
                <BookList
                  books={readList}
                  updateBookShelf={this.updateBookShelf}
                />
              )}
            </Panel>
          </Collapse>
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
