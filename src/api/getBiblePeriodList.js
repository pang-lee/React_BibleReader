import util from "./units";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MDBBtn, MDBTypography } from "mdb-react-ui-kit";
import { setBibleChapterPeriod } from "../actions/index";

export const get_bible_text = async (book, bid, chapter, dispatch) => {
  let storage_bibleText = JSON.parse(localStorage.getItem("persist:root"));
  let find_bible = JSON.parse(storage_bibleText.apiChapterPeriod);

  let theTextInStorage = {};
  const MySwal = withReactContent(Swal);

  find_bible.map((BD) => {
    if (Number(bid) === BD.bid) {
      if (chapter === Number(BD.chapter)) {
        return (theTextInStorage = BD);
      }
    }
    return null;
  });

  if (Object.keys(theTextInStorage).length === 0) {
    await Swal.fire({
      title: `正在獲取${book}-第${chapter}章`,
      icon: "info",
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      showCloseButton: true,
      willOpen: async () => {
        Swal.showLoading();
        try {
          let BP_data = await util.getBibleChapterAndPeriod(
            dispatch,
            bid,
            chapter
          );
          theTextInStorage = {
            chapterWithPeriod: BP_data.data
          };
          Swal.hideLoading();
          Swal.close();
        } catch (error) {
          console.log("chapter period in content.js err", error);
          return Swal.fire({
            icon: "error",
            title: "噢噢...",
            text: "看來小節經文出現點技術問題!",
            footer:
              '<a href="https://www.facebook.com/profile.php?id=100063858622383">趕緊聯繫我</a>'
          });
        }
      }
    });
  }

  const bible_period = theTextInStorage.chapterWithPeriod.map((BCT, i) => {
    return (
      <MDBBtn
        key={i}
        onClick={() => {
          dispatch(
            setBibleChapterPeriod({
              bookId: bid,
              chapter: BCT.chapter
            })
          );
        }}
        outline
        color="info"
        floating
        className="m-1"
        role="button"
      >
        <MDBTypography
          tag="h6"
          className="fst-italic"
          style={{
            marginRight: "10%",
            marginTop: "12%"
          }}
        >
          {BCT.period}
        </MDBTypography>
      </MDBBtn>
    );
  });

  MySwal.fire({
    showCloseButton: true,
    allowOutsideClick: false,
    html: (
      <div>
        <MDBTypography tag="h1">
          {book} - 第{chapter}章
        </MDBTypography>
        {bible_period}
      </div>
    )
  });
};

export const chapter_btn = (book, bid, i, dispatch) => {
  return (
    <MDBBtn
      key={i}
      onClick={() => get_bible_text(book, bid, i + 1, dispatch)}
      outline
      color="warning"
      floating
      className="m-1"
      role="button"
    >
      <MDBTypography
        tag="h6"
        className="fst-italic"
        style={{
          marginRight: "10%",
          marginTop: "12%"
        }}
      >
        {i + 1}
      </MDBTypography>
    </MDBBtn>
  );
};
