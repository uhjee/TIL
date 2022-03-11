import fetch from 'isomorphic-unfetch';

const User01 = ({ user }) => {
  const username = user && user.name;
  const htmlURL = user && user.html_url;
  const bio = user && user.bio;

  return (
    <div>
      <a href={htmlURL}>{username}</a>
      <p>{bio}</p>
    </div>
  );
};

// next의 페이지 데이터를 서버로부터 제공받는 api
export const getServerSideProps = async () => {
  try {
    const res = await fetch('https://api.github.com/users/uhjee');
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

export default User01;
