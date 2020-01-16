import axios from 'axios';

const USER_API_BASE_URL_ALL_LIBRARY = 'http://localhost:8080/library/list';
const USER_API_BASE_URL_ADD_LIBRARY = 'http://localhost:8080/library/add';
const USER_API_BASE_URL_ONE_LIBRARY = 'http://localhost:8080/library/list/';
const USER_API_BASE_URL_UPDATE_LIBRARY = 'http://localhost:8080/library/update/';
const USER_API_BASE_URL_DELETE_LIBRARY = 'http://localhost:8080/library/delete/';


class ApiService {

    fetchBooks() {
        console.log("Bekirrr");
        return axios.get(USER_API_BASE_URL_ALL_LIBRARY);
    }

    deleteBook(bookId) {

        /*
        return axios.delete(USER_API_BASE_URL_DELETE_LIBRARY + bookId, {
            params: {
                id: bookId
            }
        }).then(obj => {
            console.log(obj.data);
        });

        return axios.delete(USER_API_BASE_URL_DELETE_LIBRARY + bookId, {
            headers: {
                Authorization: "Bekir"
            },
            data: {
                source: bookId
            }
        });
*/
        console.log("Bekirrr delete");

        return axios.delete('USER_API_BASE_URL_DELETE_LIBRARY' + {bookId});

        // return axios.delete(USER_API_BASE_URL_DELETE_LIBRARY + bookId);
    }

    fetchBookById(bookId) {

        return axios.get(USER_API_BASE_URL_ONE_LIBRARY, {
            params: {
                id: bookId
            }
        }).then(obj => {
            console.log(obj.data);
        });

        //return axios.get(USER_API_BASE_URL_ONE_LIBRARY + bookId);
    }

    addBook(book) {

        return axios.post(USER_API_BASE_URL_ADD_LIBRARY, {
            data: {
                id: book
            }
        }).then(obj => {
            console.log("Bekir ekleme");
            console.log(obj.data);
        });

        //return axios.post(USER_API_BASE_URL_ADD_LIBRARY, book);
    }

    editBook(book) {



        return axios.put(USER_API_BASE_URL_UPDATE_LIBRARY + book.id, book);
    }

}

export default new ApiService();
