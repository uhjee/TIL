class Box {
  constructor(index, x, y) {
    this.index = index;
    this.x = x;
    this.y = y;
    const widthHeightNum = ((Math.random() * 10) % 5 + 4) * 10;
    this.width = widthHeightNum;
    this.height = widthHeightNum;
    this.direction = 'R';
    this.speed = Math.random() * 10;
    // this.draw();
  }

  draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#fff';
    ctx.fillText(this.index, this.x + 10, this.y + 30);
  }
}


