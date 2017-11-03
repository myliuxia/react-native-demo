import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { CommonStyles } from '../../CommonStyles';
import { PageRoute } from "../../App";
import { request } from '../../api/Server';
import { protocalPath } from '../../api/protocalPath';

// 委托页面对外默认组件
export default class UserTopHalfPartPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            useFunds: 0,
        }
        this.onPressReportQuery = this.onPressReportQuery.bind(this);
        this.onPressSubscriptionAndPickUp = this.onPressSubscriptionAndPickUp.bind(this);
        this.onPressFundsManagement = this.onPressFundsManagement.bind(this);
        this.onPressInfoManagement = this.onPressInfoManagement.bind(this);
    }
    fetchData = () => {
        let paramString = 'sessionId=' + global.loginUser.sessionID + '&userId=' + global.loginUser.traderID;
        console.log(paramString + '个人信息');
        let result = request(protocalPath.firmInfo, paramString);
        result.then((responseJson) => {
            console.log(responseJson);
            if (responseJson.retcode == 0) {
                this.setState({
                    useFunds: responseJson.useFunds,
                })
            }
        }).catch((error => {
            showAlert(error.toString());
        }))
    }
    componentWillMount = () => {
        this.fetchData();
    }

    render() {
        return (
            <View style={{ flex: 3.5}}>
                <View style={Styles.moneyInfo}>
                    <Image source={require('../../img/f5.png')} style={[Styles.headImage]} />
                    <Text style={Styles.commonText}> {this.state.useFunds}</Text>
                    <Text style={Styles.commonText}> 可用资金（元）</Text>
                </View>
                <View style={[Styles.userOperate]}>
                    <TouchableHighlight onPress={this.onPressSubscriptionAndPickUp} style={{ flex: 1 }}>
                        <View style={[Styles.userOperateItem]}>
                            <Image source={require('../../img/icon/fahuo.png')} style={[Styles.icon]} />
                            <Text style={Styles.commonText}> 申购提货</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressReportQuery} style={{ flex: 1 }}>
                        <View style={[Styles.userOperateItem]}>
                            <Image source={require('../../img/icon/search.png')} style={[Styles.icon]} />
                            <Text style={Styles.commonText}> 报表查询</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressFundsManagement} style={{ flex: 1 }}>
                        <View style={[Styles.userOperateItem]}>
                            <Image source={require('../../img/icon/renminbi.png')} style={[Styles.icon]} />
                            <Text style={Styles.commonText}> 资金管理</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressInfoManagement} style={{ flex: 1 }}>
                        <View style={[Styles.userOperateItem]}>
                            <Image source={require('../../img/icon/Viewlist.png')} style={[Styles.icon]} />
                            <Text style={Styles.commonText}> 信息管理</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )

    }

    onPressSubscriptionAndPickUp() {
        this.props.buttomPartPage('SubscriptionAndPickUpPage');
    }
    onPressReportQuery() {
        this.props.buttomPartPage('ReportQueryPage');
    }
    onPressFundsManagement() {
        this.props.buttomPartPage('FundsManagementPage');
    }
    onPressInfoManagement() {
        this.props.buttomPartPage('InfoManagementPage');
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
        flex: 2.5,
        marginBottom: 20
    },
    userOperate: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#393d43',
        height: 100,

    },
    userOperateItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commonText: {
        color: 'white',
        fontSize:16,
        fontWeight:'600',
    },
    icon: {
        height: 32,
        width: 32,
        marginBottom:5
    },
    headImage: {
  
    },
});