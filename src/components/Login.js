import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import { setUser } from "../redux/actions";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignin = async () => {
    const response = await signInWithPopup(auth, provider);
    dispatch(setUser(response.user));
    history.push("/home");
  };
  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="linkedin logo" />
        </a>
        <div>
          <Join>Join now</Join>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="/images/login-hero.svg" alt="home hero" />
        </Hero>
        <Form>
          <Google onClick={handleSignin}>
            <img src="/images/google.svg" alt="google" />
            Sign in with Google
          </Google>
        </Form>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 0.75rem;
  height: 100vh;
  overflow: hidden;
`;
const Nav = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  max-width: 1128px;
  padding: 0.75rem 0 1rem;
  margin: auto;
  height: 4rem;

  & > a {
    width: 8.5rem;
    height: 2.25rem;
    @media (max-width: 768px) {
      padding: 0 0.3rem;
    }
  }
  & > div {
    margin-left: auto;
  }
`;

const Join = styled.a`
  color: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  margin-right: 0.75rem;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
  }
`;

const SignIn = styled.a`
  color: #0a66c2;
  font-weight: 600;
  text-align: center;
  padding: 10px 24px;
  transition: 0.2s;
  border-radius: 24px;
  box-shadow: inset 0 0 0 1px #0a66c2;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
  }
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  align-items: center;
  padding: 60px 0;
  max-width: 1128px;
  margin: auto;
  position: relative;
  height: calc(100vh - 4rem);
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Hero = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
  h1 {
    width: 55%;
    font-size: 3.5rem;
    color: #2977c9;
    font-weight: 500;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 2.25rem;
      width: 100%;
    }
  }
  img {
    position: absolute;
    right: -1rem;
    top: 4rem;
    width: 35rem;
    @media (max-width: 998px) {
      width: 25rem;
    }
    @media (max-width: 768px) {
      position: initial;
      width: 80%;
    }
  }
`;
const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

export default Login;
