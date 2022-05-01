import fetch from 'isomorphic-unfetch';
import Profile from '../../components/Profile';
import Repositories from '../../components/Repository';
import css from 'styled-jsx/css';

const style = css`
  .user-contents-wrapper {
    display: flex;
    padding: 20px;
  }
`;

const Username = ({ user, repos }) => {
  return (
    <div className="user-contents-wrapper">
      {/* PROFILE */}
      <Profile user={user} />
      {/* REPOSITORY */}
      <Repositories user={user} repos={repos} />
      <style jsx>{style}</style>
    </div>
  );
};

// query 객체에서 query param 추출
export const getServerSideProps = async ({ query }) => {
  const { username, page } = query;
  try {
    let user;
    let repos;

    // user info
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (userRes.status === 200) {
      user = await userRes.json();
      console.log({ user });
    }

    // user repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&page=${page}&per_page=10`,
    );
    if (reposRes.status === 200) {
      repos = await reposRes.json();2
      console.log({ repos });
    }
    return { props: { user, repos } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

export default Username;
