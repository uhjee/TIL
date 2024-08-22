class Panel {
  constructor() {
    this.width = 300;
    this.height = 300;
    this.scale = 0;
    this.angle = 0;
  }

  draw() {
    ctx.fillStyle = 'rgba(250,250,100, 0.8)';

    // if (this.scale < 1) {  // 여기서 해도 되는데 바깥에서 애니메이션 컨트롤하는 이유는..?

    ctx.resetTransform(); // 00. 변환 초기화
    ctx.translate(oX, oY); // 01. scale 기준점을 위한 기준 좌표 이동
    ctx.scale(this.scale, this.scale); // 02. scale
    ctx.rotate(canvasUtil.toRadian(this.angle));
    ctx.translate(-oX, -oY); // 03. scale 기준점 초기화


    // }
    ctx.fillRect(oX - this.width / 2, oY - this.height / 2, this.width, this.height);
    ctx.fillStyle = '#000';
    ctx.resetTransform(); // 04. 변환 초기화 - 다른 요소들에 영향을 주지 않도록
  }

  showContent() {
    if (selectedBox) {
      ctx.fillText(selectedBox.index, oX, oY);
    }
  }
}
