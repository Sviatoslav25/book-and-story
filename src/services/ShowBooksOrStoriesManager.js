class ShowBookOrStoriesManager {
  _isBooks = true;

  isShowBooks() {
    return this._isBooks;
  }

  setIsBooks(status) {
    this._isBooks = status;
  }
}

export default new ShowBookOrStoriesManager();
