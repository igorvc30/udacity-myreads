import React, { Component } from 'react';
import { get } from "../api/BooksAPI";

class BookInfo extends Component {

    state = {
        book: {},
        isLoading: true
    }
    
    componentDidMount() {
        const { id } = this.props.match.params;
        get(id).then(books => this.setState({ book, isLoading: false}));
    }

    render() {
        const { book } = this.state;
        return (
            <p>{JSON.stringify(book)}</p>
        )
    }

}

export default BookInfo;
