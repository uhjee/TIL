// throttle, setInterval 같은 느낌? 주기적으로 호출한다
// debouce는 사용자가 스크롤을 멈출 때에만 이벤트를 발샏시키므로 디바운싱 보다는 throttle이 적합

// container element
const container = document.querySelector('.container');

const appendPost = () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight > scrollHeight - 5) {
    // setTimeout(createPost, 2000);
    createPost();
  }
};

const createPost = () => {
  const post = document.createElement('div');
  post.classList.add('text', 'text--new');
  post.innerHTML = `<h1>Lorem ipsum dolor sit amet</h1>
	<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque eos, atque sed saepe tempore, sequi qui excepturi voluptate ut perspiciatis culpa sit harum, corrupti ullam  voluptatibus obcaecati sint dignissimos quas.</p>`;

  container.appendChild(post);
};

// scroll 이벤트 추가 (throttle 사용)
//  - window 객체에 건다!
window.addEventListener('scroll', _.throttle(appendPost, 500));
