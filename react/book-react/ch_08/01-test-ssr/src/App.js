import React, { useState, useEffect } from 'react';
import Home from './Home';
import About from './About';
import styled from 'styled-components';
import Icon from './img01.png';

const Container = styled.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;

// API Mock
function fetchUsername() {
  const usernames = ['mike', 'june', 'jamie'];
  return new Promise((resolve) => {
    const username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(() => resolve(username), 100);
  });
}

export default function App({ propPage }) {
  const [page, setPage] = useState(propPage);

  useEffect(() => {
    // 페이지 뒤가 버튼 클릭 시, 아래 이벤트 발생
    window.onpopstate = (event) => {
      setPage(event.state);
    };
  }, []);

  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`);
    setPage(newPage);
  }

  const PageComponent = page === 'home' ? Home : About;

  // 부분 클라이언트 렌더링
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetchUsername().then((data) => setUsername(data));
  }, []);

  return (
    <Container>
      <div className="container">
        <PageComponent username={username} />
      </div>
      <button data-page="home" onClick={onChangePage}>
        Home
      </button>
      <button data-page="about" onClick={onChangePage}>
        About
      </button>
      <img src={Icon} />
    </Container>
  );
}
