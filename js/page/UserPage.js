import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    DeviceEventEmitter,
    StyleSheet,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import { CommonStyles } from '../CommonStyles';
import RadiusButton from '../widget/RadiusButton';
import { GoBackButton } from "../widget/TitleButton";
import ReportQueryPage from './userInfo/ReportQueryPage';
import UserTopHalfPartPage from './userInfo/UserTopHalfPartPage';
import SubscriptionAndPickUpPage from './userInfo/SubscriptionAndPickUpPage';
import FundsManagementPage from './userInfo/FundsManagementPage';
import InfoManagementPage from './userInfo/InfoManagementPage';
import LoginPage from './LoginPage';

import { PageRoute } from "../App";

// 委托页面对外默认组件
export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.onPressLogin = this.onPressLogin.bind(this);
        this.onPressLogout = this.onPressLogout.bind(this);
        this.buttomPartPage = this.buttomPartPage.bind(this);
        this.changeLoginState = this.changeLoginState.bind(this);
        this.state = {
            isLogin: loginUser.isLogin(),
            page: 'ReportQueryPage',//进入个人中心后的默认页面,
            pages: {
                SubscriptionAndPickUpPage: <SubscriptionAndPickUpPage {...this.props } changeLoginState={this.changeLoginState} ></SubscriptionAndPickUpPage >,
                FundsManagementPage: <FundsManagementPage {...this.props } changeLoginState={this.changeLoginState} ></FundsManagementPage >,
                InfoManagementPage: <InfoManagementPage {...this.props } changeLoginState={this.changeLoginState} ></InfoManagementPage >,
                ReportQueryPage: <ReportQueryPage {...this.props } changeLoginState={this.changeLoginState} ></ReportQueryPage >
            },
            title: ''
        }
    }



    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    buttomPartPage(newPage) {
        this.setState({
            page: newPage,
        })
    }


    changeLoginState = (isLogin) => {
        console.log('changeLoginState1111')
        this.setState({
            isLogin: isLogin,
        })
    }

    componentWillReceiveProps = () => {
        console.log('componentWillReceiveProps');
    }
    shouldComponentUpdate = () => {
        console.log('shouldComponentUpdate');
        return true;
    }
    componentWillUpdate = () => {
        console.log('componentWillUpdate');
    }

    componentDidMount() {
        console.log('componentDidMount');
        // 注册用户状态改变监听
        this.loginUserListener = DeviceEventEmitter.addListener(OnLoginStateChanged, () => {
            // 根据用户是否登录改变页面
            this.setState({
                isLogin: loginUser.isLogin()
            })
        });
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        // 取消注册用户状态改变监听
        this.loginUserListener.remove();
    }


    render() {
        return (
            loginUser.isLogin() ? this.loginRender() : this.unLoginRender()
        );
    }

    loginRender() {
        return (
            <ScrollView style={Styles.container}>
                <View style={{ height: 20 }} />
                <UserTopHalfPartPage buttomPartPage={this.buttomPartPage} ></UserTopHalfPartPage>
                {this.state.pages[this.state.page]}
            </ScrollView>
        )
    }

    unLoginRender() {
        return (
            <LoginPage {...this.props} changeLoginState={this.changeLoginState}></LoginPage>
        )
    }

    onPressLogin() {
        const { navigate } = this.props.navigation;
        navigate(PageRoute.LoginPage);
    }

    onPressLogout() {
        loginUser.traderID = '';
        loginUser.sessionID = '';
        // 发送用户状态改变监听
        DeviceEventEmitter.emit(OnLoginStateChanged);
    }

}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: 'black',
        // height: 10,
    },
    moneyInfo: {
        alignItems: 'center',
    },
    userOperate: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'gray',
        height: 100,

    },
    userOperateItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonText: {
        color: 'white',
    },
    icon: {
        height: 25,
        width: 25,
    },
    headImage: {

    },
});