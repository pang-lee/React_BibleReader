const ChapterPeriod = (state = [], action) => {
  switch (action.type) {
    case "GETCHAPTERPERIOD_DATA":
      let filter_data = [];
      action.payload.chapterwithperiod.data.map((BCP) => {
        return filter_data.push({
          book: BCP.book,
          chapter: BCP.chapter,
          period: BCP.period,
          num: BCP.num,
          content: BCP.content
        });
      });

      return [
        ...state,
        {
          bid: action.payload.bid,
          chapter: action.payload.chapterwithperiod.data[0].chapter,
          chapterWithPeriod: filter_data
        }
      ];

    default:
      return state;
  }
};

export default ChapterPeriod;
