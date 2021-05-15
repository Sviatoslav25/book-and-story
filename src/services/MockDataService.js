import { bookFactory, bookListFactory } from '../mocks/book';
import { storyFactory, storyListFactory } from '../mocks/story';

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

  getStories() {
    return this.storyList;
  }

  getStoryById(id) {
    return this.storyList.find((story) => story._id === id);
  }

  createStory() {
    return storyFactory();
  }

  createBook() {
    return bookFactory();
  }
}

export default new MockDataService();
