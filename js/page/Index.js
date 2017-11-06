import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    DeviceEventEmitter,
    Text,
    ScrollView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';
import { PageRoute } from '../App.js';
import {CommonStyles,CommonColors } from '../CommonStyles';
import {IconButton} from "../widget/TitleButton";
import {SwiperView} from "../widget/Swiper";
import ScrollVertical from "../widget/ScrollVertical";
import {MenuButton} from '../widget/MenuButton';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {requestWebMoblie,img_server_url} from '../api/Server';
import { protocalPath } from '../api/protocalPath';

import {HotList} from '../widget/HotList';
const { width , height } = Dimensions.get("window");
// 委托页面对外默认组件
export default class Index extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLogin: loginUser.isLogin(),
            hotHs:{color:CommonColors.ActiveColor},
            hotCj:{color:CommonColors.white},
            hotList1:{flex:1,paddingHorizontal:0},
            hotList2:{width:0,paddingHorizontal:0},
        }
        this._onHotTab = this._onHotTab.bind(this);
    }

    static navigationOptions = ({navigation, screenProps}) =>({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: "首页",
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (
            <IconButton
                iconStyle={{height:25,width:25,tintColor:"#FFFFFF"}}
                source={require('../img/icon/header_search.png')}
                onPress={() => navigation.navigate(PageRoute.SearchPage)}/>
        ),
        headerRight: (
            loginUser.isLogin() ?
            <IconButton
                iconStyle={{height:25,width:25,tintColor:"#FFFFFF"}}
                source={require('../img/icon/screen.png')}
                onPress={() => navigation.navigate(PageRoute.CommoditySortPage)}/>
            :
            <IconButton
                iconStyle={{height:25,width:25,tintColor:"#FFFFFF"}}
                source={require('../img/icon/login.png')}
                onPress={() => navigation.navigate(PageRoute.UserPage)}/>
        ),

    })


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





    _onHotTab(index){
        switch(index) {
            case 0:
                this.setState({
                    hotTapUnderline:{left:0},
                    hotList1:{flex:1,paddingHorizontal:0},
                    hotList2:{width:0,paddingHorizontal:0},
                    hotHs:{color:CommonColors.ActiveColor},
                    hotCj:{color:CommonColors.white},
                });
                break;
            case 1:
                this.setState({
                    hotTapUnderline:{left:width/2},
                    hotList1:{width:0,paddingHorizontal:0},
                    hotList2:{flex:1,paddingHorizontal:0},
                    hotHs:{color:CommonColors.white},
                    hotCj:{color:CommonColors.ActiveColor},
                });
                break;
            default:
                this.setState({
                    hotTapUnderline:{left:0},
                    hotList1:{flex:1,paddingHorizontal:0},
                    hotList2:{width:0,paddingHorizontal:0},
                    hotHs:{color:CommonColors.ActiveColor},
                    hotCj:{color:CommonColors.white},
                });
                break;
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>

                <SwiperView navigation={this.props.navigation}/>

                <IndexMenu navigation={this.props.navigation}/>

                <NoticeView navigation={this.props.navigation}/>

                <IndexHotCommodity navigation={this.props.navigation}/>

                <View style={styles.hotView}>
                    <View style={styles.scrollTab}>
                        <TouchableOpacity style={styles.scrollTabBtn}
                            onPress={()=>{InteractionManager.runAfterInteractions(()=>{this._onHotTab(0);});}} >
                            <Text style={[styles.tabText,this.state.hotHs]}>换手率</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.scrollTabBtn}
                             onPress={()=>{InteractionManager.runAfterInteractions(()=>{this._onHotTab(1);});}} >
                            <Text style={[styles.tabText,this.state.hotCj]}>成交额</Text>
                        </TouchableOpacity>
                        <View style={[styles.UnderlineStyle,this.state.hotTapUnderline]}/>
                    </View>
                    <View style={styles.scrollContainer}>
                        <View style={[this.state.hotList1,styles.hotListStyle]}>
                            <HotList keyStyle = {'turnoverRateCommodities'}  navigation = {this.props.navigation} />

                        </View>
                        <View style={[this.state.hotList2,styles.hotListStyle]}>
                            <HotList keyStyle = {'totalMoneyCommodities'}  navigation = {this.props.navigation} />
                        </View>

                    </View>
                </View>

            </ScrollView>
        );
    }

}

