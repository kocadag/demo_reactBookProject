import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddBookComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            bookName: '',
            writerName: ''
        }
        this.saveBook = this.saveBook.bind(this);
    }

    saveBook = (e) => {
        e.preventDefault();
        let book = {bookName: this.state.bookName, writerName: this.state.writerName};
        ApiService.addBook(book)
            .then(res => {
                this.setState({message : 'Book added successfully.'});
                this.props.history.push('/books');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div>
                <h2 className="text-center">Add Book</h2>
                <form>
                <div className="form-group">
                    <label>Book Name :</label>
                    <input type="text" placeholder="Book Name" name="bookName" className="form-control"
                           value={this.state.bookName} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Writer Name :  </label>
                    <input type="text" placeholder="Writer Name" name="writerName" className="form-control"
                           value={this.state.writerName} onChange={this.onChange}/>
                </div>
                <button className="btn btn-success" onClick={this.saveBook}>Save</button>
            </form>
    </div>
        );
    }
}

export default AddBookComponent;
