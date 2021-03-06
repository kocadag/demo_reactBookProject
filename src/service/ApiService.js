import axios from 'axios';

const USER_API_BASE_URL_ALL_LIBRARY = 'http://localhost:8080/library/list';
const USER_API_BASE_URL_ADD_LIBRARY = 'http://localhost:8080/library/add';
const USER_API_BASE_URL_UPDATE_LIBRARY = 'http://localhost:8080/library/update/';
const USER_API_BASE_URL_DELETE_LIBRARY = 'http://localhost:8080/library/delete/';
const USER_API_BASE_URL_CONTROL_CAPTCHA = "http://localhost:8080/library/simple-captcha-endpoint";

class ApiService {

    fetchBooks() {
        return axios.get(USER_API_BASE_URL_ALL_LIBRARY);
    }

    deleteBook(bookId) {
        return axios.delete(USER_API_BASE_URL_DELETE_LIBRARY + bookId);
    }

    fetchBookById(bookId) {
        return axios.get(USER_API_BASE_URL_ALL_LIBRARY + '/' + bookId);
    }

    addBook(book) {
        return axios.post(USER_API_BASE_URL_ADD_LIBRARY, book);
    }

    controlCaptcha(postData) {
        return axios.post(
            USER_API_BASE_URL_CONTROL_CAPTCHA,
            postData, {headers: {'Content-Type': 'application/json; charset=utf-8'}});

    }

    editBook(book) {
        return axios.put(USER_API_BASE_URL_UPDATE_LIBRARY + book.id, book);
    }
}

export default new ApiService();