export class IndexHotCommodity extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hotList: [],
            refreshState:RefreshState.Idle,
        }

    }
    componentDidMount() {
        //加载数据
        this.getHotList();
    }
    _keyExtractor = (item, index) => item.commodityId;

    getHotList = () =>{
        this.setState({refreshState:RefreshState.FooterRefreshing,})
        let params = '';
        let result = requestWebMoblie(protocalPath.hotCommodity, params);
        result.then((responseJson) => {
            if(responseJson && responseJson.length>0){
                for(let i=0;i<responseJson.length;i++){
                    if(responseJson[i].pictures.length>0){
                        responseJson[i].pictureURL={uri:img_server_url+responseJson[i].pictures[0].pictureURL}
                    }else{
                        responseJson[i].pictureURL={uri:img_server_url+'null'}
                    }
                }
                //console.log(responseJson);
                this.setState({
                    hotList: responseJson,
                    refreshState:RefreshState.Idle,
                })
            }else{
                this.setState({
                    refreshState:RefreshState.NoMoreData,
                })
            }

        }).catch((error => {
            this.setState({refreshState: RefreshState.Failure})
            console.log(error.toString());
        })).done();
    }

    render(){
        return(
            <View style={{width:width,marginTop:10,}}>
                <View style={hotStyles.hotTitle}><Text style={hotStyles.hotTitleText}>热门商品</Text></View>
                <RefreshListView
                    keyExtractor={this._keyExtractor}
                    contentContainerStyle={hotStyles.container}
                    data = {this.state.hotList}
                    renderItem={({item}) => <HotCommodityItem navigation={this.props.navigation} data={item} />}
                    refreshState={this.state.refreshState}
                    ItemSeparatorComponent = {() => <View style={{height:0}}/>}
                />
            </View>
        )
    }
}
class HotCommodityItem extends React.Component{
    constructor(props){
        super(props);
    }
    _changepage = ()=>{
        let itemData = this.props.data;
        const {navigate} = this.props.navigation;
        navigate(PageRoute.OrderDetailPage,{commodityId:itemData.commodityId,commodityName:itemData.name});
    }
    render() {
        let itemData = this.props.data;

        return(

            <TouchableOpacity activeOpacity={0.5} style={hotStyles.itemTouch} onPress={this._changepage}>
                <View >
                    <Image style={hotStyles.imgSize} source={itemData.pictureURL}/>
                    <Text umberOfLines={1} style={hotStyles.commodityName}>{itemData.name}</Text>
                    <View style={hotStyles.priceView}>
                        <Text umberOfLines={1} style={hotStyles.commodityId}>商品编号:{itemData.commodityId}</Text>
                        <Text umberOfLines={1} style={hotStyles.commodityPrice}>￥{itemData.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
}
const hotStyles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor: CommonColors.ThemeBgColor,
        flexWrap:'wrap',
        justifyContent:'center',
    },
    hotTitle:{
        backgroundColor:'#FFFFFF22',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:CommonColors.BorderColor,
        borderBottomWidth:1,
        borderTopColor:CommonColors.BorderColor,
        borderTopWidth:1,
        marginBottom:5,
    },
    hotTitleText:{
        color:CommonColors.ActiveColor,
        fontSize:16,
    },
    itemTouch:{
        width:(width-30)/2,
        backgroundColor:'#FFFFFF11',
        borderRadius:2,
        borderWidth:1,
        borderColor:CommonColors.BorderColor,
        padding:4,
        margin:5,
    },
    imgSize:{
        width:(width-50)/2,
        height:(width-50)/2,
    },
    commodityName:{
        color:'white',
        fontSize:16,
        height:20,
        justifyContent:'center',
    },
    priceView:{
        flexDirection:'row',
        height:20,
        alignItems:'center',
        justifyContent:'space-between',
    },
    commodityId:{
        color:'#999999',
    },
    commodityPrice:{
        fontSize:14,
        color: CommonColors.red,
    }


})


