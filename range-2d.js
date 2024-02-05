function Range2D() {

    this.container = document.createElement("div");
    this.container.classList.add("range-2d");
    this.thumb = document.createElement("div");
    this.thumb.classList.add("thumb");
    this.container.append(this.thumb);

    for (const prop in Range2D.defaultStyle.container) {
        let value = Range2D.defaultStyle.container[prop];
        this.container.style[prop] = value;
    }
    for (const prop in Range2D.defaultStyle.thumb) {
        let value = Range2D.defaultStyle.thumb[prop];
        this.thumb.style[prop] = value;
    }

    this.containerRect = null;
    this.thumbRect = null;

    this.thumb.addEventListener("mousedown", this.startDragging.bind(this));
    document.addEventListener("mouseup", this.stopDragging.bind(this));

    this.container.addEventListener("mousedown", function (e) {
        if (e.button != 0) {
            return;
        }
        if (e.target == this.thumb) {
            return;
        }
        this.getRects();
        this.moveThumb(e.offsetX, e.offsetY);
        this.startDragging(e);
    }.bind(this));
}

Range2D.defaultStyle = {
    container: {
        width: "100px",
        height: "100px",
        backgroundColor: "hsl(0, 0%, 50%, 0.1)",
        position: "relative",
    },
    thumb: {
        width: "16px",
        height: "16px",
        backgroundColor: "hsl(0, 0%, 50%, 0.2)",
        position: "absolute",
    },
};

Range2D.prototype = {

    getRects: function getState(e) {
        this.containerRect = this.container.getBoundingClientRect();
        this.thumbRect = this.thumb.getBoundingClientRect();
    },

    startDragging: function startDragging(e) {
        if (e.button != 0) {
            return;
        }
        e.preventDefault();
        this.getRects();
        if (!this.dragBound) {
            this.dragBound = this.drag.bind(this);
        }
        document.addEventListener("mousemove", this.dragBound);
    },

    stopDragging: function stopDragging(e) {
        if (e.button != 0 && e.button != 2) {
            return;
        }
        document.removeEventListener("mousemove", this.dragBound);
        this.containerRect = null;
        this.thumbRect = null;
    },

    drag: function drag(e) {
        let x = e.clientX - this.containerRect.left;
        let y = e.clientY - this.containerRect.top;
        this.moveThumb(x, y);
    },

    moveThumb: function moveThumb(x, y) {
        let width = 100;
        let height = 100;
        let minX = 0;
        let minY = 0;
        let maxX = width - this.thumbRect.width;
        let maxY = height - this.thumbRect.height;
        let halfThumb = this.thumbRect.width / 2;
        x -= halfThumb;
        y -= halfThumb;
        x = Range2D.clamp(x, minX, maxX);
        y = Range2D.clamp(y, minY, maxY);
        this.thumb.style.left = x + "px";
        this.thumb.style.top = y + "px";
    },

};

Range2D.clamp = function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
};
