import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditBookComponent extends Component {

    constructor(props){
        super(props);
        this.state = {value: ''};

        this.saveBook = this.saveBook.bind(this);
        this.loadBook = this.loadBook.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChangeBookName = this.handleChangeBookName.bind(this);
        this.handleChangeWriterName = this.handleChangeWriterName.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
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

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    loadBook() {
        ApiService.fetchBookById(window.localStorage.getItem("bookId"))
            .then((res) => {
                console.log('Bekir getBook : ' + res.data.bookName)
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
        console.log('Bekir saveBook : 1')
        e.preventDefault();
        console.log('Bekir saveBook : 2')
        let book = {id: this.state.id, bookName: this.state.bookName, writerName: this.state.writerName};
        console.log('Bekir saveBook : 3')
        ApiService.editBook(book)
            .then(res => {
                console.log('Bekir saveBook : 4')
                this.setState({message : 'Book added successfully.'});
                this.props.history.push('/books');
            });
        console.log('Bekir saveBook : 5')
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