'use strict';

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  const text = liked ? '좋아요 취소' : '좋아요';
  return React.createElement(
    'button',
    { onClick: () => setLiked(!liked) },
    text,
  );
}

const domContainer = document.querySelector('#react-root');
// const e = React.createElement;
ReactDOM.render(React.createElement(LikeButton), domContainer);