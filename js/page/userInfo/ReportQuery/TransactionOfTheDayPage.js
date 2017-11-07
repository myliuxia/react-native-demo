//当日成交
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View ,Image} from 'react-native';
import { CommonStyles } from '../../../CommonStyles';
import { showAlert } from '../../../CommonFunctions';
import { GoBackButton } from "../../../widget/TitleButton";
import { request } from '../../../api/Server';
import { protocalPath } from '../../../api/protocalPath';

export default class TransactionOfTheDayPage extends Component {
    constructor() {
        super();
        this.state = {
            itemName1: '成交价格',
            itemName2: '成交数量',
            itemName3: '卖出盈亏',
            itemName4: '成交单号',
            itemName5: '委托单号',
            itemName6: '时间',
            itemName7: '成本价',
            itemName8: '费用',
            data: [],
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '当日成交',
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerBackTitleStyle: {
            color: 'white',
            fontSize: 14
        },
        headerLeft: (
            <GoBackButton onPress={() => navigation.goBack()} />
        ),
        headerRight: (() => { }),
    });


    fetchData=()=>{
        let paramString = 'sessionId=' + global.loginUser.sessionID + '&userId=' + global.loginUser.traderID +'&lastTradeId=0';
        console.log(paramString);
        let result = request(protocalPath.queryTrade, paramString);
        result.then((responseJson) => {
            console.log(responseJson);
            let data = [];
            for (let i = 0; i < responseJson.resultList.length; i++) {
                data.push({
                    key: i,
                    key0: responseJson.resultList[i].commodityID,
                    key1: this.state.itemName1, key2: responseJson.resultList[i].price,
                    key3: this.state.itemName2, key4: responseJson.resultList[i].quantity,
                    key5: this.state.itemName3, key6: responseJson.resultList[i].closePL,
                    key7: this.state.itemName4, key8: responseJson.resultList[i].tradeNo,
                    key9: this.state.itemName5, key10: responseJson.resultList[i].orderNo,
                    key11: this.state.itemName6, key12: responseJson.resultList[i].tradeTime,
                    key13: this.state.itemName7, key14: responseJson.resultList[i].holdPrice,
                    key15: this.state.itemName8, key16: responseJson.resultList[i].tradeFee,
                });
            }
            this.setState({
                data:data
            })
        }).catch((error => {
            showAlert(error.toString());
        }))
    }


    componentWillMount=()=>{
        console.log('当日成交');
        this.fetchData();
    }

    noData=()=>{
        return(
            <View style={[Styles.container, { flex: 1, alignItems: 'center'}]}>
                <Image source={require('../../../img/icon/order.png')} style={{ width: 85, height: 85,marginTop:50, marginBottom: 10 }}></Image>
                <Text style={[Styles.hanzi]}>您还没有当日成交</Text>
            </View>
        )
        
    }

    hasData=()=>{
        return (
        <View style={Styles.container}>
            <FlatList
                data={this.state.data}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={({ item }) =>
                    <View style={[Styles.card]}>
                        <View style={Styles.itemHead}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ backgroundColor: '#63B8FF', borderRadius: 3, fontSize: 16, color: 'white', marginRight: 10 }}> 卖 </Text>
                            </View>
                            <Text style={[Styles.num, { color: 'white' }]}>{item.key0}</Text>
                        </View>
                        <View style={Styles.items}>
                            <View style={Styles.item}>
                                <Text style={Styles.hanzi}>{(item.key1)}</Text>
                                <Text style={Styles.num}>{item.key2}</Text>
                            </View>
                            <View style={Styles.item}>
                                <Text style={Styles.hanzi}>{(item.key3)}</Text>
                                <Text style={Styles.num}>{(item.key4)}</Text>
                            </View>
                            <View style={Styles.item}>
                                <Text style={Styles.hanzi}>{(item.key5)}</Text>
                                <Text style={Styles.num}>{(item.key6)}</Text>
                            </View>
                            <View style={[Styles.item]}>
                                <Text style={Styles.hanzi}>{(item.key7)}</Text>
                                <Text style={Styles.num}>{(item.key8)}</Text>
                            </View>
                            <View style={[Styles.item]}>
                                <Text style={Styles.hanzi}>{(item.key9)}</Text>
                                <Text style={Styles.num}>{(item.key10)}</Text>
                            </View>
                            <View style={[Styles.item]}>
                                <Text style={Styles.hanzi}>{(item.key11)}</Text>
                                <Text style={Styles.num}>{(item.key12)}</Text>
                            </View>
                            <View style={[Styles.item]}>
                                <Text style={Styles.hanzi}>{(item.key13)}</Text>
                                <Text style={Styles.num}>{(item.key14)}</Text>
                            </View>
                            <View style={[Styles.item]}>
                                <Text style={Styles.hanzi}>{(item.key15)}</Text>
                                <Text style={Styles.num}>{(item.key16)}</Text>
                            </View>
                        </View>
                    </View>}
            />
        </View>)
        
    }

    render() {
        return(this.state.data.length > 0?this.hasData():this.noData());
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    card: {
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: '#3B3B3B',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        flex: 0.4,
    },
    itemHead: {
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
    },
    items: {
        flex: 3,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    hanzi: {
        color: 'gray',
        fontSize: 16
    },
    num: {
        color: 'white',
        fontSize: 16
    },
});