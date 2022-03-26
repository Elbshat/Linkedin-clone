import { useState, Fragment, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setArticles } from "../redux/actions";
import { getArticles } from "../services/firebaseServices";
import PostModal from "./PostModal";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.userAuth);
  const { loading, articles } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setArticles());
  }, [dispatch]);

  const handleModalShow = (e) => {
    if (e.target !== e.currentTarget) return;
    setShowModal((prevState) => !prevState);
  };
  return (
    <Container>
      <ShareBox>
        <div>
          {user && user.photoURL ? (
            <img src={`${user.photoURL}`} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}

          <button onClick={handleModalShow} disabled={loading}>
            Start a post
          </button>
        </div>

        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="icon" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="icon" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="icon" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="icon" />
            <span>Article</span>
          </button>
        </div>
      </ShareBox>

      <Content>
        {loading && <img src="/images/spinner.svg" alt="loader" />}
        {articles &&
          articles.map((article, i) => (
            <Article key={i}>
              <SharedActor>
                <a>
                  <img src={article.actor.image} alt="user" />
                  <div>
                    <span>{article.actor.title}</span>
                    <span>{article.actor.description}</span>
                    <span>
                      {article.actor.date &&
                        new Date(
                          article.actor.date.seconds * 1000
                        ).toLocaleString()}
                    </span>
                  </div>
                </a>
                <button>
                  <img src="/images/ellipsis.svg" alt="ellipsis" />
                </button>
              </SharedActor>
              <Description>{article.description}</Description>
              <SharedImg>
                <a>
                  {article.sharedImg && (
                    <img src={article.sharedImg} alt="shared" />
                  )}

                  {article.video && (
                    <ReactPlayer url={article.video} width={"100%"} />
                  )}
                </a>
              </SharedImg>
              <SocialCounts>
                <li>
                  <button>
                    <span>75</span>
                    <img src="/images/like.svg" alt="like" />
                    <img src="/images/clapping.svg" alt="clapping" />
                  </button>
                </li>
                <li>
                  <a>{`${article.comments} comment`} </a>
                </li>
              </SocialCounts>
              <SocialActions>
                <button>
                  <img src="/images/like.svg" alt="like icon" />
                  <span>Like</span>
                </button>
                <button>
                  <img src="/images/comment.svg" alt="comment icon" />
                  <span>Comments</span>
                </button>
                <button>
                  <img src="/images/share.svg" alt="comment icon" />
                  <span>Share</span>
                </button>
                <button>
                  <img src="/images/sent.svg" alt="comment icon" />
                  <span>Send</span>
                </button>
              </SocialActions>
            </Article>
          ))}
      </Content>
      {showModal && <PostModal setShowModal={setShowModal} />}
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 2rem;
  }
`;

const CommonCard = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  margin-bottom: 8px;
  text-align: center;

  position: relative;
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;

  div {
    button {
      color: rgb(0, 0, 0, 0.6);
      font-size: 14px;
      background-color: transparent;
      font-size: 600;
      display: inline-flex;
      align-items: center;

      img {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 0.25rem;
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      img {
        width: 3rem;
        border-radius: 50%;
        margin-right: 0.5rem;
      }
      button {
        flex-grow: 1;
        border-radius: 2.2rem;
        margin: 4px 0;
        padding: 0.7rem 1rem;

        border: 1px solid rgb(0, 0, 0, 0.15);
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
`;

const SharedActor = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 0.8rem 2.5rem 0 1rem;

  a {
    flex-grow: 1;
    display: flex;
    margin-right: 0.8rem;
    overflow: hidden;

    img {
      width: 3rem;
      height: 3rem;
      object-fit: contain;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 0.5rem;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 0.9rem;
          font-weight: 700;
        }

        &:not(:first-child) {
          font-size: 0.75rem;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 0.75rem;
    top: 0;
    background-color: transparent;
  }
`;

const Description = styled.div`
  font-size: 0.9rem;
  text-align: left;
  color: rgba(0, 0, 0, 0.9);
  padding: 0 1rem;
`;

const SharedImg = styled.div`
  margin-top: 0.5rem;
  background-color: #f9fafb;
  position: relative;

  img {
    width: 100%;
    height: 25rem;
    display: block;
  }
`;

const SocialCounts = styled.ul`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  margin: 0 1rem;
  border-bottom: 1px solid #e9e5df;
  line-height: 1.3;

  li {
    margin-right: 0.75rem;
    font-size: 0.75rem;
    button {
      display: flex;
      align-items: center;
      background-color: transparent;
      gap: 2px;
      img {
        width: 1.1rem;
      }
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.25rem 0.5rem;
  min-height: 2.5rem;

  button {
    flex-grow: 1;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem;
    color: #0a66c2;
    background-color: transparent;
  }
`;
export default Main;
