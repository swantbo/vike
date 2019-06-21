let timeDifferent;

timeDifferent = function (now, date) {
    let dateDifferent = now - date;
    let second = dateDifferent / 1000, minute = second / 60, hour = minute / 60, day = hour / 24, month = day / 30,
        year = day / 365;
    return second >= 1 && second <= 59 ?
        Math.floor(second) + ' 秒' : minute >= 1 && minute <= 59 ?
            Math.floor(minute) + ' 分钟' : hour <= 1 && hour <= 23 ?
                Math.floor(hour) + ' 小时' : day >= 1 && day <= 29 ?
                    Math.floor(day) + ' 天' : month >= 1 && month <= 11 ?
                        Math.floor(month) + ' 月' : Math.floor(year) + ' 年'
};

// console.log(timeDifferent(new Date().getTime(),1559994444434));

export {timeDifferent};