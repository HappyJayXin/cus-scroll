/*
  Cusscroll
  Copyright (c) 2019 Jay (https://github.com/HappyJayXin)  
  Version: 1.1.2
*/

export default class {
  constructor(elem) {
    this.conatiner = document.querySelector(elem);
    this.createBar();

    this.ctn = this.conatiner.children[0];
    this.setScroll();

    this.bar = this.conatiner.querySelector('.cus-scroll-bar span');
    this.barHeight = this.bar.offsetHeight;
    this.ctnHeight = this.ctn.offsetHeight;
    this.startY = 0

    this.mousemoveHandle = this.move.bind(this);
    this.mouseupHandle = this.stop.bind(this);

    this.init()
  }

  /*
    * Create element.
  */
  createBar() {
    const bar = document.createElement("div");
    const span = document.createElement("span");
    bar.appendChild(span);
    bar.classList.add('cus-scroll-bar');
    this.conatiner.appendChild(bar);
  }

  /*
    * Add class name for can scroll.
  */
  setScroll() {
    this.ctn.classList.add('set-cus-scroll');
  }

  /*
    * Initial scroll everything.
  */
  init() {
    this.scrollEvent();
    this.dragEvent();
  }

  /*
    * Add scroll event and change scroll bar style.
  */
  scrollEvent() {
    this.ctn.addEventListener(
      "scroll", () => {
        let top = parseInt(this.ctn.scrollTop);
        let scrollHeight = this.ctn.scrollHeight - this.ctnHeight;

        this.bar.style.top = `${top / (scrollHeight / 100)}%`;
      },
      false
    );
  }

  /*
    * Add event when mousedown scroll bar.
  */
  dragEvent() {
    this.bar.addEventListener("mousedown", this.dragStart.bind(this));
  }

  /*
    * Set mousemove and mouseup event.
  */
  dragStart(e) {
    e.preventDefault();
    this.startY = e.clientY - this.bar.offsetTop;
    window.addEventListener("mousemove", this.mousemoveHandle);
    window.addEventListener("mouseup", this.mouseupHandle);
  }

  /*
    * Mousemove to define scroll bar style.
  */
  move(e) {
    let scrollHeight = this.ctn.scrollHeight - this.ctnHeight;
    let y = e.clientY - this.startY;

    if (y <= 0 || y > (this.ctnHeight - this.barHeight)) return
    this.bar.style.top = y + "px";
    this.ctn.scrollTo(0, scrollHeight * parseInt(y / (this.ctnHeight - this.barHeight) * 100) / 100);
  }

  /*
    * Remove mousemove and mouseup event.
  */
  stop() {
    window.removeEventListener("mousemove", this.mousemoveHandle);
    window.removeEventListener("mouseup", this.mouseupHandle);
  }
}