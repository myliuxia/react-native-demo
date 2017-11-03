import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Alert,
    DeviceEventEmitter,
    TouchableHighlight
} from 'react-native';

import { protocalPath } from '../api/protocalPath';
import { CommonStyles } from "../CommonStyles";
import { showAlert } from "../CommonFunctions";
import { GoBackButton } from "../widget/TitleButton";
import RadiusButton from "../widget/RadiusButton";
import { request } from '../api/Server';
import { PageRoute } from "../App";

// 委托页面对外默认组件
export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputUsername: '',
            inputPassword: '',
            inputCode: '',
            currentCode: ''
        };

        // 生成随机验证码
        this.state.currentCode = this.refreshCode();
        this.onPressLogin = this.onPressLogin.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        // headerStyle: CommonStyles.headerStyle,
        // headerTitle: '用户登录',
        // headerTitleStyle: CommonStyles.headerTitleStyle,
        // headerLeft: (
        //     <GoBackButton onPress={() => navigation.goBack()} />
        // ),
        // headerRight: (() => { }),
        header: null
    });

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    render() {
        return (
            <View style={Styles.container}>
                <View style={[Styles.inputLayout]}>
                    <Image source={require('../img/icon/ic_login_username.png')} style={Styles.icon} />
                    <TextInput placeholder='请输入交易账号'
                        style={Styles.input} maxLength={16}
                        autoCapitalize='none'
                        placeholderTextColor='white'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ inputUsername: text })} />
                </View>
                <View style={[Styles.inputLayout, { marginTop: 20 }]}>
                    <Image source={require('../img/icon/ic_login_password.png')} style={Styles.icon} />
                    <TextInput placeholder='请输入交易密码'
                        style={Styles.input} maxLength={16}
                        secureTextEntry={true}
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ inputPassword: text })} />
                </View>
                <View style={{
                    flexDirection: 'row', marginTop: 20, borderStyle: 'solid',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'white'
                }}>
                    <Image source={require('../img/icon/ic_login_password.png')} style={[Styles.icon]} />
                    <View style={[{
                        height: 40,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center', flex: 1
                    }]}>
                        <TextInput placeholder='请输入验证码' style={[Styles.input]}
                            maxLength={4} keyboardType='numeric'
                            placeholderTextColor='white'
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ inputCode: text })}
                            value={this.state.inputCode} />
                    </View>
                    <TouchableHighlight style={[{
                        height: 40,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center', marginLeft: 20, flex: 1
                    }]} onPress={() => { this.setState({ currentCode: this.refreshCode() }) }}>
                        <Text style={Styles.code}>{this.state.currentCode}</Text>
                    </TouchableHighlight>
                </View>
                <RadiusButton style={Styles.loginButton} title='登录' onPress={this.onPressLogin} />
            </View>
        );
    }

    onPressLogin() {
        console.log('onPressLogin');
        //验证表单输入
        // let username = this.state.inputUsername;
        // if (username == null || username.length <= 0) {
        //     showAlert('请输入交易账号');
        //     return;
        // }
        // let password = this.state.inputPassword;
        // if (password == null || password.length <= 0) {
        //     showAlert('请输入密码');
        //     return;
        // }
        // let code = this.state.inputCode;
        // if (code == null || code.length <= 0) {
        //     showAlert('请输入验证码');
        //     return;
        // }
        // if (code != this.state.currentCode) {
        //     this.setState({
        //         currentCode: this.refreshCode(),
        //         inputCode: ''
        //     });
        //     showAlert('验证码错误');
        //     return;
        // }
        // let paramString = 'userId=' + username + '&password=' + password;
        // let result = request(protocalPath.userLogin, paramString);
        // result.then((responseJson) => {
        //     if (responseJson.name == username) {
        //         global.loginUser = {
        //             traderID: responseJson.name, // 交易员ID
        //             sessionID: responseJson.retcode, // sessionID
        //             password: password,
        //             lastTime: responseJson.lastTime,
        //             isLogin: () => loginUser.sessionID.length > 0 && loginUser.traderID.length > 0
        //         }
        //         this.props.changeLoginState(global.loginUser.isLogin());
        //         const { navigate } = this.props.navigation;
        //         navigate(PageRoute.UserPage);
        //     } else {
        //         this.setState({
        //             currentCode: this.refreshCode(),
        //         })
        //         showAlert(responseJson.message);
        //     }
        //     console.log(responseJson);
        // })
        //     .catch((error => {
        //         this.setState({
        //             currentCode: this.refreshCode(),
        //         })
        //         showAlert(error.toString());

        //     }))
        let paramString = 'userId=' + '111111000005' + '&password=' + '111111';
        let result = request(protocalPath.userLogin, paramString);
        result.then((responseJson) => {
            if (responseJson.name == '111111000005') {
                global.loginUser = {
                    traderID: responseJson.name, // 交易员ID
                    sessionID: responseJson.retcode, // sessionID
                    password: '111111',
                    lastTime: responseJson.lastTime,
                    isLogin: () => loginUser.sessionID.length > 0 && loginUser.traderID.length > 0
                }
                this.props.changeLoginState(global.loginUser.isLogin());
                const { navigate } = this.props.navigation;
                navigate(PageRoute.UserPage);
            } else {
                this.setState({
                    currentCode: this.refreshCode(),
                })
                showAlert(responseJson.message);
            }
            console.log(responseJson);
        })


    }

    refreshCode = () => {
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += parseInt(Math.random() * 10);
        }
        this.state.currentCode = code;
        return code;
    }


}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50
    },
    inputLayout: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 0.5,
        borderBottomColor: 'white'
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: 'white',

    },
    divider: {
        width: 2,
        backgroundColor: 'white',
        height: 40
    },
    code: {
        fontSize: 20,
        color: 'gray'
    },
    loginButton: {
        marginTop: 50,
        height: 50,
        backgroundColor: '#1E90FF'
    }

});