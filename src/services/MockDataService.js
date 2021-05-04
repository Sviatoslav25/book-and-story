import { bookListFactory } from '../mocks/book';
import { storyListFactory } from '../mocks/story';

class MockDataService {
  constructor() {
    this.bookList = bookListFactory();
    this.storyList = storyListFactory();
  }

  getBooks() {
    return this.bookList;
  }

  getBookById(id) {
    return this.bookList.find((book) => book._id === id);
  }

  getStory() {
    return this.storyList;
  }

  getStoryById(id) {
    return this.storyList.find((story) => story._id === id);
  }
}

export default new MockDataService();
