import { combineReducers } from "redux";
import apiBibleData from "./apiBibleData";
import apiChapterPeriod from "./apiChapterPeriod";

export default combineReducers({
  apiBibleData,
  apiChapterPeriod
});
