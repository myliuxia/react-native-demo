import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image
} from 'react-native';

import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import Index from './page/Index';
import NewsPage from './page/NewsPage';
import UserPage from './page/UserPage';
import OrderDetailPage from './page/OrderDetailPage';
import LoginPage from './page/LoginPage';
import SearchPage from './page/SearchPage'
import ChangePasswordPage from './page/ChangePasswordPage';
import ReportQueryPage from './page/userInfo/ReportQueryPage';
import SubscriptionAndPickUpPage from './page/userInfo/SubscriptionAndPickUpPage';
import UserTopHalfPartPage from './page/userInfo/UserTopHalfPartPage';

import FundsQueryPage from './page/userInfo/FundsManagement/FundsQueryPage';
import DepositAndWithdrawPage from './page/userInfo/FundsManagement/DepositAndWithdrawPage'
import BalanceEnquiryPage from './page/userInfo/FundsManagement/BalanceEnquiryPage'
import ChangeFundsPasswordPage from './page/userInfo/FundsManagement/ChangeFundsPasswordPage'



import UserInfoPage from './page/userInfo/InfoManagement/UserInfoPage';

import DelegationPage from './page/userInfo/ReportQuery/DelegationPage';
import TransactionOfTheDayPage from './page/userInfo/ReportQuery/TransactionOfTheDayPage';
import PositionSummaryPage from './page/userInfo/ReportQuery/PositionSummaryPage';
import PositionDetailsQueryPage from './page/userInfo/ReportQuery/PositionDetailsQueryPage';
import BuyAndSellPage from './page/BuyAndSellPage'
import CommoditySortPage from './page/CommoditySortPage'
import InformationlistPage from './page/news/InformationlistPage';
import InvestmentlistPage from './page/news/InvestmentlistPage';
import InformationDetailPage from './page/news/InformationDetailPage';
import InvestmentDetailPage from './page/news/InvestmentDetailPage';
import WebViewPage from './page/WebViewPage';
import {CommonColors} from './CommonStyles';
import NoticeListPage from "./page/notice/NoticeListPage";
import NoticeDetailPage from "./page/notice/NoticeDetailPage";

if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        debug: () => {
        },
        error: () => {
        },
    };
}

// 定义全局登录用户变量
global.loginUser = {
    traderID: '', // 交易员ID
    sessionID: '', // sessionID
    password:'',
    lastTime:'',
    isLogin: () => loginUser.sessionID.length > 0 && loginUser.traderID.length > 0
}


// 定义全局用户登录状态改变监听标识
global.OnLoginStateChanged = 'OnLoginStateChanged';

// 定义图标高度与宽度
const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
    },
});

// 定义主界面Tab组件
const MainPage = TabNavigator({
    HomePage: { // 首页
        screen: Index,
        arguments: {
            xx: 'fff'
        },
        navigationOptions: {
            lazy:true,
            tabBarLabel: '首页',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/icon/home.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />),
        },
    },
    SellPage: { // 买卖
        screen: BuyAndSellPage,
        navigationOptions: {
            tabBarLabel: '买卖',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/icon/sell.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />),
        }
    },
    NewsPage: { // 资讯
        screen: NewsPage,
        navigationOptions: {
            tabBarLabel: '资讯',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/icon/store.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />),
        },
    },
    UserPage: { // 个人
        screen: UserPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/icon/mine.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />),
        },
    }
}, {
    lazy:true,//是否根据需要懒惰呈现标签，而不是提前，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐为true
    swipeEnabled:false,//是否滑动切换
    tabBarPosition: 'bottom', // 居下
    animationEnabled: false, // 无切换动画
    tabBarOptions: {
        activeBackgroundColor: CommonColors.ThemeBgColor, // 选中时背景
        activeTintColor: CommonColors.ActiveColor, // 选中时颜色
        inactiveBackgroundColor: CommonColors.ThemeBgColor, // 未选中背景
        inactiveTintColor: 'white', // 未选中颜色
        showIcon: true, // 是否显示图标 Android默认为false
        showLabel: true, // 是否显示标签
        indicatorStyle: { // Android指示器样式
            height: 0, // 为0时去掉指示器
        },
        style: { // TabBar整体样式
            height: 50,
            backgroundColor: CommonColors.ThemeBgColor,
            borderTopColor: CommonColors.BorderColor,
            borderTopWidth: 1,
        },
        iconStyle: { // 图标样式
            margin: 0,
        },
        labelStyle: { // 标签样式
            margin: 0, // 这里设置为0，否则label和icon有一个间距
        }
    }
});

