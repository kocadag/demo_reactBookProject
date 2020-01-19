import React, { Component} from 'react';
import ApiService from "../../service/ApiService";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ListBookComponent extends Component {

    constructor(props) {
        super(props)
        console.log('...');
        this.state = {
            books : null,
            message: null
        }
        this.deleteBook = this.deleteBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.addBook = this.addBook.bind(this);
        this.reloadBookList = this.reloadBookList.bind(this);
    }

    componentDidMount() {
        this.reloadBookList();
    }

    reloadBookList() {
        ApiService.fetchBooks()
            .then((res) => {
                console.log(res)
                this.setState({books: res.data})
            });
    }

    deleteBook(bookId) {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you wish to DELETE this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>  ApiService.deleteBook(bookId)
                        .then(res => {
                            this.setState({message : 'Book deleted successfully.'});
                            this.setState({books: this.state.books.filter(book => book.id !== bookId)});
                        }).then(res => {alert('Book deleted successfully...')})
                },
                {
                    label: 'No',
                    onClick: () => alert('Delete Operation Canceled...')
                }
            ]
        });


    }

    editBook(bookId) {
        window.localStorage.setItem("bookId", bookId);
        this.props.history.push('/edit-book');
    }

    addBook() {
        window.localStorage.removeItem("bookId");
        this.props.history.push('/add-book');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Book Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}} onClick={() => this.addBook()}>Add Book</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>|  Book Name  |</th>
                            <th>|  Writer Name  |</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.books
                        && this.state.books.length > 0
                        && this.state.books.map(
                            book =>
                                <tr key={book.id}>
                                    <td>{book.bookName}</td>
                                    <td>{book.writerName}</td>
                                    <td>
                                        <button className="btn btn-success"
                                                onClick={() => this.deleteBook(book.id)}> Delete</button>
                                        <button className="btn btn-success"
                                                onClick={() => this.editBook(book.id)}
                                                style={{marginLeft: '20px'}}> Edit</button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ListBookComponent;