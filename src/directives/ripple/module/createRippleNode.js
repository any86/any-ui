/**
 * 创建水波纹动画div
 */
export default function({
    radius, centerX, centerY,
    cssNameSpace,
    background,
    duration
}) {
    let $rippleNode = document.createElement('div');
    $rippleNode.className = cssNameSpace;
    const diameter = 2 * radius;

    // 设置样式
    $rippleNode.style.width = diameter + 'px';
    $rippleNode.style.height = diameter + 'px';
    $rippleNode.style.borderRadius = diameter + 'px';
    $rippleNode.style.left = centerX + 'px';
    $rippleNode.style.top = centerY + 'px';
    $rippleNode.style.background = background;
    $rippleNode.style.transitionDuration = duration + 'ms';
    $rippleNode.className = `${cssNameSpace}--ready`;
    return $rippleNode;
};