/**
 * 如果发生移动, 那么取消动画
 * @param {Event} event 
 */
export default function(event) {
    event.stopPropagation();
    const $el = event.currentTarget;
    // 禁止执行
    if('true' === $el.dataset.rippleIsDisabled) {
        return;
    }
    $el.dataset.rippleCancel = 'true';
}