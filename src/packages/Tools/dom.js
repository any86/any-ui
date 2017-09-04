import TWEEN from "tween.js";
/**
 * 动画曲线
 * @param {Number} from 
 * @param {Number} to 
 * @param {Number} time 
 * @param {Function} cb 
 */
const animate = (
  from,
  to,
  time,
  onUpdate = () => {},
  onComplete = () => {}
) => {
  var tween = new TWEEN.Tween({ value: from });
  tween.to({ value: to }, time);
  tween.start();

  _animate();

  function _animate() {
    requestAnimationFrame(_animate);
    TWEEN.update();
  }

  tween.onUpdate(function() {
    onUpdate(this.value);
  });

  tween.onComplete(function() {
    onComplete(this.value);
  });
};

const findScrollParent = el => {
  var parentNode = el.parentNode;
  var overflowY = getComputedStyle(parentNode, null).overflowY;
  while ("scroll" != overflowY && parentNode) {
    parentNode = parentNode.parentNode;
    overflowY = getComputedStyle(parentNode, null).overflowY;
  }
  return parentNode;
};


export default {
  animate,
  findScrollParent
};
