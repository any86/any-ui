/**
 * 如果发生移动, 那么取消动画
 * @param {Event} event 
 */
export default function(options, event) {
    event.stopPropagation();
    const $el = event.currentTarget;
    $el.dataset.rippleCancel = 'true';
}