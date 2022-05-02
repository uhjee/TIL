import React, { useState } from 'react';
import { useRouter } from 'next/router';
import css from 'styled-jsx/css';
import { IoLogoGithub } from 'react-icons/io';

const HeaderCss = css`
  .header-wrapper {
    padding: 14px 14px;
    background-color: #24292e;
    line-height: 0;
    display: flex;
    align-items: center;
  }

  .header-search-form input {
    margin: 0px 16px;
    background-color: hsla(0, 0%, 100%, 0.125);
    width: 300px;
    height: 28px;
    border: none;
    border-radius: 5px;
    outline: none;
    color: white;
    padding: 0px 12px;
    font-size: 14px;
    font-weight: bold;
  }

  .header-navagation a {
    color: white;
    margin-right: 16px;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
  }
`;

const GITHUB_URL = 'https://github.com';

const MENU = [
  { text: 'Pull request', path: `${GITHUB_URL}/pulls` },
  { text: 'Issues', path: `${GITHUB_URL}/issues` },
  { text: 'Marketplace', path: `${GITHUB_URL}/marketplace` },
  { text: 'Explore', path: `${GITHUB_URL}/explore` },
];

const Header = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  /**
   * form 엘레먼트의 submit 이벤트 핸들러
   * @param {*} e 이벤트 객체
   */
  const onSubmit = e => {
    e.preventDefault();
    router.push(`/users/${username}`);
    setUsername('');
  };
  return (
    <div>
      <div className="header-wrapper">
        <IoLogoGithub color="white" size={36} />
        <form className="header-search-form" onSubmit={onSubmit}>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </form>
        <nav className="header-navagation">
          {MENU &&
            MENU.map(i => (
              <a href={i.path} key={i.text}>
                {i.text}
              </a>
            ))}
        </nav>
      </div>
      <style jsx> {HeaderCss}</style>
    </div>
  );
};

export default Header;
