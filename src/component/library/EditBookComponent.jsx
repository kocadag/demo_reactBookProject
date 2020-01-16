import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class EditBookComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            books : null,
            message: null
        }
        this.saveBook = this.saveBook.bind(this);
        this.loadBook = this.loadBook.bind(this);
    }

    componentDidMount() {
        this.loadBook();
    }

    loadBook() {
        ApiService.fetchBookById(window.localStorage.getItem(this.state.id))
            .then((res) => {
                let book =this.state;
                this.setState({
                id: book.id,
                bookName: book.bookName,
                writerName: book.writerName,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveBook = (e) => {
        e.preventDefault();
        let book = {id: this.state.id, bookName: this.state.bookName, writerName: this.state.writerName};
        ApiService.editBook(book)
            .then(res => {
                this.setState({message : 'Book added successfully.'});
                this.props.history.push('/books');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit Book</h2>
                <form>

                    <div className="form-group">
                        <label>Book Name:</label>
                        <input type="text" placeholder="Book Name" name="bookname"
                               className="form-control" readonly="true"
                               defaultValue={this.state.bookName}/>
                    </div>

                    <div className="form-group">
                        <label>Writer Name:</label>
                        <input placeholder="Writer Name" name="writerName"
                               className="form-control" value={this.state.writerName}
                               onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveBook}>Save</button>
                </form>
            </div>
        );
    }
}

export default EditBookComponent;
