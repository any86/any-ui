/**
 * 创建一个和目标元素大小一致的div
 * 大小由css文件的样式提供
 */
export default function(cssNameSpace){
    // 在目标元素相同位置制作一个一样尺寸的div
    let $containerNode = document.createElement('div');
    $containerNode.className = `${cssNameSpace}-container`;
    return $containerNode;
};