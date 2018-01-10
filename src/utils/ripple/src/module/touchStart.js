import createRippleNode from './createRippleNode';
import createContainerNode from './createContainerNode';

/**
 * 创建水波纹所需要的dom结构和预备样式
 * @param {Event} event 
 */
export default function(options, event) {
    event.stopPropagation();
    const $el = event.currentTarget;
    // 如果没有记录过position
    if (!$el.dataset.ripplePosition) {
        const position = getComputedStyle($el).position;
        $el.dataset.ripplePosition = position;
    }

    // 初始化是否取消动画标记
    $el.dataset.rippleCancel = 'false';

    // 如果非下列定位, 那么设置目标元素的position为relative
    if (!/absolute|relative|fixed|sticky/.test($el.dataset.ripplePosition)) {
        $el.style.position = 'relative';
    }

    // 查找容器元素
    // 为了防止2个ripple嵌套的时候, 查找container出错, 所以只找子元素的container
    let $containerNode;
    for(let childNode of $el.children) {
        if(`${options.cssNameSpace}-container` === childNode.className){
            $containerNode = childNode;
            break;
        }
    }

    // 创建水波纹node
    // 尺寸位置受触发元素控制
    const {
        top,
        left,
        width,
        height
    } = $el.getBoundingClientRect();
    const points = event.touches;
    const pageX = points[0].pageX;
    const pageY = points[0].pageY;

    const $rippleNode = createRippleNode({
        top,
        left,
        width,
        height,
        pageX,
        pageY,
        cssNameSpace: options.cssNameSpace,
        background: options.background,
        duration: options.duration,
    });

    // 动画结束删除ripple
    let transitionendCount = 0;
    const removeRippleNode = event => {
        event.stopPropagation();
        if (0 === transitionendCount) {
            $containerNode.removeChild($rippleNode);
        }
        transitionendCount++;
    };
    $rippleNode.addEventListener('transitionend', removeRippleNode);
    $rippleNode.addEventListener('webkitTransitionEnd', removeRippleNode);

    // 如果不存在container加入container
    if (!$containerNode) {
        // 创建元素
        $containerNode = createContainerNode(options.cssNameSpace);

        $el.appendChild($containerNode);
    }

    // 插入水波纹div
    $containerNode.appendChild($rippleNode);
}