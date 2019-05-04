export class Message {

    public static formatMsgTime(dateTime: Date): string {

        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1;
        const day = dateTime.getDate();
        const hour = dateTime.getHours();
        const minute = dateTime.getMinutes();
        const now = new Date();
        const now_new = Date.parse(now.toDateString());

        let milliseconds = 0;
        let timeSpanStr;

        milliseconds = now_new - dateTime.getTime();

        if (milliseconds <= 1000 * 60 * 1) {
            timeSpanStr = '刚刚';
        } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
            timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
        } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
        } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
            timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
        } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
            timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
        } else {
            timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        }
        return timeSpanStr;
    }


    constructor(public msg: string, public time = new Date, public _timeSpan = '') { }

    isNew(): boolean {
        const now = new Date;
        return now.getTime() - this.time.getTime() < 1000 * 60 * 5;
    }

    get timeSpan(): string {
        return Message.formatMsgTime(this.time);
    }
}