// 定义导航控件
export const FrontReact = StackNavigator({
    MainPage: {screen: MainPage},
    OrderDetailPage: {screen: OrderDetailPage},
    LoginPage: {screen: LoginPage},
    SearchPage: {screen: SearchPage},
    ChangePasswordPage:{screen:ChangePasswordPage},
    ReportQueryPage: { screen: ReportQueryPage },
    SubscriptionAndPickUpPage: { screen:SubscriptionAndPickUpPage},
    UserTopHalfPartPage: { screen: UserTopHalfPartPage},
    //资金管理
    FundsQueryPage: { screen: FundsQueryPage},
    DepositAndWithdrawPage: { screen: DepositAndWithdrawPage},
    BalanceEnquiryPage: { screen: BalanceEnquiryPage},
    ChangeFundsPasswordPage: { screen: ChangeFundsPasswordPage},
    //信息管理
    UserInfoPage: { screen: UserInfoPage},
    //报表查询
    DelegationPage: { screen: DelegationPage},
    TransactionOfTheDayPage: { screen: TransactionOfTheDayPage},
    PositionSummaryPage: { screen: PositionSummaryPage},
    PositionDetailsQueryPage: { screen: PositionDetailsQueryPage},
    BuyAndSellPage:{screen:BuyAndSellPage},
    InvestmentlistPage:{screen:InvestmentlistPage},
    InformationlistPage:{screen:InformationlistPage},
    InformationDetailPage:{screen:InformationDetailPage},
    InvestmentDetailPage:{screen:InvestmentDetailPage},
    CommoditySortPage:{screen:CommoditySortPage},

    //公告页面
    NoticeListPage:{screen:NoticeListPage},
    NoticeDetailPage:{screen:NoticeDetailPage},


    //显示网页页面
    WebViewPage:{screen:WebViewPage}
});

// 页面路由，其他页面统一使用该处定义的页面常量跳转
export const PageRoute = {
    MainPage: 'MainPage',
    HomePage: 'HomePage',
    BuyPage: 'BuyPage',
    SellPage: 'SellPage',
    NewsPage: 'NewsPage',
    UserPage: 'UserPage',
    OrderDetailPage: 'OrderDetailPage',
    LoginPage: 'LoginPage',
    SearchPage: 'SearchPage',
    ChangePasswordPage: 'ChangePasswordPage',
    ReportQueryPage:'ReportQueryPage',
    SubscriptionAndPickUpPage:'SubscriptionAndPickUpPage',
    UserTopHalfPartPage:'UserTopHalfPartPage',

    FundsQueryPage:'FundsQueryPage',
    DepositAndWithdrawPage:'DepositAndWithdrawPage',
    BalanceEnquiryPage:'BalanceEnquiryPage',
    ChangeFundsPasswordPage:'ChangeFundsPasswordPage',

    UserInfoPage:'UserInfoPage',

    DelegationPage:'DelegationPage',
    TransactionOfTheDayPage:'TransactionOfTheDayPage',
    PositionSummaryPage:'PositionSummaryPage',
    PositionDetailsQueryPage:'PositionDetailsQueryPage',
    BuyAndSellPage: 'BuyAndSellPage',
    InvestmentlistPage:'InvestmentlistPage',
    InformationlistPage:'InformationlistPage',
    InformationDetailPage:'InformationDetailPage',
    InvestmentDetailPage:'InvestmentDetailPage',
    CommoditySortPage:'CommoditySortPage',
    NoticeListPage:'NoticeListPage',
    NoticeDetailPage:'NoticeDetailPage',
    WebViewPage:'WebViewPage',
}

AppRegistry.registerComponent('FrontReact', () => FrontReact);
