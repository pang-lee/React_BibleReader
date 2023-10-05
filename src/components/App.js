import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BookContent from "./book/index.js";
import util from "../api/units.js";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let find_bibleData = JSON.parse(localStorage.getItem("persist:root"));
    if (!find_bibleData || !JSON.parse(find_bibleData.apiBibleData).length) {
      util.getBibleBooks(dispatch);
    }
  }, [dispatch]);

  return (
    <div>
      <BookContent />
    </div>
  );
};
