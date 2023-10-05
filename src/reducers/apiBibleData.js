const bible = (state = [], action) => {
  switch (action.type) {
    case "GETBIBLE_DATA":
      return [
        ...state,
        { book: action.payload, cur_book_id: "", cur_chapter: "" }
      ];

    case "SETBIBLE_CHAPTERPERIOD":
      let new_obj = {
        book: [],
        book_name: "",
        cur_book_id: "",
        cur_chapter: ""
      };

      state.map((BCD) => {
        new_obj.book = BCD.book;
        BCD.book.data.find((element) => {
          if (element.id === Number(action.payload.bookId))
            return (new_obj.book_name = element.name);
          return null;
        });
        new_obj.cur_book_id = String(action.payload.bookId);
        BCD.cur_book_id = String(action.payload.bookId);
        BCD.cur_chapter = action.payload.chapter;
        return (new_obj.cur_chapter = action.payload.chapter);
      });

      return [new_obj];

    default:
      return state;
  }
};

export default bible;
