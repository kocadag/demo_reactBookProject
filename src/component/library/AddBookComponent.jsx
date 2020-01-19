import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import { Captcha, captchaSettings } from 'reactjs-captcha';
import axios from 'axios';
import {confirmAlert} from "react-confirm-alert";


class AddBookComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            bookName: '',
            writerName: ''
        }

        captchaSettings.set({
            captchaEndpoint:
                'http://localhost:8080/simple-captcha-endpoint'
        });

        this.saveBook = this.saveBook.bind(this);
    }

    returnMainPage = (e) => {
        e.preventDefault();
        this.props.history.push('/books')
    }

    saveBook = (e) => {
        e.preventDefault();
        if (this.state.bookName === '' || this.state.writerName === '') {
            alert("Book Name and Writer Name must be write...");
        } else {
            let book = {bookName: this.state.bookName, writerName: this.state.writerName};
            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you wish to ADD this item?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => ApiService.addBook(book)
                            .then(res => {
                                this.setState({message : 'Book added successfully.'});
                                this.props.history.push('/books');
                            }).then(res => {
                                alert("Book Added successfully");
                            })
                    },
                    {
                        label: 'No',
                        onClick: () => alert('Added Operation Canceled...')
                    }
                ]
            });
        }

    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    // process the yourFormWithCaptcha on submit event
    yourFormWithCaptchaOnSubmitHandler(event) {

        // the user-entered captcha code value to be validated at the backend side
        let userEnteredCaptchaCode = this.captcha.getUserEnteredCaptchaCode();

        // the id of a captcha instance that the user tried to solve
        let captchaId = this.captcha.getCaptchaId();

        let postData = {
            userEnteredCaptchaCode: userEnteredCaptchaCode,
            captchaId: captchaId
        };

        let self = this;

        // post the captcha data to the /your-app-backend-path on your backend.
        // make sure you import the axios in this view with: import axios from 'axios';
        ApiService.controlCaptcha(postData)
            .then(response => {
                if (response.data.success == false) {
                    // captcha validation failed; reload image
                    self.captcha.reloadImage();
                    // maybe display an error message, too
                } else {
                    // captcha validation succeeded; proceed with your workflow
                }
            });

        event.preventDefault();
    }

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
                    <button className="btn btn-success" onClick={this.returnMainPage}>Main Page</button>

                    <section id="main-content">
                        <form id="yourFormWithCaptchaForm" method="POST"
                              onSubmit={this.yourFormWithCaptchaOnSubmitHandler.bind(this)}>

                            {/* captcha challenge: placeholder */}
                            <Captcha captchaStyleName="yourFirstCaptchaStyle"
                                     ref={(captcha) => {this.captcha = captcha}} />
                            <label>
                                <span>Retype the characters from the picture: (don't run this captch)</span>
                                {/* captcha code: user-input textbox */}
                                <input id="yourFirstCaptchaUserInput" type="text"/>
                            </label>

                            <button type="submit" id="submitButton" disabled={true}>Validate</button>
                        </form>
                    </section>
                </form>
            </div>
        );
    }
}

export default AddBookComponent;
