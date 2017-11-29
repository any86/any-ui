/**
 * 创建水波纹容器
 * @param {Element}  
 */
const createContainerNode = ($el, { borderRadius }) => {
    let $rippleContainerNode = $el.querySelector('.ripple-container');
    // 如果已经存在Container那么删除
    if ($rippleContainerNode && $el.contains($rippleContainerNode)) {
        $el.removeChild($rippleContainerNode);
    }
    // 在目标元素相同位置制作一个一样尺寸的div
    $rippleContainerNode = document.createElement('div');
    $rippleContainerNode.className = 'ripple-container';
    // 目标元素样式
    $rippleContainerNode.style.borderRadius = borderRadius;
    return $rippleContainerNode;
}

/**
 * 建立水波纹
 */
const createRippleNode = ($el, { background, duration }, event) => {
    // 获取目标元素的信息
    const { top, left, width, height } = $el.getBoundingClientRect();
    log(top, left)
    const radius = Math.sqrt(width * width + height * height);
    const diameter = 2 * radius;
    const pageY = event.touches[0].pageY;
    const pageX = event.touches[0].pageX;
    
    // 创建水波纹元素
    let $rippleNode;
    $rippleNode = document.createElement('div');
    $rippleNode.style.width = diameter + 'px';
    $rippleNode.style.height = diameter + 'px';
    $rippleNode.style.borderRadius = diameter + 'px';
    $rippleNode.style.left = pageX - left - radius + 'px';
    $rippleNode.style.top = pageY - top - radius + 'px';
    $rippleNode.style.background = background;
    $rippleNode.style.transitionDuration = duration + 'ms';
    $rippleNode.className = 'ripple--ready';
    return $rippleNode;
}

const touchStartHandler = ($el, { background, duration }, event) => {
    event.stopPropagation();
    const style = getComputedStyle($el);
    const { borderRadius, position } = style;
    const $rippleNode = createRippleNode($el, { background, duration }, event);
    const $containerNode = createContainerNode($el, { borderRadius });
    $containerNode.appendChild($rippleNode);
    $el.appendChild($containerNode);
}


const touchendHandler = ($el, timer, {duration}, event) => {
    event.stopPropagation();
    let $containerNode = $el.querySelector('.ripple-container');
    let $rippleNode = $containerNode.childNodes[0];
    $rippleNode.className = 'ripple--start';
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //     if ($el.contains($containerNode)) {
    //         $el.removeChild($containerNode);
    //     }
    // }, duration + 100);
}

export {
    touchStartHandler, touchendHandler
}

// const touchstartHandler = ($el, event) => {
//     event.stopPropagation();
//     // 如果非下列定位, 那么设置目标元素的position为relative
//     if (!/absolute|relative|fixed|sticky/.test(this.orgPosition)) {
//         $el.style.position = 'relative';
//     }
//     // 创建元素
//     this.$rippleNode = this._createRippleNode(event);
//     this.$rippleContainerNode = this._createRippleContainerNode(event);
//     this.$rippleContainerNode.appendChild(this.$rippleNode);
//     // 插入到目标元素
//     $el.appendChild(this.$rippleContainerNode);
// }




