
import { protocalPath } from './protocalPath';
import { PageRoute } from "../App";

//页面css ip端口
export const server_ip_port = '182.150.46.244:18586';
//图片服务器地址
export const img_server_url = 'http://'+server_ip_port+'/frontmobile/show/image/' ;

// 服务器地址
const server_url = 'http://182.150.46.244:8880/MarketMobileWeb/';

// 服务器地址
const server_url_webmoblie = 'http://182.150.46.244:8880/WebMoblieHttpServerCilent/';


// 请求网络方法
export function request(url, paramString) {
    console.log('request:' + server_url + url );
    console.log('request:' + paramString );
    let requestOptions = {
        method: 'POST', // 请求方式
        headers: { // 设置请求头
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: paramString
    };
    //console.log(paramString);
    let promise = fetch(server_url + url, requestOptions)
        .then((response) => {
            let responseJson = response.json()
            console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            throw error;
        });
    return promise;
}

// 请求网络方法
export function requestWebMoblie(url, paramString) {
    console.log('request:' + server_url_webmoblie + url );
    console.log('request:' + paramString );
    let requestOptions = {
        method: 'POST', // 请求方式
        headers: { // 设置请求头
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: paramString
    };
    //console.log(paramString);
    let promise = fetch(server_url_webmoblie + url, requestOptions)
        .then((response) => {
            let responseJson = response.json()
            console.log(responseJson);
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
    return promise;
}

//检查用户是否登录，并根据用户是否登录跳转不同页面
//checkLoginAndNavigate参数接收一个方法，让调用者更新state，以便组件重新render
export function checkLoginAndNavigate(navigate, changeLoginState, pageForLogin, pageForUnlogin) {
    checkLoginStateOnline().then((loginState) => {
        if (loginState) {
            navigate(pageForLogin);
        } else {
            changeLoginState(loginState);
            navigate(pageForUnlogin);
        }
        return loginState;
    })
}

//连接服务端检查是否登录
export function checkLoginStateOnline() {
    console.log('checkLoginStateOnline');
    let paramString = 'userId=' + global.loginUser.traderID + '&sessionId=' + global.loginUser.sessionID;
    let response = request(protocalPath.checkUser, paramString);
    return response.then((responseJson) => {
        console.log('登录状态retcode:' + responseJson.retcode);
        if (responseJson.retcode == global.loginUser.sessionID) {
            return true;
        } else {//如果发现在服务端该用户已经处于下线状态，则将本地用户信息清空
            global.loginUser = {
                traderID: '', // 交易员ID
                sessionID: '', // sessionID
                password: '',
                isLogin: () => loginUser.sessionID.length > 0 && loginUser.traderID.length > 0
            }
            return false;
        }
    });
}