export class IndexMenu extends React.Component{
    render(){
        return(
            <View style={styles.menu}>
                <MenuButton style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate(PageRoute.CommoditySortPage)}
                            menuIcon = {require('../img/menu1.png')}
                            menuName = '商品分类' />

                <MenuButton style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate(PageRoute.SellPage)}
                            menuIcon = {require('../img/menu2.png')}
                            menuName = '全部商品'/>

                <MenuButton style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate(PageRoute.InformationlistPage)}
                            menuIcon = {require('../img/menu3.png')}
                            menuName = '信息披露' />

                <MenuButton style={styles.menuItem}
                            onPress={() => this.props.navigation.navigate(PageRoute.InvestmentlistPage)}
                            menuIcon = {require('../img/menu4.png')}
                            menuName = '投资服务'/>
            </View>
        )
    }
}
export class NoticeView extends React.Component{

    render(){
        return(
            <View style={styles.noticeView} >
                <TouchableOpacity style={styles.noticeTitleView}
                    onPress={()=>{this.props.navigation.navigate(PageRoute.NoticeListPage)}} >
                    <Text style={styles.noticeTitle}>公告</Text>
                </TouchableOpacity>
                <View style={styles.noticeList}>
                    <ScrollVertical
                        navigation={this.props.navigation}
                        enableAnimation={true}
                        scrollStyle={{ alignItems: 'flex-start' }}
                         />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: CommonColors.ThemeBgColor,
    },
    menu:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:100,
        paddingVertical:10,
    },
    menuItem:{
        width:70,
        height:80,
        paddingVertical:10,
        paddingHorizontal:10,
    },
    menuIcon:{
        width: 50,
        height: 50,
    },
    noticeView:{
        flexDirection:'row',
        alignItems:'center',
        height:70,
        paddingVertical:15,
        borderBottomColor: CommonColors.BorderColor,
        borderBottomWidth: 1,
        borderTopColor: CommonColors.BorderColor,
        borderTopWidth: 1,
        backgroundColor: "#FFFFFF11",
        marginTop:10,
    },
    noticeTitleView:{
        height:40,
        width:80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noticeTitle:{
        color: CommonColors.ActiveColor,
        fontSize:22,
    },
    noticeList:{
        flex:1,
        flexDirection: 'column',
        height:40,
        paddingHorizontal:10,
        borderLeftColor: CommonColors.BorderColor,
        borderLeftWidth: 1,
    },
    noticeListItem: {
        flexDirection:'row',
        height:20,
        alignItems:'center',
    },
    noticeListText:{
        color:'#FFFFFF',
        fontSize:12,
        width: width - 150,
    },
    noticeListLab:{
        width:30,
        height:15,
        marginRight:10,
        borderWidth:1,
        borderColor:'#00FFFF',
        borderRadius:3,
        justifyContent:'center',
        alignItems:'center',
    },
    labText:{
        color:'#00FFFF',
        fontSize:12,
    },
    tabView:{
        marginTop:10,
        height:400,
    },
    scrollTab:{
        flexDirection:'row',
        width:width,
        height:40,
        backgroundColor:'#FFFFFF22',
        borderBottomColor: CommonColors.BorderColor,
        borderBottomWidth: 1,
    },
    scrollTabBtn:{
        flex:1,
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    scrollContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    tabText:{
        fontSize:16,
    },
    UnderlineStyle:{
        position:'absolute',
        bottom:-1,
        backgroundColor: CommonColors.ActiveColor,
        width:width/2,
        height: 2,
    },
    hotView:{
        height:520,
        marginTop: 10,
        marginBottom:50,
    },
    hotListStyle:{
        flexDirection:'column',
        height:480,
        overflow:'hidden',
    }

})
