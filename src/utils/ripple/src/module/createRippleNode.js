/**
 * 创建水波纹动画div
 */
export default function({
    top,
    left,
    width,
    height,
    pageX,
    pageY,
    cssNameSpace,
    background,
    duration
}) {
    let $rippleNode = document.createElement('div');
    $rippleNode.className = cssNameSpace;

    const radius = Math.sqrt(width * width + height * height);
    const diameter = 2 * radius;

    // 设置样式
    $rippleNode.style.width = diameter + 'px';
    $rippleNode.style.height = diameter + 'px';
    $rippleNode.style.borderRadius = diameter + 'px';
    $rippleNode.style.left = pageX - left - radius + 'px';
    $rippleNode.style.top = pageY - top - radius + 'px';
    $rippleNode.style.background = background;
    $rippleNode.style.transitionDuration = duration + 'ms';
    $rippleNode.className = `${cssNameSpace}--ready`;
    return $rippleNode;
};