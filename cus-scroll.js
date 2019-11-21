"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
  Cusscroll
  Copyright (c) 2019 Jay (https://github.com/HappyJayXin)  
  Version: 1.1.4
*/
var _default =
  /*#__PURE__*/
  function () {
    function _default(elem) {
      _classCallCheck(this, _default);

      this.conatiner = document.querySelector(elem);
      this.createBar();
      this.ctn = this.conatiner.children[0];
      this.setScroll();
      this.bar = this.conatiner.querySelector('.cus-scroll-bar span');
      this.barHeight = this.bar.offsetHeight;
      this.ctnHeight = this.ctn.offsetHeight;
      this.startY = 0;
      this.mousemoveHandle = this.move.bind(this);
      this.mouseupHandle = this.stop.bind(this);
      this.init();
    }
    /*
      * Create element.
    */


    _createClass(_default, [{
      key: "createBar",
      value: function createBar() {
        var bar = document.createElement("div");
        var span = document.createElement("span");
        bar.appendChild(span);
        bar.classList.add('cus-scroll-bar');
        this.conatiner.appendChild(bar);
      }
      /*
        * Add class name for can scroll.
      */

    }, {
      key: "setScroll",
      value: function setScroll() {
        this.ctn.classList.add('set-cus-scroll');
      }
      /*
        * Initial scroll everything.
      */

    }, {
      key: "init",
      value: function init() {
        this.resizeEvent();
        this.scrollEvent();
        this.dragEvent();
      }
      /*
        * Add resize event.
      */

    }, {
      key: "resizeEvent",
      value: function resizeEvent() {
        this.toggleBar(); // Fist judge when load in.

        window.addEventListener('resize', this.toggleBar.bind(this));
      }
      /*
        * Judge overflow to let bar appear or disappear.
      */

    }, {
      key: "toggleBar",
      value: function toggleBar() {
        if (this.isOverflown(this.ctn)) {
          this.bar.style.display = 'block';
        } else {
          this.bar.style.display = 'none';
        }
      }
      /*
        * Overflow or no.
        * @return {Boolean}
      */

    }, {
      key: "isOverflown",
      value: function isOverflown(_ref) {
        var offsetHeight = _ref.offsetHeight,
          scrollHeight = _ref.scrollHeight;
        return scrollHeight > offsetHeight;
      }
      /*
        * Add scroll event.
      */

    }, {
      key: "scrollEvent",
      value: function scrollEvent() {
        this.ctn.addEventListener("scroll", this.scrollStart.bind(this), false);
      }
      /*
        * Set scroll bar scrolling position.
      */

    }, {
      key: "scrollStart",
      value: function scrollStart() {
        var top = parseInt(this.ctn.scrollTop);
        var scrollHeight = this.ctn.scrollHeight - this.ctnHeight;
        this.bar.style.top = "".concat(top / (scrollHeight / 100), "%");
      }
      /*
        * Add event when mousedown scroll bar.
      */

    }, {
      key: "dragEvent",
      value: function dragEvent() {
        this.bar.addEventListener("mousedown", this.dragStart.bind(this));
      }
      /*
        * Set mousemove and mouseup event.
      */

    }, {
      key: "dragStart",
      value: function dragStart(e) {
        e.preventDefault();
        this.startY = e.clientY - this.bar.offsetTop;
        window.addEventListener("mousemove", this.mousemoveHandle);
        window.addEventListener("mouseup", this.mouseupHandle);
      }
      /*
        * Mousemove to define scroll bar style.
      */

    }, {
      key: "move",
      value: function move(e) {
        var scrollHeight = this.ctn.scrollHeight - this.ctnHeight;
        var y = e.clientY - this.startY;
        if (y <= 0 || y > this.ctnHeight - this.barHeight) return;
        this.bar.style.top = y + "px";
        this.ctn.scrollTo(0, scrollHeight * parseInt(y / (this.ctnHeight - this.barHeight) * 100) / 100);
      }
      /*
        * Remove mousemove and mouseup event.
      */

    }, {
      key: "stop",
      value: function stop() {
        window.removeEventListener("mousemove", this.mousemoveHandle);
        window.removeEventListener("mouseup", this.mouseupHandle);
      }
    }]);

    return _default;
  }();

exports["default"] = _default;
