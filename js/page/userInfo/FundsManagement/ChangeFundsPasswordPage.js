//修改资金密码
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';

import { CommonStyles } from '../../../CommonStyles';
import { showAlert } from '../../../CommonFunctions';
import { GoBackButton } from '../../../widget/TitleButton';
import RadiusButton from "../../../widget/RadiusButton";

// 委托页面对外默认组件
export default class ChangeFundsPasswordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputOldPassword: '',
            inputPassword: '',
            inputPassword2: '',
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '修改资金密码',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
            <GoBackButton onPress={() => navigation.goBack()} />
        ),
        headerRight: (() => { }),
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

                <View style={Styles.inputLayout}>
                    <View style={[Styles.inputLayout, { marginLeft: 20, flex: 1 }]}>
                        <Text style={Styles.code}>{'旧密码'}</Text>
                    </View>
                    <TextInput placeholder='请输入旧密码'
                        style={Styles.input} maxLength={16}
                        autoCapitalize='none'
                        placeholderTextColor='white'
                        autoCorrect={false}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ inputOldPassword: text })} />
                </View>
                <View style={[Styles.inputLayout, { marginTop: 20 }]}>
                    <View style={[Styles.inputLayout, { marginLeft: 20, flex: 1 }]}>
                        <Text style={Styles.code}>{'新密码'}</Text>
                    </View>
                    <TextInput placeholder='请输入新密码'
                        style={Styles.input}
                        maxLength={16}
                        placeholderTextColor='white'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ inputPassword: text })} />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                    <View style={[Styles.inputLayout, { flex: 1 }]}>
                        <Text style={Styles.code}>{'重复新密码'}</Text>
                    </View>
                    <View style={[Styles.inputLayout, { flex: 1 }]}>
                        <TextInput placeholder='请重复输入新密码'
                            style={Styles.input}
                            maxLength={4}
                            keyboardType='numeric'
                            placeholderTextColor='white'
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ inputPassword2: text })}
                            value={this.state.inputPassword2} />
                    </View>
                </View>
                <RadiusButton style={[Styles.loginButton]} title='确定' onPress={this.onPressLogin} />
            </View>
        );
    }

    onPressLogin() {
        console.log(this.state);
        // 验证表单输入
        let username = this.state.inputOldPassword;
        if (username == null || username.length <= 0) {
            showAlert('请输入旧密码');
            return;
        }
        let password = this.state.inputPassword;
        if (password == null || password.length <= 0) {
            showAlert('请输入新密码');
            return;
        }
        let code = this.state.inputPassword2;
        if (code == null || code.length <= 0) {
            showAlert('请再次输入新密码');
            return;
        }
        if (code != this.state.currentCode) {
            this.setState({
                currentCode: this.refreshCode(),
                inputPassword2: ''
            });
            showAlert('验证码错误');
            return;
        }

    }

    refreshCode() {
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
        backgroundColor: 'black',
        borderBottomColor: 'white',
        borderBottomWidth: 1, //底部边框宽度
        borderLeftWidth: 0,  //左边边框宽度
        borderRightWidth: 0, //右边边框宽度
        borderTopWidth: 0, //顶部边框宽度
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