import { bookFactory, dataForBookFromForm } from '../mocks/book';
import { dataForStoryFromForm, storyFactory } from '../mocks/story';

class MockDataService {
  constructor() {
    this.bookList = [];
    this.storyList = [];
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
    const story = storyFactory();
    this.storyList = [story, ...this.storyList];
    return story;
  }

  createStoryFromForm(storyData) {
    const story = { ...storyData, ...dataForStoryFromForm() };
    this.storyList = [story, ...this.storyList];
  }

  createBookFromForm(bookData) {
    const book = { ...bookData, ...dataForBookFromForm() };
    this.bookList = [book, ...this.bookList];
  }

  createBook() {
    const book = bookFactory();
    this.bookList = [book, ...this.bookList];
    return book;
  }
}

export default new MockDataService();
