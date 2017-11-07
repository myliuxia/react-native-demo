//持仓汇总
import React, { Component } from 'react';
import {
    FlatList, StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { CommonStyles } from '../../../CommonStyles';
import { showAlert } from '../../../CommonFunctions';
import { GoBackButton } from "../../../widget/TitleButton";
import { request } from '../../../api/Server';
import { protocalPath } from '../../../api/protocalPath';
export default class PositionSummaryPage extends Component {
    constructor() {
        super();
        this.state = {
            itemName1: '山水画',
            itemName2: '总持有量',
            itemName3: '持有均价',
            itemName4: '货款',
            itemName5: '可用数量',
            itemName6: '持有盈亏',
            itemName7: '市值',
            data: [],
            currentUnWrapCardIndex:-1,
        }
    }

    getData = () => {
      console.log("getData");
      let data=[];
      let param = 'sessionId='+global.loginUser.sessionID+'&userId='+global.loginUser.traderID;
      let result = request("/m3Market/holdingQuery.action",param).then((responseJson)=>{
          console.log(responseJson);
          for(let i = 0;i<responseJson.resultList.length;i++){
            let paramString2 = param + '&commodityId=' + responseJson.resultList[i].commodityId;
            let result2 = request(protocalPath.queryCommodity, paramString2);
            data.push({
              key:i,
              key1: this.state.itemName1, key2: '13',
              key3: this.state.itemName2, key4: responseJson.resultList[i].holdTotal,
              key5: this.state.itemName3, key6: responseJson.resultList[i].buyEvenPrice,
              key7: this.state.itemName4, key8: responseJson.resultList[i].holdMargin,
              key9: this.state.itemName5, key10: responseJson.resultList[i].useTotal,
              key11: this.state.itemName6, key12: responseJson.resultList[i].lastestPL,
              key13: this.state.itemName7, key14: responseJson.resultList[i].holdMoney,
            });
            result2.then((responseJson)=>{
                if (responseJson.retcode==0){
                    console.log(responseJson);
                    this.state.data[i].key1 = responseJson.resultList[0].name;
                }
            }).catch((error)=>{
                console.log(error);
            })
          }
      }).catch((error => {
          showAlert(error.toString());
      }));
      this.setState({
        data:data,
      });
    }


    componentWillMount(){
      console.log("componentWillMount");
      console.log(global.loginUser);
      this.getData();
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '持仓汇总',
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

    //展开
    unWrap=(index)=>{
        //this.getData();//必须要给FlatList中data的重新赋值，样式才会改变，不知道为什么
        this.setState({
            currentUnWrapCardIndex: index
        })
    }
    render() {
        return (
            <View style={Styles.container}>
                <FlatList
                    ref={'flatList'}
                    data={this.state.data}
                    currentUnWrapCardIndex = {this.state.currentUnWrapCardIndex}
                    renderItem={
                        ({ item }) => <Card item={item} currentUnWrapCardIndex={this.state.currentUnWrapCardIndex} unWrap={this.unWrap}></Card>
                    }
                />
            </View>
        );
    }
}
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wrapCard:
            <TouchableOpacity style={[Styles.item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={this.props.unWrap.bind(this,this.props.item.key)}>
                <Text style={{ fontSize: 30, fontWeight: '600', color: 'white' }}>...</Text>
            </TouchableOpacity>,
            unWrapCard:
            <View>
                <View style={[Styles.item]}>
                    <Text style={Styles.hanzi}>{(this.props.item.key9)}</Text>
                    <Text style={Styles.num}>{(this.props.item.key10)}</Text>
                </View>
                <View style={[Styles.item]}>
                    <Text style={Styles.hanzi}>{(this.props.item.key11)}</Text>
                    <Text style={[Styles.num, { color: 'red' }]}>{(this.props.item.key12)}</Text>
                </View>
                <View style={[Styles.item]}>
                    <Text style={Styles.hanzi}>{(this.props.item.key13)}</Text>
                    <Text style={Styles.num}>{(this.props.item.key14)}</Text>
                </View>
            </View>,
        }
    }

    render() {
        let item = this.props.item;
        let card;
        if (this.props.currentUnWrapCardIndex == this.props.item.key){
            card = this.state.unWrapCard
        }else{
            card = this.state.wrapCard;
        }
        return (
            <View style={[Styles.card]}>
                <View style={Styles.itemHead}>
                    <Text style={[Styles.hanzi, { color: 'white' }]}>{(item.key1)}</Text>
                    <Text style={[Styles.num, { color: 'blue' }]}>{(item.key2)}</Text>
                </View>
                <View style={Styles.items}>
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
                    {card}
                </View>
            </View>
        )
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
