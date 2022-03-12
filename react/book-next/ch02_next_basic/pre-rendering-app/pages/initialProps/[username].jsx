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

// component 함수에 메소드를 추가하는 방식으로 사용
Username.getInitialProps = async ({ query }) => {
  const { username } = query;
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.status === 200) {
      const user = await res.json();
      console.log({ user });
      return { user }; // getServerSideProps의 props 속성 없이 return
    }
    return { props: {} };
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default Username;
