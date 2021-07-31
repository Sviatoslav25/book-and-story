class ShowBookOrStoriesManager {
  _isBooks = true;

  _isFavoritesBooks = true;

  isShowBooks() {
    return this._isBooks;
  }

  isShowFavoritesBooks() {
    return this._isFavoritesBooks;
  }

  setIsFavoritesBooks(status) {
    this._isFavoritesBooks = status;
  }

  setIsBooks(status) {
    this._isBooks = status;
  }
}

export default new ShowBookOrStoriesManager();
