import { Fragment, useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { serverTimestamp } from "../firebase";
import { postArticle } from "../services/firebaseServices";
import { setLoading } from "../redux/actions";

function PostModal({ setShowModal }) {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setVideoLink("");
    setShareImage(image);
  };
  const switchAssetArea = (area) => {
    setVideoLink("");
    setShareImage("");
    setAssetArea(area);
  };

  const handleModalClose = (e) => {
    setEditorText("");
    setAssetArea("");
    setVideoLink("");
    setShareImage("");
    setShowModal(false);
  };

  const handlePosting = () => {
    setShowModal(false);
    dispatch(setLoading(true));
    const payload = {
      user: user,
      image: shareImage,
      video: videoLink,
      description: editorText,
      timestamp: serverTimestamp(),
    };
    // post to firebase
    postArticle(payload);
  };
  return (
    <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button onClick={handleModalClose}>
            <img src="/images/close-icon.svg" alt="close icon" />
          </button>
        </Header>

        <SharedContent>
          <UserInfo>
            {user && user.photoURL ? (
              <img src={`${user.photoURL}`} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}

            <span>Name</span>
          </UserInfo>

          <Editor>
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="What do you want to talk about?"
              autoFocus
            />
            {assetArea === "image" && (
              <UploadImage>
                <input
                  type="file"
                  id="file"
                  name="image"
                  accept="image/gif , image/jpg , image/png"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="file">Select an image to share</label>
                {shareImage && (
                  <img
                    src={URL.createObjectURL(shareImage)}
                    alt="shared post"
                  />
                )}
              </UploadImage>
            )}
            {assetArea === "video" && (
              <Fragment>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Please input a video link"
                  value={videoLink}
                  onChange={(e) => {
                    setShareImage("");
                    setVideoLink(e.target.value);
                  }}
                />
                {videoLink && (
                  <ReactPlayer width={"100%"} height={"auto"} url={videoLink} />
                )}
              </Fragment>
            )}
          </Editor>
        </SharedContent>

        <SharedCreation>
          <AttachAssets>
            <AssetButton id="image" onClick={() => switchAssetArea("image")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z" />
              </svg>
            </AssetButton>
            <AssetButton id="video" onClick={() => switchAssetArea("video")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z" />
              </svg>
            </AssetButton>
          </AttachAssets>
          <ShareComment>
            <AssetButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
              >
                <path d="M256 31.1c-141.4 0-255.1 93.12-255.1 208c0 49.62 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734c1.249 3 4.021 4.766 7.271 4.766c66.25 0 115.1-31.76 140.6-51.39c32.63 12.25 69.02 19.39 107.4 19.39c141.4 0 255.1-93.13 255.1-207.1S397.4 31.1 256 31.1zM127.1 271.1c-17.75 0-32-14.25-32-31.1s14.25-32 32-32s32 14.25 32 32S145.7 271.1 127.1 271.1zM256 271.1c-17.75 0-31.1-14.25-31.1-31.1s14.25-32 31.1-32s31.1 14.25 31.1 32S273.8 271.1 256 271.1zM383.1 271.1c-17.75 0-32-14.25-32-31.1s14.25-32 32-32s32 14.25 32 32S401.7 271.1 383.1 271.1z" />
              </svg>
              Anyone
            </AssetButton>
          </ShareComment>

          <PostButton disabled={!editorText} onClick={handlePosting}>
            post
          </PostButton>
        </SharedCreation>
      </Content>
    </Container>
  );
}
const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 550px;
  margin: auto;
  margin-top: 3rem;
  background-color: white;
  max-height: 80%;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.header`
  padding: 1rem 1.5rem;
  color: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SharedContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  span {
    font-weight: 600;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.5rem 0.75rem 1rem;
`;

const AttachAssets = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const AssetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    width: 2rem;
    height: 2rem;
    fill: rgba(0, 0, 0, 0.6);
  }
`;
const ShareComment = styled.div`
  margin-right: auto;
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
`;

const PostButton = styled.button`
  background-color: #0a66c2;
  color: #fff;
  border-radius: 1.5rem;
  padding: 0.6rem 1.2rem;
  transition: 0.2s;
  &:hover {
    background-color: #004182;
  }
  &:disabled {
    background-color: gray;
    cursor: default;
  }
`;

const Editor = styled.div`
  padding: 0.75rem 1.5rem;

  textarea {
    width: 100%;
    min-height: 6.5rem;
    resize: none;
    padding: 0.25rem;
  }
  input {
    height: 35px;
    width: 100%;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    max-height: 14rem;
    max-width: 80%;
    display: block;
    margin: auto;
  }
`;
export default PostModal;
