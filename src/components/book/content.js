import React, { forwardRef } from "react";
import bookpaper from "./img/bookpaper.jpg";
import cover from "./img/cover.jpg";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch } from "react-redux";
import { ResponsiveFontSize } from "@allwqre/react-responsive-font-size";
import { chapter_btn } from "../../api/getBiblePeriodList.js";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";

export const PageCover = forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div
        className="page-content"
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          border: "solid 1px hsl(35, 20%, 70%)",
          overflow: "hidden"
        }}
      ></div>
    </div>
  );
});

export const Page = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="page" ref={ref}>
        <div
          className="page-content"
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bookpaper})`,
            backgroundSize: "cover",
            border: "solid 1px hsl(35, 20%, 70%)",
            overflow: "hidden"
          }}
        >
          {/* <div className="page-image"></div> */}

          <div
            className="d-flex flex-column"
            style={{ width: "100%", height: "100%" }}
          >
            {/* book header */}
            <div>
              <MDBTypography
                className="pt-2 mb-0 page-header text-center"
                tag="h2"
              >
                <MDBTypography tag="strong">{props.CH}</MDBTypography>
              </MDBTypography>
            </div>

            {/* book content */}
            <div className="flex-grow-1 overflow-auto">
              <PerfectScrollbar>
                <MDBTypography className="page-text pt-1 mb-0 text-center">
                  <MDBTypography tag="strong">
                    {props.CS} - {props.CP}
                  </MDBTypography>
                </MDBTypography>

                <MDBContainer>
                  <section>
                    <MDBRow>
                      <MDBCol>
                        {Array.from({ length: props.CN }).map((_, i) => {
                          return chapter_btn(props.CH, props.TP, i, dispatch);
                        })}
                      </MDBCol>
                    </MDBRow>
                  </section>
                </MDBContainer>
              </PerfectScrollbar>
            </div>

            {/* book footer */}
            {props.TP % 2 === 0 ? (
              <div className="page-footer">
                <span className="d-flex justify-content-start">
                  {props.TP + 1}
                </span>
              </div>
            ) : (
              <div className="page-footer">
                <span className="d-flex justify-content-end">
                  {props.TP + 1}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export const PageVerse = forwardRef((props, ref) => {
  return (
    <div>
      <div className="page" ref={ref}>
        <div
          className="page-content"
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bookpaper})`,
            backgroundSize: "cover",
            border: "solid 1px hsl(35, 20%, 70%)",
            overflow: "hidden"
          }}
        >
          {/* <div className="page-image"></div> */}

          <div
            className="d-flex flex-column"
            style={{ width: "100%", height: "100%" }}
          >
            {/* book header */}
            <div>
              <MDBTypography
                className="pt-2 mb-0 page-header text-center"
                tag="h2"
              >
                <MDBTypography tag="strong">
                  {props.topic} - 第{props.chapter}章
                </MDBTypography>
              </MDBTypography>
            </div>

            {/* book content */}
            <div className="flex-grow-1 overflow-auto">
              <ResponsiveFontSize
                ratio={0.08}
                optionsObject={{
                  setFontSize: true,
                  globalVariableName: "--my-variable",
                  lockFontSize: false
                }}
              >
                <PerfectScrollbar>
                  {Object.values(JSON.parse(props.chapterPeriodVerse)).map(
                    (item, i) => {
                      let verseData_key = Object.keys(
                        JSON.parse(props.chapterPeriodVerse)
                      );
                      return (
                        <MDBTypography key={i} className="page-text mb-1">
                          <MDBTypography tag="em">
                            {verseData_key[i]} - {item}
                          </MDBTypography>
                        </MDBTypography>
                      );
                    }
                  )}
                </PerfectScrollbar>
              </ResponsiveFontSize>
            </div>

            {/* book footer */}
            {props.page % 2 === 0 ? (
              <div className="page-footer">
                <span className="d-flex justify-content-start">
                  {props.page + 1}
                </span>
              </div>
            ) : (
              <div className="page-footer">
                <span className="d-flex justify-content-end">
                  {props.page + 1}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
