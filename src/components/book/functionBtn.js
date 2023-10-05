import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PerfectScrollbar from "react-perfect-scrollbar";
import { chapter_btn, get_bible_text } from "../../api/getBiblePeriodList.js";
import { setBibleChapterPeriod } from "../../actions/index.js";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTypography
} from "mdb-react-ui-kit";

export const changeChapter = (props) => {
  let count_chapter = () => {
    return props.biblePageInfo[0].book.data.find((element) => {
      return element.name === props.biblePageInfo[0].book_name
        ? element.numChapters
        : null;
    });
  };

  return (
    <div className="d-flex justify-content-center">
      <MDBBtnGroup
        className="mt-2 mb-1 position-relative"
        aria-label="Button group with nested dropdown"
      >
        <MDBBtn
          color="dark"
          onClick={() => {
            if (Number(props.biblePageInfo[0].cur_chapter) - 1 === 0) {
              return Swal.fire({
                icon: "error",
                title: `已經是${props.biblePageInfo[0].book_name}第一章囉!`
              });
            }
            return get_bible_text(
              props.biblePageInfo[0].book_name,
              props.biblePagePeriod[0].bid,
              Number(props.biblePageInfo[0].cur_chapter) - 1,
              props.dispatch
            );
          }}
        >
          {props.biblePageInfo[0].book_name} - 上一章
        </MDBBtn>
        <MDBBtn
          color="dark"
          onClick={() => {
            let maxNumChapter = props.biblePageInfo[0].book.data.find(
              (element) => {
                return element.id === Number(props.biblePageInfo[0].cur_book_id)
                  ? element
                  : null;
              }
            );
            if (
              Number(props.biblePageInfo[0].cur_chapter) + 1 >
              maxNumChapter.numChapters
            ) {
              return Swal.fire({
                icon: "error",
                title: `已經是${props.biblePageInfo[0].book_name}最後一章囉!`
              });
            }
            return get_bible_text(
              props.biblePageInfo[0].book_name,
              props.biblePagePeriod[0].bid,
              Number(props.biblePageInfo[0].cur_chapter) + 1,
              props.dispatch
            );
          }}
        >
          {props.biblePageInfo[0].book_name} - 下一章
        </MDBBtn>
        <MDBBtnGroup>
          <MDBDropdown>
            <MDBDropdownToggle color="dark"></MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem
                link
                onClick={() => {
                  props.dispatch(
                    setBibleChapterPeriod({
                      bookId: "",
                      chapter: ""
                    })
                  );
                }}
              >
                <p className="pt-3 fw-normal text-center">聖經目錄</p>
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                onClick={() => {
                  const MySwal = withReactContent(Swal);
                  MySwal.fire({
                    showConfirmButton: false,
                    showCloseButton: true,
                    html: (
                      <PerfectScrollbar>
                        <MDBTypography className="page-text pt-1 mb-0 text-center">
                          <MDBTypography tag="strong">
                            {props.biblePageInfo[0].book_name}
                          </MDBTypography>
                        </MDBTypography>

                        <MDBContainer>
                          <section>
                            <MDBRow>
                              <MDBCol>
                                {Array.from({
                                  length: count_chapter().numChapters
                                }).map((_, i) => {
                                  return chapter_btn(
                                    props.biblePageInfo[0].book_name,
                                    props.biblePageInfo[0].cur_book_id,
                                    i,
                                    props.dispatch
                                  );
                                })}
                              </MDBCol>
                            </MDBRow>
                          </section>
                        </MDBContainer>
                      </PerfectScrollbar>
                    )
                  });
                }}
              >
                <p className="pt-3 fw-normal text-center">其餘章節</p>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBBtnGroup>
      </MDBBtnGroup>
    </div>
  );
};
