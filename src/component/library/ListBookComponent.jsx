import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class ListBookComponent extends Component {

    constructor(props) {
        super(props)

        console.log('Datalar 1...');

        this.state = {
            ListBookComponent : [],
            message: null
        }
        this.deleteBook = this.deleteBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.addBook = this.addBook.bind(this);
        this.reloadBookList = this.reloadBookList.bind(this);

        console.log('Datalar 2...');

    }

    async componentDidMount() {
        this.reloadBookList();
    }

    reloadBookList() {
        console.log('Datalar gelecek...');

        ApiService.fetchBooks()
            .then((res) => {
                this.setState({books: res.data.result})
            });

        console.log('Datalar geldi...');
        console.log('Data : ' + this.state.books);
    }

    deleteBook(bookId) {
        ApiService.deleteBook(bookId)
           .then(res => {
               this.setState({message : 'Book deleted successfully.'});
               this.setState({users: this.state.books.filter(book => book.id !== bookId)});
           })

    }

    editBook(id) {
        window.localStorage.setItem("bookId", id);
        this.props.history.push('/edit-book');
    }

    addBook() {
        window.localStorage.removeItem("bookId");
        this.props.history.push('/add-book');
    }

    render() {

        const {ListBookComponent,isLoading} = this.state;

        if(isLoading)
            return (<div>Loading...</div>)

        let rows=
            ListBookComponent.map( book =>
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

        return (
            <div>
                <h2 className="text-center">Book Details</h2>
                <button className="btn btn-danger" style={{width:'100px'}}
                        onClick={() => this.addBook()}> Add Book</button>
                <td>{'Bekir 2' + rows.length + 'ddd'}</td>
                <td>{rows.toString()}</td>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="hidden">|  Id  |</th>
                            <th>|  Book Name  |</th>
                            <th>|  Writer Name  |</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default ListBookComponent;
