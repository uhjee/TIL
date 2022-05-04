import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: beige;
`;

const Index: NextPage = () => {
  return (
    <Container>
      <h1>hello TS1!</h1>
      <h1>hello TS2!</h1>
      <p>hello styled-components</p>
      <ul>
        <li>123</li>
        <li>456</li>
      </ul>
      <a>hello styled</a>
    </Container>
  );
};

export default Index;
