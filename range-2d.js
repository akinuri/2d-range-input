function Range2D() {

    this.container = document.createElement("div");
    this.container.classList.add("range-2d");
    this.thumb = document.createElement("div");
    this.thumb.classList.add("thumb");
    this.container.append(this.thumb);

    this.offsetX = null;
    this.offsetY = null;

    this.thumb.addEventListener("mousedown", this.startDragging.bind(this));
    document.addEventListener("mouseup", this.stopDragging.bind(this));

    this.container.addEventListener("mousedown", function (e) {
        if (e.target == this.thumb) {
            return;
        }
        let x = e.offsetX;
        let y = e.offsetY;
        this.moveThumb(x, y);
        this.startDragging(e);
    }.bind(this));
}

Range2D.prototype = {

    startDragging: function startDragging(e) {
        e.preventDefault();
        let rect = this.container.getBoundingClientRect();
        this.offsetX = rect.left;
        this.offsetY = rect.top;
        if (!this.dragBound) {
            this.dragBound = this.drag.bind(this);
        }
        document.addEventListener("mousemove", this.dragBound);
    },

    stopDragging: function stopDragging() {
        document.removeEventListener("mousemove", this.dragBound);
        this.offsetX = null;
        this.offsetY = null;
    },

    drag: function drag(e) {
        let x = e.clientX - this.offsetX;
        let y = e.clientY - this.offsetY;
        this.moveThumb(x, y);
    },

    moveThumb: function moveThumb(x, y) {
        x = Range2D.clamp(x, 0, 100);
        y = Range2D.clamp(y, 0, 100);
        this.thumb.style.left = x + "px";
        this.thumb.style.top = y + "px";
    },

};

Range2D.clamp = function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
};

