import {
    Alert,
} from 'react-native';

function showAlert(message, title = '提示信息'){
    Alert.alert(
        title,
        message,
        [
            { text: '确定' }
        ],
        { cancelable: true }
    )
}

function showConfirm(message, title = '提示信息',cancel,confirm) {
    Alert.alert(
        title,
        message,
        [
            { text: '取消', onPress: cancel },
            { text: '确定', onPress: confirm },

        ],
        { cancelable: true }
    )
}

/**
 * 根据后台获取的时间戳，生成日期（格式：yyyy-hh-dd HH:mm）
 * @param timestamp 时间戳
 * @returns {string} 日期时间：yyyy-hh-dd HH:mm
 */
function getDate(timestamp){

    let unixTimestamp = new Date(timestamp) ;
    let commonTime = unixTimestamp.toLocaleString();
    Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes();
    };
    return commonTime;
}



export { showAlert, getDate, showConfirm};