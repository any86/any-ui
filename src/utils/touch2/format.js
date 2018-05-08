const $_session = {};
export default function(points) {
    let output = {};
    const now = Date.now();

    // 如果非第一次输出
    // 那么格式化数据
    if (undefined !== $_session.firstInput) {
        output = {
            pointsLength: points.length,
            points,
            deltaX: points.pageX - $_session.firstInput.points.pageX,
            deltaY: points.pageY - $_session.firstInput.points.pageY,
            timeStamp: now,
            deltaTime: now - $_session.firstInput.timeStamp
        };
    } else {
        output = {
            pointsLength: points.length,
            points,
            timeStamp: now,
        };
    }

    return output;
};