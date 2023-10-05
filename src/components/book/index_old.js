import React from "react";
import HTMLFlipBook from "react-pageflip";
import bookcover2 from "./img/bookcover2.png";
import { useSelector, useDispatch } from "react-redux";
import * as content from "./content.js";
import * as CBTN from "./functionBtn.js";

const BookContent = () => {
  const bible_cotnet = useSelector((state) => state.apiBibleData);
  const bible_verse = useSelector((state) => state.apiChapterPeriod);
  const dispatch = useDispatch();
  let pageNum = 0;

  const FlipBibleContent = bible_cotnet.map((BF) => {
    if (!BF.cur_book_id) {
      return BF.book.data.map((BC, i) => {
        return (
          <content.Page
            key={i}
            TP={BC.id}
            CH={BC.name}
            CN={BC.numChapters}
            CP={BC.part}
            CS={BC.shortName}
          ></content.Page>
        );
      });
    } else if (BF.cur_book_id) {
      return bible_verse
        .filter((origin) => {
          if (
            Number(BF.cur_book_id) === Number(origin.bid) &&
            BF.cur_chapter === origin.chapter
          ) {
            return true;
          }
          return false;
        })
        .map((BV) => {
          let temp_page = 0;
          let temp_data = {};
          pageNum =
            BV.chapterWithPeriod.length % 5 === 0
              ? BV.chapterWithPeriod.length / 5
              : BV.chapterWithPeriod.length / 5 + 1;
          let perPageVerseData = Array.from({
            length: pageNum
          });

          BV.chapterWithPeriod.map((BVCP, i) => {
            temp_data[`${BVCP.period}`] = BVCP.content;

            if ((i + 1) % 5 === 0) {
              perPageVerseData[temp_page] = temp_data;
              temp_page += 1;
              temp_data = {};
            } else {
              perPageVerseData[temp_page] = temp_data;
            }

            return perPageVerseData;
          });

          return perPageVerseData.map((FBCV, i) => {
            return (
              <content.PageVerse
                key={i}
                page={i}
                topic={BV.chapterWithPeriod[0].book}
                chapter={BV.chapter}
                chapterPeriodVerse={JSON.stringify(FBCV)}
              ></content.PageVerse>
            );
          });
        });
    }
    return null;
  });

  return (
    <div>
      {pageNum === 0 ? null : (
        <CBTN.changeChapter
          dispatch={dispatch}
          biblePageInfo={bible_cotnet}
          biblePagePeriod={bible_verse}
        />
      )}
      <div
        style={{
          backgroundImage: `url(${bookcover2})`,
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      >
        <HTMLFlipBook
          width={300}
          height={293}
          size="stretch"
          showCover={true}
          renderOnlyPageLengthChange={true}
        >
          <content.PageCover />
          {FlipBibleContent}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default BookContent;
