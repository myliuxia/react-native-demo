import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { CommonStyles } from '../../CommonStyles';
import { PageRoute } from "../../App";
import { checkLoginAndNavigate } from "../../api/Server";
import FundsQueryPage from './FundsManagement/FundsQueryPage';



// 委托页面对外默认组件
export default class FundsManagementPage extends React.Component {
    constructor() {
        super();
        this.onPressFundsQueryPage = this.onPressFundsQueryPage.bind(this);
        this.onPressDepositAndWithdrawPage = this.onPressDepositAndWithdrawPage.bind(this);
        this.onPressBalanceEnquiryPage = this.onPressBalanceEnquiryPage.bind(this);
        this.onPressChangeFundsPasswordPage = this.onPressChangeFundsPasswordPage.bind(this);
    }
    render() {
        return (
            <View style={Styles.detailOperate}>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressFundsQueryPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>资金查询</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressDepositAndWithdrawPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>出入金</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressBalanceEnquiryPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>余额查询</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.detailOperateItem]}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>流水查询</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressChangeFundsPasswordPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>修改资金密码</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
            </View>
        )
    }


    onPressFundsQueryPage() {
        const { navigate } = this.props.navigation;
        //navigate(PageRoute.FundsQueryPage);
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.FundsQueryPage, PageRoute.UserPage);
    }
    onPressDepositAndWithdrawPage(){
        const { navigate } = this.props.navigation;
        //navigate(PageRoute.DepositAndWithdrawPage);
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.DepositAndWithdrawPage,PageRoute.UserPage);
    }
    onPressBalanceEnquiryPage(){
        const { navigate } = this.props.navigation;
        //navigate(PageRoute.BalanceEnquiryPage);
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.BalanceEnquiryPage,PageRoute.UserPage);
    }
    onPressChangeFundsPasswordPage(){
        const { navigate } = this.props.navigation;
        //navigate(PageRoute.ChangeFundsPasswordPage);
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.ChangeFundsPasswordPage,PageRoute.UserPage);
    }
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
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
        fontSize: 16,
        fontWeight: '600',
    },
    icon: {
        height: 25,
        width: 25,
    },
    headImage: {

    },
    detailOperate: {
        //flex: 6,
        backgroundColor: 'black',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    detailOperateItem: {
        //flex: 1,
        height: 61,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 0.3,
        marginTop: 10,
        justifyContent: 'space-between',
        backgroundColor: '#1f252b',
    },
    detailOperateText: {
        paddingLeft: 10,
    }
});