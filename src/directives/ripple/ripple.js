/**
 * 查找紧邻的子节点
 * @param {Element}  
 */
const findRippleContainer = ($el) => {
    let $rippleContainerNode = null;

    for (let $child of $el.childNodes) {
        if ('ripple-container' == $child.className) {
            $rippleContainerNode = $child;
            break;
        }
    }

    return $rippleContainerNode;
}

/**
 * 创建水波纹容器
 * @param {Element}  
 */
const createRippleContainerNode = (event) => {
    let $el = event.currentTarget;
    let $rippleContainerNode = findRippleContainer($el);

    if (null != $rippleContainerNode) {
        if ($el.contains($rippleContainerNode)) {
            $el.removeChild($rippleContainerNode);
        }
    }
    $rippleContainerNode = document.createElement('div');
    $rippleContainerNode.className = 'ripple-container';
    return $rippleContainerNode;
}

/**
 * 建立水波纹
 */
const createRippleNode = (event) => {
    const $el = event.currentTarget;
    // 获取目标元素的信息
    const { top, left, width, height } = $el.getBoundingClientRect();
    // 计算尺寸
    const radius = Math.sqrt(width * width + height * height);
    const diameter = 2 * radius;
    // 坐标
    const pageY = event.touches[0].pageY || 0;
    const pageX = event.touches[0].pageX || 0;
    // 创建水波纹元素
    let $rippleNode;
    $rippleNode = document.createElement('div');
    $rippleNode.style.width = diameter + 'px';
    $rippleNode.style.height = diameter + 'px';
    $rippleNode.style.borderRadius = diameter + 'px';
    $rippleNode.style.left = pageX - left - radius + 'px';
    $rippleNode.style.top = pageY - top - radius + 'px';
    $rippleNode.style.background = $el.dataset.rippleBackground;
    $rippleNode.style.transitionDuration = $el.dataset.rippleDuration + 'ms';
    $rippleNode.className = 'ripple ripple--ready';
    return $rippleNode;
}

const touchStartHandler = (event) => {
    event.stopPropagation();
    const $el = event.currentTarget;
    if ('true' == $el.dataset.rippleDisabled) return;

    // 如果非下列定位, 那么设置目标元素的position为relative
    const style = getComputedStyle($el, null);

    const position = style.position;
    $el.dataset.ripplePosition = position;
    if (!/absolute|relative|fixed|sticky/.test(position)) {
        $el.style.position = 'relative';
    }

    // 插入ripple
    let $rippleContainerNode = createRippleContainerNode(event);
    let $rippleNode = createRippleNode(event);
    $rippleContainerNode.appendChild($rippleNode);
    $el.appendChild($rippleContainerNode);

}


const touchendHandler = (event) => {
    event.stopPropagation();
    const $el = event.currentTarget;
    if ('true' == $el.dataset.rippleDisabled) return;
    const duration = parseInt($el.dataset.rippleDuration);
    let $rippleContainerNode = findRippleContainer($el);
    let $rippleNode = $rippleContainerNode.childNodes[0];
    $rippleNode.className = 'ripple--start';

    // 动画结束后删除水波纹.
    // 防止可能出现排版错乱
    clearTimeout($el.dataset.rippleTimer);
    $el.dataset.rippleTimer = setTimeout(() => {
        $el.removeChild($rippleContainerNode);
    }, duration + 100);
}

export {
    touchStartHandler, touchendHandler
}