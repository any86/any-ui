const isBrowser = typeof window !== 'undefined';
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
const getHeight = (obj, { isScroll = false } = {}) => {
    if (window === obj) {
        return (
            window.innerHeight || // 浏览器窗口的可视区（viewport）高度（以像素为单位），如果存在水平滚动条，则包括它, outerHeight浏览器高度
            document.documentElement.clientHeight ||
            document.body.clientHeight
        );
    } else {
        if (isScroll) {
            //  父元素overflow: hidden/scroll/auto
            return obj.scrollHeight;
        } else {
            // 轮廓尺寸(包括边框)/ 滚动条尺寸算在盒子内容尺寸里(待验证)
            return obj.offsetHeight;
        }
    }
};

/**
 * 返回窗口的文档显示区的宽度。
 * {IE} document.documentElement 或 document.body的clientWidth
 * {CHROME} window.innerWidth
 */
const getWidth = (obj, { isScroll = false } = {}) => {
    if (window === obj) {
        return (
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth
        );
    } else {
        if (isScroll) {
            //  父元素overflow: hidden/scroll/auto
            return obj.scrollWidth;
        } else {
            // 轮廓尺寸(包括边框)/ 滚动条尺寸算在盒子内容尺寸里(待验证)
            return obj.offsetWidth;
        }
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

const getTime = () => Date.now() || new Date().getTime();

const getScrollParent = el => {
    if (!isBrowser) return;
    if (!(el instanceof HTMLElement)) {
        return window;
    }

    let parent = el;

    while (parent) {
        if (parent === document.body || parent === document.documentElement) {
            break;
        }

        if (!parent.parentNode) {
            break;
        }
        
        let temp = getComputedStyle(parent, null).getPropertyValue('overflow');
        temp += getComputedStyle(parent, null).getPropertyValue('overflow-x');
        temp += getComputedStyle(parent, null).getPropertyValue('overflow-y');
        
        if (/(scroll|auto)/.test(temp)) {
            return parent;
        }

        parent = parent.parentNode;
    }

    return window;
};

export {
    getTime,
    getScrollParent,
    getElementTopFromDocument,
    getWidth,
    getHeight,
    getScrollTop,
    getScrollLeft,
    getOffet
};
