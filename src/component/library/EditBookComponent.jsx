import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import {confirmAlert} from "react-confirm-alert";

class EditBookComponent extends Component {

    constructor(props){
        super(props);
        this.state = {value: ''};

        this.saveBook = this.saveBook.bind(this);
        this.loadBook = this.loadBook.bind(this);

        this.handleChangeBookName = this.handleChangeBookName.bind(this);
        this.handleChangeWriterName = this.handleChangeWriterName.bind(this);
    }

    handleChangeBookName(event) {
        this.state.bookName = event.target.value;
    }

    handleChangeWriterName(event) {
        this.state.writerName = event.target.value;
    }

    componentDidMount() {
        this.loadBook();
    }

    loadBook() {
        ApiService.fetchBookById(window.localStorage.getItem("bookId"))
            .then((res) => {
                let book = res;
                this.setState({
                    id: book.data.id,
                    bookName: book.data.bookName,
                    writerName: book.data.writerName,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveBook = (e) => {
        e.preventDefault();
        if (this.state.bookName === '' || this.state.writerName === '') {
            alert("Book Name and Writer Name must be write...");
        } else {
            let book = {id: this.state.id, bookName: this.state.bookName, writerName: this.state.writerName};
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you wish to UPDATE this item?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => ApiService.editBook(book)
                            .then(res => {
                                this.setState({message: 'Book Updated successfully.'});
                                this.props.history.push('/books');
                            }).then(res => {
                                alert("Book Updated successfully");
                            })
                    },
                    {
                        label: 'No',
                        onClick: () => alert('Updated Operation Canceled...')
                    }
                ]
            });
        }
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Book</h2>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Book Id:</label>
                        <input type="text"
                               placeholder="id"
                               name="id"
                               className="form-control"
                               defaultValue={this.state.id}
                               readOnly="True"/>
                    </div>

                    <div className="form-group">
                        <label>Book Name:</label>
                        <input type="text"
                               placeholder="bookname"
                               name="bookname"
                               className="form-control"
                               onChange={this.handleChangeBookName}
                               defaultValue={this.state.bookName}/>
                    </div>

                    <div className="form-group">
                        <label>Writer Name:</label>
                        <input type="text"
                               placeholder="writername"
                               name="writername"
                               className="form-control"
                               onChange={this.handleChangeWriterName}
                               defaultValue={this.state.writerName}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveBook}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditBookComponent;