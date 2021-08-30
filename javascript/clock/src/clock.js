class Clock1 {
  constructor({ template }, timer) {
    this.template = template;
    this.timer = timer;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    const root = document.querySelector('#root');
    const clockDiv = root.querySelector('.clock');
    clockDiv.innerText = output;
    root.appendChild(clockDiv);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    console.log('start');
    this.render();
    this.timer = setInterval(() => {
      this.render();
    }, 1000);
  }
}

const clock1 = new Clock1({ template: 'h:m:s' });
// 작업을 완료한 이후에 clock.start()를 실행했을 때에 console에 정상적으로 시간이 logging되어야 합니다.
clock1.start();
