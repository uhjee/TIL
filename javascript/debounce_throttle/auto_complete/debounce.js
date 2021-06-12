const statusKey = document.querySelector('.status-key');
const statusAjax = document.querySelector('.status-ajax');
const autocomplete = document.querySelector('.autocomplete');
let intervalId;

// ! 가짜 ajax request
const make_ajax_request = (e) => {
  console.log('api call ...');
  statusAjax.innerHTML = `That's enough waiting. Making now the ajax request.`;

  intervalId = setTimeout(() => {
    statusKey.innerHTML = `Type here. I will detect when you stop typing.`;
    statusAjax.innerHTML = '';
    autocomplete.value = '';
  }, 3000);
};

autocomplete.addEventListener('keydown', () => {
  statusKey.innerHTML = 'waiting for more key strokes ...';
  clearInterval(intervalId);
});

// debounce 호출
const action = _.debounce(make_ajax_request, 1500); // 마지막 호출로부터 1500간 요청 x
autocomplete.addEventListener('keydown', action);
