/**
 * 返回當前高精度時間
 */
const hrTime = () => {
    const now = process.hrtime(); // 返回 [seconds, nanoseconds]
    return [now[0], now[1]];
};

/**
 * 計算兩個時間之間的持續時間
 */
const hrTimeDuration = (startTime, endTime) => {
    const seconds = endTime[0] - startTime[0];
    const nanoseconds = endTime[1] - startTime[1];
    return [seconds, nanoseconds];
};

/**
 * 將高精度時間轉換為毫秒
 */
const hrTimeToMilliseconds = (hrTime) => {
    const secondsToMillis = hrTime[0] * 1000;
    const nanosecondsToMillis = hrTime[1] / 1e6;
    return secondsToMillis + nanosecondsToMillis;
};

module.exports = {
    hrTime,
    hrTimeDuration,
    hrTimeToMilliseconds,
};
