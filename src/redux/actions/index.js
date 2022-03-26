import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { SET_ARTICLES, SET_LOADING_STATUS, SET_USER } from "./actionType";

export function setUser(user) {
  return { type: SET_USER, payload: user };
}

export function setLoading(status) {
  return { type: SET_LOADING_STATUS, payload: status };
}
export const setArticles = () => (dispatch) => {
  let articles;
  const q = query(collection(db, "articles"), orderBy("actor.date", "desc"));

  onSnapshot(q, (querySnapshot) => {
    articles = querySnapshot.docs.map((doc) => doc.data());
    dispatch(setLoading(false));
    dispatch({ type: SET_ARTICLES, payload: articles });
  });
};
