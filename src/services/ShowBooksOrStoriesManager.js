class ShowBookOrStoriesManager {
  _isBooks = true;

  _isFavoritesBooks = true;

  _isUserBooks = true;

  isShowBooks() {
    return this._isBooks;
  }

  isShowFavoritesBooks() {
    return this._isFavoritesBooks;
  }

  isShowUserBooks() {
    return this._isUserBooks;
  }

  setIsFavoritesBooks(status) {
    this._isFavoritesBooks = status;
  }

  setIsBooks(status) {
    this._isBooks = status;
  }

  setIsUserBooks(status) {
    this._isUserBooks = status;
  }
}

export default new ShowBookOrStoriesManager();
