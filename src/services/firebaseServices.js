import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const postArticle = (payload) => {
  if (payload.image) {
    const imageRef = ref(storage, `images/${payload.image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, payload.image);

    const next = function (snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("progress", progress);
      if (snapshot.state === "running") {
        console.log("progress2", progress);
      }
    };
    const error = function (error) {
      console.log(error.code);
    };
    const complete = async function () {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: downloadURL,
        comments: 0,
        description: payload.description,
      });
    };

    uploadTask.on("state_changed", next, error, complete);
  } else if (payload.video) {
    addDoc(collection(db, "articles"), {
      actor: {
        description: payload.user.email,
        title: payload.user.displayName,
        date: payload.timestamp,
        image: payload.user.photoURL,
      },
      video: payload.video,
      sharedImg: "",
      comments: 0,
      description: payload.description,
    });
  }
};
