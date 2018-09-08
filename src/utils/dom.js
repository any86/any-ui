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
const getHeight = (obj = window, { isScroll = false } = {}) => {
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
const getWidth = (obj = window, { isScroll = false, isComputed = false } = {}) => {
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
        } else if(isComputed){
            const style = getComputedStyle(obj)
            return parseInt(style.width);
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

/**
 * 判断元素是否在可视区或者可视区的倍数范围内
 * @param {Element} el 
 * @param {Number} viewRate 
 */
const getIsInView = (el, viewRate = 1) => {

    const { top, right, bottom, left } = el.getBoundingClientRect();
    const winWidth = getWidth(window);
    const winHeight = getHeight(window);
    return (
        top < winHeight * viewRate &&
        bottom > 0 &&
        left < winWidth * viewRate &&
        right > 0
    );
};
/**
 * 给getBoundingClientRect做个简写
 * @param {Element} el 
 */
const getBCR = el => el.getBoundingClientRect();


/**
 * 把秒转成时分秒日
 * @param {Number} 秒数 
 * @param {Number} 精度(1:秒,2:分,3:时, 4:日) 
 */
const parseTime = (number, precision = 1) => {
    switch (precision) {
        case 1: {
            return { second: number };
        };

        case 2: {
            let second = number % 60;
            let minute = Math.floor(number / 60);
            return { minute, second };
        };

        case 3: {
            let second = number % 60;
            let minute = Math.floor(number / 60) % 60;
            let hour = Math.floor(number / 3600);
            return { hour, minute, second };
        };

        case 4: {
            let second = number % 60;
            let minute = Math.floor(number / 60) % 60;
            let hour = Math.floor(number / 3600) % 24;
            let day = Math.floor(number / 86400);
            return { day, hour, minute, second };
        };

        default: {
            return { second: number };
        };
    }
}
/**
 * 倒计时
 * @param {Number}} 剩余秒数 
 * @param {Function} 倒计时到达后的回调函数
 * @param {Number} 精度(1:秒,2:分,3:时, 4:日)
 */
const countDownTime = (number, callback, precision=3) => {
    if (0 < number) {
        setTimeout(() => {
            number--;
            callback(parseTime(number, precision));
            countDownTime(number, callback, precision);
        }, 1000);
    }
}


export {
    countDownTime,
    parseTime,
    getTime,
    getScrollParent,
    getElementTopFromDocument,
    getWidth,
    getHeight,
    getScrollTop,
    getScrollLeft,
    getOffet,
    getIsInView
};
