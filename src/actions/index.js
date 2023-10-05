//reducer at apiBibleData.js
export const getBibleData = (data) => ({
  type: "GETBIBLE_DATA",
  payload: data
});

export const setBibleChapterPeriod = (data) => ({
  type: "SETBIBLE_CHAPTERPERIOD",
  payload: data
});

//reducer at apiChapterPeriod.js
export const getChapterPeriodData = (data) => ({
  type: "GETCHAPTERPERIOD_DATA",
  payload: data
});
