import React, { Component } from 'react';
import {
  Text,
  View,
    StyleSheet,
    TouchableOpacity ,
    DeviceEventEmitter,
    Image,
    Dimensions
} from 'react-native';
import { PageRoute } from '../App.js';
import {CommonStyles } from '../CommonStyles';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import TitleButton from "../widget/TitleButton";

const { width , height } = Dimensions.get("window");
// 委托页面对外默认组件
export default class OrderPage extends React.Component {

	constructor(props){
		super(props);
        this.onPressButton = this.onPressButton.bind(this);
		this.state = {
            isLogin:loginUser.isLogin(),
            dataList: [],
            refreshState: RefreshState.Idle,
            bs:3,
		};
    }


    componentDidMount() {
        //加载数据
        this.onHeaderRefresh()
        // 注册用户状态改变监听
        this.loginUserListener = DeviceEventEmitter.addListener(OnLoginStateChanged,() => {
            // 根据用户是否登录改变页面
            this.setState({
                isLogin: loginUser.isLogin()
            })
        });
        this.props.navigation.setParams({ navigatePress:this.thisIsLogin })
    }

    componentWillUnmount() {
        // 取消注册用户状态改变监听
        this.loginUserListener.remove();
    }

    //刷新数据
    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})

        // 模拟网络请求
        setTimeout(() => {
            // 模拟网络加载失败的情况
            if (Math.random() < 0.2) {
                this.setState({refreshState: RefreshState.Failure})
                return
            }

            this.setState({number:1});//刷新加载第一页
            //获取测试数据
            let dataList = this.getTestList({number:this.state.number});
            this.setState({number:this.state.number+1});
            this.setState({
                dataList: dataList,
                refreshState: RefreshState.Idle,
            })
        }, 2000)


    }
    //上拉加载
    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})

        // 模拟网络请求
        setTimeout(() => {
            // 模拟网络加载失败的情况
            if (Math.random() < 0.2) {
                this.setState({refreshState: RefreshState.Failure})
                return
            }

            //获取测试数据
            let dataList = this.getTestList({number:this.state.number});
            let dataAll = [...this.state.dataList, ...dataList]
            this.setState({number:this.state.number+1});

            this.setState({
                dataList: dataAll,
                refreshState: dataAll.length > 50 ? RefreshState.NoMoreData : RefreshState.Idle,
            })
        }, 2000)

    }


    //获取委托信息
    getTestList(props){
        let data = [{id: '1',url:require('../img/pic1.jpg'), name: '柯木儿红酒十周年新老顾客大回馈', price: '90000.00', num: '23', time: '2017/08.09'},
            {id: '2',url:require('../img/pic2.jpg'), name: '柯木儿红酒十周年新老顾客大回馈,大回馈大回馈大回馈', price: '90000.00', num: '23', time: '2017/08.09'},
            {id: '3',url:require('../img/pic1.jpg'), name: '柯木儿红酒十周年新老顾客大回馈', price: '90000.00', num: '23', time: '2017/08.09'},
            {id: '4',url:require('../img/pic2.jpg'), name: '柯木儿红酒十周年新老顾客大回馈,大回馈大回馈大回馈~', price: '90000.00', num: '23', time: '2017/08.09'},
            {id: '5',url:require('../img/pic1.jpg'), name: '柯木儿红酒十周年新老顾客大回馈', price: '90000.00', num: '23', time: '2017/08.09'},
            {id: '6',url:require('../img/pic2.jpg'), name: '柯木儿红酒十周年新老顾客大回馈,大回馈大回馈大回馈~', price: '90000.00', num: '23', time: '2017/08.09'},
        ];

        for(var i= 0;i<data.length;i++){
            data[i].id =  (props.number-1) * 6 + i;
        }

        /*for(let [index, value] of data.entries()){ //遍历索引和元素
            value.key =  (props.number-1) * 6 + index;
        }*/

        return data;
    }

    _keyExtractor = (item, index) => item.id;

    static navigationOptions = ({navigation, screenProps}) =>({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: "买卖",
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: OrderPage.thisIsLogin(navigation),
        headerRight: (
            <TitleButton title="搜索" onPress={() => navigation.navigate(PageRoute.SearchPage)}/>
        )})


	render(){

        return(
			<View style={styles.container}>
                <View style={styles.screen}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.onHeaderRefresh} style={styles.screenNav}>
                        <View><Text>默认</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.onHeaderRefresh} style={styles.screenNav}>
                        <View><Text>数量</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.onHeaderRefresh} style={styles.screenNav}>
                        <View><Text>价格</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.onHeaderRefresh} style={styles.screenNav}>
                        <View><Text>时间</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={this.onHeaderRefresh} style={styles.screenNavS}>
                        <View style={styles.screenV}>
                            <Text>筛选</Text>
                            <Image style={styles.iconImg} source={require('../img/icon/ic_sift.png')}/>
                        </View>
                    </TouchableOpacity>

                </View>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <OrderView data={item} onPress={this.onPressButton} />}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    ItemSeparatorComponent = {() => <View style={{height:4}}/>}
                />

			</View>
        );
	}




    static thisIsLogin(navigation) {
        if (loginUser.isLogin() === false) {
            return (<TitleButton title="登录" onPress={() => navigation.navigate(PageRoute.LoginPage)}/>);
        } else{
            return (<TitleButton title="发布委托" />);
        }
    }
    onPressButton() {
        const { navigate } = this.props.navigation;
        navigate(PageRoute.OrderDetailPage);
    }

    thisIsLogin(){
    }

}


