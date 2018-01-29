/**
 * Created by HungDang on 8/23/2017.
 */
var dateFormat = require('dateformat');
class AppUtil {
    static getStateIcon(state) {
        switch (state) {
            case 'TAT_CA':
                return require('../assets/vehicle/tat-ca-xe.png');
                break;
            case 'DI_CHUYEN':
                return require('../assets/vehicle/xanh.png');
                break;
            case 'VUOT_TOC':
                return require('../assets/vehicle/dotrang.png');
                break;
            case 'DUNG_BAT_MAY':
                return require('../assets/vehicle/vang.png');
                break;
            case 'DUNG_TAT_MAY':
                return require('../assets/vehicle/do.png');
                break;
            case 'MAT_TIN_HIEU':
                return require('../assets/vehicle/tim.png');
                break;
            case 'QUA_GIO_CHAY':
                return require('../assets/vehicle/hetgiochay.png');
                break;
        }
    }

    static dateFormat(date) {
        let restString = '';
        if (date > 0) {
            restString = dateFormat(date, 'HH:MM dd/mm');
        } else {
            restString = '00:00 00/00';
        }
        return restString;
    }

    static dateFormatString(date, format) {
        let restString = '';
        if (date > 0) {
            restString = dateFormat(date, format);
        } else {
            restString = '00:00 00/00';
        }
        return restString;
    }

    static timeStopString(milis) {
        let result = "";
        if (Math.floor(milis / 3600000) > 0) {
            result = result + Math.floor(milis / 3600000) + "Giờ " + Math.floor((milis % 3600000) / 60000) + " Phút";
        } else {
            result = result + Math.floor((milis % 3600000) / 60000) + " Phút";
        }
        return result;
    }

    static distance(lon1, lat1, lon2, lat2) {
        if (lon1 === 0 || lon2 === 0 || lat1 === 0 || lat2 === 0) {
            return 0.0;
        }
        let cosd = Math.sin(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / parseFloat(180))
            + Math.cos(lat1 * Math.PI / parseFloat(180)) * Math.cos(lat2 * Math.PI / parseFloat(180))
            * Math.cos((lon1 - lon2) * Math.PI / parseFloat(180));
        if (cosd >= 1) {
            return 0.0;
        }
        let d = Math.acos(cosd);
        let distance = d * R;
        return distance;
    }

    static toJson(response) {
        let rs;
        try {
            rs = response.json();
        }
        catch (ex) {
            rs = {
                status: false
            }
        }
        return rs;
    }

}
const R = 6372.8 * 1000;
module.exports = AppUtil;