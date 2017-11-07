import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { PageRoute } from "../../App";
import { checkLoginAndNavigate } from "../../api/Server";




// 委托页面对外默认组件
export default class InfoManagementPage extends Component {
    constructor(props) {
        super(props);
        this.onPressUserInfoPage = this.onPressUserInfoPage.bind(this);
        this.onPressChangePasswordPage = this.onPressChangePasswordPage.bind(this);
    }
    componentWillReceiveProps(newProps) {
        console.log(newProps);
    }
    render() {
        return (
            <View style={Styles.detailOperate}>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressUserInfoPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]}>个人信息</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={[Styles.detailOperateItem]} onPress={this.onPressChangePasswordPage}>
                    <Text style={[Styles.commonText, Styles.detailOperateText]} >修改密码</Text>
                    <Image source={require('../../img/icon/more-white.png')} style={[Styles.icon]}></Image>
                </TouchableOpacity>
            </View>
        )
    }
    //checkLoginAndNavigate方法接收this.props.changeLoginState是为了更新父组件state，以便让父组件重新render
    onPressUserInfoPage(){
        const { navigate } = this.props.navigation;
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.UserInfoPage, PageRoute.UserPage);
    }
    onPressChangePasswordPage(){
        console.log('onPressChangePasswordPage');
        const { navigate } = this.props.navigation;
        checkLoginAndNavigate(navigate, this.props.changeLoginState, PageRoute.ChangePasswordPage, PageRoute.UserPage);
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
    },
    detailOperateItem: {
        //flex: 1,
        height: 61,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: 'white',
        borderStyle:'solid',
        borderWidth:0.3,
        marginTop: 10,
        justifyContent: 'space-between',
        backgroundColor: '#1f252b',
    },
    detailOperateText: {
        paddingLeft: 10,
    }
});