// 存储点击相关数据
let $_session = {};

/**
 * 格式化单点触碰数据
 * @param {Object} 触碰点 
 * @param {Object} 缓存
 */
const singlePointFormat = (points, $_session) => {
    let output = {};
    let now = Date.now();
    // 如果第一次输出, 那么存储相应变化数据
    if (undefined === $_session.firstInput) {
        output = {
            pointsLength: 1,
            points,
            timeStamp: now,
        };
        $_session.firstInput = output;
    } else {
        // 非第一次输入
        output = {
            pointsLength: 1,
            points,
            deltaX: points[0].pageX - $_session.firstInput.points[0].pageX,
            deltaY: points[0].pageY - $_session.firstInput.points[0].pageY,
            timeStamp: now,
            deltaTime: now - $_session.firstInput.timeStamp
        };
    }

    return output;
};

/**
 * 格式化多点触碰数据
 * @param {Object} 触碰点 
 * @param {Number} 触碰点个数
 * @param {Object} 缓存
 */
const multiPointsFormat = (points, pointsLength, $_session) => {
    let output = {};
    // 如果第一次输出, 那么存储相应变化数据
    if (undefined === $_session.firstMultiInput) {
        output = {
            pointsLength,
            points,
            timeStamp: now,
        };
    } else {
        // 非第一次输入
        output = {
            pointsLength,
            points,
            deltaX: points.pageX - $_session.firstMultiInput.points.pageX,
            deltaY: points.pageY - $_session.firstMultiInput.points.pageY,
            timeStamp: now,
            deltaTime: now - $_session.firstMultiInput.timeStamp
        };
    }
    return output;
};

/**
 * 统一收集到的数据格式
 */
const format = (points) => {
    let pointsLength = points.length;
    let output = {};

    // 单点触碰情况
    if (1 === pointsLength) {
        output = singlePointFormat(points, $_session);
    } else if (1 < pointsLength) {
        output = multiPointsFormat(points, pointsLength, $_session);
    }
console.log(output, $_session)
    return output;
};

/**
 * 清空$_session
 */
const clearSession = () => {
    $_session = {};
};

export {
    format,
    clearSession
};