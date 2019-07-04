let timeDifferent;

timeDifferent = function (now, date) {
    let dateDifferent = now - date;
    let second = dateDifferent / 1000, minute = second / 60, hour = minute / 60, day = hour / 24, month = day / 30,
        year = day / 365;
    return second >= 1 && second <= 59 ?
        Math.floor(second) + ' 秒前' : minute >= 1 && minute <= 59 ?
            Math.floor(minute) + ' 分钟前' : hour <= 1 && hour <= 23 ?
                Math.floor(hour) + ' 小时前' : day >= 1 && day <= 29 ?
                    Math.floor(day) + ' 天前' : month >= 1 && month <= 11 ?
                        Math.floor(month) + ' 个月前' : Math.floor(year) + ' 年前'
};

// console.log(timeDifferent(new Date().getTime(),1559994444434));

export {timeDifferent};