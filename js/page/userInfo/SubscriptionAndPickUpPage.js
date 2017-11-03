import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { CommonStyles } from '../../CommonStyles';
import { PageRoute } from "../../App";



// 委托页面对外默认组件
export default class SubscriptionAndPickUpPage extends Component {
    componentWillReceiveProps(newProps) {
        console.log(newProps);
    }
    render() {

        return (
            <View style={Styles.detailOperate}>
                <View style={[Styles.card]}>
                    <View style={[Styles.headText]}>
                        <Text style={Styles.commonText}>发行申购</Text>
                    </View>
                    <View style={[Styles.operateItems]}>
                        <View style={[Styles.detailOperateItem]}>
                            <Image source={require('../../img/icon/money.png')} style={[Styles.icon]} ></Image>
                            <Text style={Styles.commonText}>申请购买</Text>
                        </View>
                        <View style={[Styles.detailOperateItem]}>
                            <Image source={require('../../img/icon/money.png')} style={[Styles.icon]} ></Image>
                            <Text style={Styles.commonText}>增发配售</Text>
                        </View>
                        <View style={[Styles.detailOperateItem]}>
                            <Image source={require('../../img/icon/money.png')} style={[Styles.icon]} ></Image>
                            <Text style={Styles.commonText}>申购查询</Text>
                        </View>
                        <View style={[Styles.detailOperateItem]}>
                            <Image source={require('../../img/icon/money.png')} style={[Styles.icon]} ></Image>
                            <Text style={Styles.commonText}>历史配售</Text>
                        </View>
                    </View>
                </View>

                <View style={[Styles.card, { flex: 1 }]}>
                    <View style={[Styles.headText]}>
                        <Text style={Styles.commonText}>提货单管理</Text>
                    </View>
                    <View style={[Styles.operateItems]}>
                        <View style={[Styles.detailOperateItem]}>
                            <Image source={require('../../img/icon/money.png')} style={[Styles.icon]} ></Image>
                            <Text style={Styles.commonText}>提货单注册</Text>
                        </View>
                        <View style={[Styles.detailOperateItem]}>
                            <Image source={require('../../img/icon/money.png')} style={[Styles.icon]} ></Image>
                            <Text style={Styles.commonText}>提货单过户</Text>
                        </View>
                        <View style={[Styles.detailOperateItem]}>
                            <Image source={require('../../img/icon/money.png')} style={[Styles.icon]} ></Image>
                            <Text style={Styles.commonText}>提货单查询</Text>
                        </View>
                        <View style={[Styles.detailOperateItem]}>
                            <Image source={require('../../img/icon/money.png')} style={[Styles.icon]} ></Image>
                            <Text style={Styles.commonText}>费用查询</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
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
    detailOperate: {
        backgroundColor: 'black',
        marginLeft: 20,
        marginRight: 20,
    },
    headText: {
        alignItems: 'center',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        borderStyle: 'solid',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:10,
        marginRight:10,
    },
    card: {
        flexDirection: 'column',
        flex: 1,
        borderRadius: 8,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 10,
        backgroundColor:'#1f252b'
        
    },
    operateItems: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        height: 115,
        marginLeft: 10,
        marginRight: 10,
    },
    detailOperateItem:{
        alignItems: 'center',
        justifyContent: 'center', 
    },
    detailOperateText: {
        paddingLeft: 10,
    }
});