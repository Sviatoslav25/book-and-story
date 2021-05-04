import { bookListFactory } from '../mocks/book';

class MockDataService {
  constructor() {
    this.bookList = bookListFactory();
  }

  getBooks() {
    return this.bookList;
  }

  getBookById(id) {
    return this.bookList.find((book) => book._id === id);
  }
}

export default new MockDataService();
