import fetch from 'isomorphic-unfetch';
import css from 'styled-jsx/css';

// Styled-jsx 작성
const style = css`
  h2 {
    margin-left: 20px;
    background-color: orange;
    color: #fff;
  }
  .user-bio {
    margin-top: 12px;
    font-style: italic;
  }
`;

const Username = ({ user }) => {
  const username = user && user.name;
  const htmlURL = user && user.html_url;
  const bio = user && user.bio;

  return (
    <>
      {user && (
        <div>
          <h2>
            <a href={htmlURL}>{username}</a>
          </h2>
          <p>{bio}</p>
        </div>
      )}
      {!user && <div>해당 유저는 없습니다.</div>}
      {/* styled-jsx 적용 */}
      <style jsx>{style}</style>
    </>
  );
};

// query 객체에서 query param 추출
export const getServerSideProps = async ({ query }) => {
  const { username } = query;
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.status === 200) {
      const user = await res.json();
      console.log({ user });
      return { props: { user } };
    }
    return { props: {} };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

export default Username;
