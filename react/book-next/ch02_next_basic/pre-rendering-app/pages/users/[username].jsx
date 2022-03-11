import fetch from 'isomorphic-unfetch';

const Username = ({ user }) => {
  const username = user && user.name;
  const htmlURL = user && user.html_url;
  const bio = user && user.bio;

  return (
    <div>
      {user && (
        <div>
          <a href={htmlURL}>{username}</a>
          <p>{bio}</p>
        </div>
      )}
      {!user && <div>해당 유저는 없습니다.</div>}
    </div>
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
