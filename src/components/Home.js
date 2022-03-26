import { Fragment } from "react";
import styled from "styled-components";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";

function Home() {
  return (
    <Fragment>
      <Header />
      <Container>
        <Section>
          <h5>
            <a>Hiring in a hurry? - </a>
          </h5>
          <p>
            &nbsp;Find talented pros in record time with Upwork and keep
            business moving.
          </p>
        </Section>
        <Layout>
          <LeftSide />
          <Main />
          <RightSide />
        </Layout>
      </Container>
    </Fragment>
  );
}
const Container = styled.div`
  margin: 4.5rem auto 0;
  max-width: 1128px;
  padding: 0 0.75rem;
`;

const Section = styled.section`
  padding: 1rem 0 0;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 0.9rem;
  }
  p {
    color: #434649;
    font-weight: 500;
    font-size: 0.9rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

export default Home;
