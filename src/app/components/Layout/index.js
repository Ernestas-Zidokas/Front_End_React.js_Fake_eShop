import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Main = styled.main`
  max-width: 1020px;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLayout = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function Layout({ children }) {
  return (
    <StyledLayout className="Layout">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </StyledLayout>
  );
}

export default Layout;
