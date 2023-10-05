import { getBibleData, getChapterPeriodData } from "../actions/index";
import Swal from "sweetalert2";
import axios from "axios";

const CORS = "https://cors-anywhere.herokuapp.com/";
const baseURL = "https://api.kaaass.net/bible";

export default {
  getBibleBooks: async (dispatch) => {
    try {
      let apiData = await axios.get(`${CORS + baseURL}/books`);
      dispatch(getBibleData(apiData.data));
      return apiData.data;
    } catch (error) {
      console.log("api/unit getbiblebook error", error);
      Swal.fire({
        icon: "error",
        title: "噢噢...",
        text: "請先開啟CORS來獲取文章內文!",
        footer: '<a href="https://cors-anywhere.herokuapp.com/">開啟CORS</a>'
      });
    }
  },
  getBibleChapterAndPeriod: async (dispatch, bid, chapter) => {
    try {
      let chapterWithPeriod = await axios.get(
        `${CORS + baseURL}/content?bid=${bid}&chapter=${chapter}`
      );
      dispatch(
        getChapterPeriodData({
          bid: bid,
          chapterwithperiod: chapterWithPeriod.data
        })
      );
      return chapterWithPeriod.data;
    } catch (error) {
      console.log("api/unit getchapterperiod error", error);
      Swal.fire({
        icon: "error",
        title: "噢噢...",
        text: "出現點技術問題!",
        footer:
          '<a href="https://www.facebook.com/profile.php?id=100063858622383">趕緊聯繫我</a>'
      });
    }
  }
};
