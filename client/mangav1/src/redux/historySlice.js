import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    list: JSON.parse(localStorage.getItem("history")),
  },
  reducers: {
    updateList: (state, action) => {
      const { href_manga, manga, chapterObj, image } = action.payload;
      const { chapter, href_chapter } = chapterObj;
      const list = state.list;
      //console.log(list)
      if (!list.some((el) => el.manga === manga)) {
        let chapters = list.chapters === undefined ? [] : list.chapters;
        state.list = [
          ...list,
          {
            image: image,
            manga: manga,
            href_manga: href_manga,
            chapters: [...chapters, chapterObj],
          },
        ];
      } else {
        console.log("va0");
        state.list = addItem(list, manga, chapter, href_chapter);
      }
      localStorage.setItem("history", JSON.stringify(state.list));
    },
    deleteItem: (state, action) => {
      const manga = action.payload;

      let list = state.list;
      list = list.filter((el) => {
        if (el.manga !== manga) return el;
      });
      state.list = list;
      localStorage.setItem("history", JSON.stringify(state.list));
    },
  },
});

const addItem = (list, manga, chapter, href_chapter) => {
  list = list.map((item) => {
    if (item.manga === manga) {
      let chapters = item.chapters;
      if (chapters.findIndex((el) => el.chapter === chapter) === -1) {
        chapters = [
          ...chapters,
          {
            chapter: chapter,
            href_chapter: href_chapter,
          },
        ];
      }
      item.chapters = chapters;
    }
    return item;
  });
  return list;
};

export const { updateList, deleteItem } = historySlice.actions;

export default historySlice.reducer;
