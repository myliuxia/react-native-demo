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
import { SubscriptionAndPickUpPage } from './SubscriptionAndPickUpPage';
import { checkLoginAndNavigate} from "../../api/Server";
import { request } from '../../api/Server';


// 委托页面对外默认组件
export default class ReportQueryPage extends Component {
    constructor(){
        super();
        this.onPressTransactionOfTheDayPage = this.onPressTransactionOfTheDayPage.bind(this);
        this.onPressDelegationPage = this.onPressDelegationPage.bind(this);
        this.onPressPositionDetailsQueryPage = this.onPressPositionDetailsQueryPage.bind(this);
        this.onPressPositionSummaryPage = this.onPressPositionSummaryPage.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
    }
    render() {
        return (
            <View style={Styles.detailOperate}>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressTransactionOfTheDayPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>当日成交查询</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressDelegationPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]} >当日委托查询</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressPositionDetailsQueryPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>持仓明细查询</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressPositionSummaryPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>持仓总汇查询</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
            </View>
        )
    }
    onPressTransactionOfTheDayPage(){
        const { navigate } = this.props.navigation;
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.TransactionOfTheDayPage, PageRoute.UserPage);
        
    }
    onPressDelegationPage(){
        console.log('onPressDelegationPage');
        const { navigate } = this.props.navigation;
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.DelegationPage, PageRoute.UserPage);
        
    }
    onPressPositionDetailsQueryPage(){
        console.log('onPressPositionDetailsQueryPage');
        const { navigate } = this.props.navigation;
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.PositionDetailsQueryPage, PageRoute.UserPage);
        
    }
    onPressPositionSummaryPage(){
        console.log('onPressPositionSummaryPage');
        const { navigate } = this.props.navigation;
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.PositionSummaryPage, PageRoute.UserPage);
        
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
        backgroundColor: 'black',
        marginLeft: 20,
        marginRight: 20,
        marginBottom:10,
    },
    detailOperateItem: {
        height:61,
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