//单个列表项的样式
class OrderView extends Component{

    constructor(props){
        super(props);
    }
    render() {
        let itemData = this.props.data;
        let onPress = this.props.onPress;
        return (
			<TouchableOpacity activeOpacity={0.8}  onPress={onPress}>
                <View>
				<View style={styles.list}>
					<Image style={styles.pic} source={require('../img/pic2.jpg')}/>
					<View style={styles.con}>
						<Text style={styles.orderName} numberOfLines={2}>{itemData.name}</Text>
						<Text style={styles.orderPrice} >￥  {itemData.price}</Text>
						<Text style={styles.orderNum}>剩余:{itemData.num} </Text>
					</View>
				</View>
                <View style={styles.time}>
                    <View style={styles.timeLeft}  >
                        <Text style={styles.textTime}>{itemData.time}</Text>
                    </View>
                    <View style={styles.timeRight}>
                        <Image style={styles.imgBtn} source = {require('../img/icon/ic_want_bargain.png')}/>
                        <Text style={styles.textBtn}>议价</Text>

                        <Image style={styles.imgBtn} source = {require('../img/icon/ic_want_buy.png')}/>
                        <Text style={styles.textBtn}>我要买</Text>

                    </View>
                </View>
                </View>
			</TouchableOpacity >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },
    screen: {
        flexDirection: 'row',
        alignItems: 'center',
        height:40,
        width:width*1,
        borderColor: '#eeeeee',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
    },
    screenNav:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:40,
        width:width*0.19,
    },
    screenNavS:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:40,
        width:width*0.24,
    },
    screenV:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:30,
        borderColor: '#eeeeee',
        borderLeftWidth: 1,
    },
    iconImg:{
        marginLeft:5,
       width:20,
       height:20,
    },
    list: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        height: 100,
    },
    pic: {
        width: 100,
        height: 100,
    },
    con:{
        flex: 1,
        justifyContent: 'flex-start',
        height:100,
        paddingLeft: 5,
    },
    orderName:{
        color: '#333333',
        height:40,
        lineHeight:20,
    },
    orderPrice:{
        color: '#e72f2f',
        fontSize: 18,
        lineHeight:20,
    },
    orderNum: {
        color: '#999999',
        fontSize: 12,
        lineHeight:20,
        marginTop:5,
    },
    time: {
        flex: 1,
        flexDirection: 'row',
        height:25,
        borderColor: '#eeeeee',
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
    },
    timeLeft:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height:25,
        borderColor: '#eeeeee',
        borderTopWidth: 1,
    },
    timeRight:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height:25,
        borderColor: '#eeeeee',
        borderTopWidth: 1,
    },
    textTime:{
        paddingLeft:10,
        color: '#999999',
        fontSize: 12,
    },
    textBtn: {
        paddingRight:10,
        color: '#999999',
        fontSize: 12,
    },
    imgBtn:{
        width:15,
        height:15,
        marginRight:5,
    }

});