import {
    CLASS_NAME_CONTAINER,
    CLASS_NAME_RIPPLE,
    ClASS_NAME_RIPPLE_READY,
    ClASS_NAME_RIPPLE_START
} from './config';

/**
 * 开始动画
 * @param {Event} event 
 */
export default function(event) {
    event.stopPropagation();
    const points = event.touches;
    const $el = event.currentTarget;
    const $rippleNode = $el.querySelector(`.${ClASS_NAME_RIPPLE_READY}`);
    // 添加开始动画class
    $rippleNode.className = ClASS_NAME_RIPPLE_START;
}