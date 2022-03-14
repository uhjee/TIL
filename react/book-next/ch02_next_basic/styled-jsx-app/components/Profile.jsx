import css from 'styled-jsx/css';
import { GoLink, GoLocation, GoMail } from 'react-icons/go';

// Styled-jsx 작성
const style = css`
  .profile-box {
    width: 25%;
    max-width: 272px;
    margin-right: 26px;
  }

  .profile-image-wrapper {
    width: 100%;
  }
  .profile-image-wrapper .profile-image {
    display: block;
    width: 100%;
    border: 4px solid #e1e4e8;
    border-radius: 50%;
  }
  .profile-username {
    margin: 0;
    padding-top: 16px;
    font-size: 26px;
  }
  .profile-user-login {
    margin: 0;
    font-size: 20px;
  }
  .profile-user-bio {
    margin: 0;
    padding: 16px 0;
    font-size: 14px;
    color: #555;
  }
  .profile-user-info {
    display: flex;
    align-items: center;
    margin: 4px 0 0;
  }
  .profile-user-info-text {
    margin-left: 6px;
    color: #888;
  }
`;

const Profile = ({ user }) => {
  if (!user) {
    return null;
  }
  const { name: username, html_url: htmlURL, bio } = user;

  return (
    <>
      <div className="profile-box">
        <div className="profile-image-wrapper">
          <img
            src={user.avatar_url}
            alt={`${user.name} profile image`}
            className="profile-image"
          />
        </div>
        <h2 className="profile-username">{username}</h2>
        <p className="profile-user-login">{user.login}</p>
        <p className="profile-user-bio">{bio}</p>
        <p className="profile-user-info">
          <GoLocation size={16} color="#ec8543" />
          <span className="profile-user-info-text">
            {user.location ? user.location : 'no-location'}
          </span>
        </p>
        <p className="profile-user-info">
          <GoMail size={16} color="#ec8543" />
          <span className="profile-user-info-text">
            {user.email ? user.email : 'no-email'}
          </span>
        </p>
        <p className="profile-user-info">
          <GoLink size={16} color="#ec8543" />
          <span className="profile-user-info-text">
            {user.blog ? user.blog : 'no-blog'}
          </span>
        </p>
      </div>
      <style jsx>{style}</style>
    </>
  );
};

export default Profile;
