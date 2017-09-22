import TWEEN from 'tween.js';
/**
 * 动画曲线
 * @param {Number} from 
 * @param {Number} to 
 * @param {Number} time 
 * @param {Function} cb 
 */
const animate = (
    from,
    to,
    time,
    onUpdate = () => {},
    onComplete = () => {}
) => {
    var tween = new TWEEN.Tween({ value: from });
    tween.to({ value: to }, time);
    tween.start();

    _animate();

    function _animate() {
        requestAnimationFrame(_animate);
        TWEEN.update();
    }

    tween.onUpdate(function() {
        onUpdate(this.value);
    });

    tween.onComplete(function() {
        onComplete(this.value);
    });
};
/**
 * 找距离最近的scroll父元素
 * @param {element} el 
 * @return {element}
 */
const findScrollParent = el => {
    var parentNode = el.parentNode;
    var overflowY = getComputedStyle(parentNode, null).overflowY;
    while ('scroll' != overflowY && parentNode) {
        parentNode = parentNode.parentNode;
        overflowY = getComputedStyle(parentNode, null).overflowY;
    }
    return parentNode;
};
/**
 * 获取元素顶部与文档顶部的距离
 * @param {element} el
 * @return {Number} 
 */
const getElementTopFromDocument = el => {
    var top = el.offsetTop;
    var activeNode = el.offsetParent;
    while (null != activeNode) {
        top += activeNode.offsetTop;
        activeNode = activeNode.offsetParent;
    }
    return top;
};

/**
 * 返回窗口的文档显示区的高度。
 * {element|window} obj
 * {IE} document.documentElement 或 document.body的clientHeight
 * {CHROME} window.innerHeight
 */
const getHeight = obj => {
    if (window === obj) {
        return (
            window.innerHeight || // 浏览器窗口的可视区（viewport）高度（以像素为单位），如果存在水平滚动条，则包括它, outerHeight浏览器高度
            document.documentElement.clientHeight ||
            document.body.clientHeight
        );
    } else {
        return obj.offsetHeight; // 轮廓尺寸(包括边框)
    }
};

/**
 * 返回窗口的文档显示区的宽度。
 * {IE} document.documentElement 或 document.body的clientWidth
 * {CHROME} window.innerWidth
 */
const getWidth = obj => {
    if (window === obj) {
        return (
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth
        );
    } else {
        return obj.offsetWidth; // 轮廓尺寸(包括边框)
    }
};
/**
 * 获取滚动条高度
 * @param {window|element} object 
 */
const getScrollTop = object => {
    if (window === object) {
        return window.pageYOffset;
    } else {
        return object.scrollTop;
    }
};

/**
 * 获取滚动条左位移
 * @param {window|element} object 
 */
const getScrollLeft = object => {
    if (window === object) {
        return window.pageXOffset;
    } else {
        return object.scrollLeft;
    }
};
/**
 * 获取2个元素之间的x, y距离
 * @param {element} element 
 * @param {element} traget 
 */
const getOffet = (element, traget) => {
    var top = element.offsetTop;
    var left = element.offsetLeft;
    var activeNode = element.offsetParent;
    while (null != activeNode && traget != activeNode) {
        top += activeNode.offsetTop;
        left += activeNode.offsetLeft;
        activeNode = activeNode.offsetParent;
    }
    return { top, left };
};
// var x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
// var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

export {
    animate,
    findScrollParent,
    getElementTopFromDocument,
    getWidth,
    getHeight,
    getScrollTop,
    getScrollLeft,
    getOffet
};
