import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { PageRoute } from '../../App.js';
import {CommonStyles,CommonColors } from '../../CommonStyles';
import {GoBackButton} from "../../widget/TitleButton";
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {getDate} from "../../CommonFunctions"
import {requestWebMoblie} from '../../api/Server';
import { protocalPath } from '../../api/protocalPath';

export default class NoticeListPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataList: [],
            refreshState: RefreshState.Idle,
            currentPage: 1,
            pageSize:6,

        };
    }


    componentDidMount() {
        //加载数据
        this.onHeaderRefresh()


    }

    componentWillUnmount() {
    }

    //刷新数据
    onHeaderRefresh = () => {
        this.setState({
            refreshState: RefreshState.HeaderRefreshing,
            currentPage: 1,
            dataList: [],
        })

        this.getNoticeList();

    }
    //上拉加载
    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})

        this.getNoticeList();
    }


    //获取委托信息
    getNoticeList = () => {
        let params = 'currentPage=' + this.state.currentPage + '&pageSize=' + this.state.pageSize;
        let result = requestWebMoblie(protocalPath.noticeList, params);
        result.then((responseJson) => {
        //console.log(responseJson);
        this.setState({
            dataList: [...this.state.dataList, ...responseJson],
            currentPage: this.state.currentPage + 1,
            refreshState: responseJson.length < this.state.pageSize ? RefreshState.NoMoreData : RefreshState.Idle,

      })
    }).catch((error => {
        //this.showAlert(error.toString());
        console.error('error:'+error.toString());
        this.setState({refreshState: RefreshState.Failure})
    })).done();
    }

    _keyExtractor = (item, index) => item.id;

    static navigationOptions = ({navigation, screenProps}) =>({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: "公告列表",
        headerTitleStyle: CommonStyles.headerTitleStyle,
        headerLeft: (<GoBackButton onPress={() => navigation.goBack()}/>),
        headerRight: (<View/>)
    })


    render(){

        return(
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <NoticeView data={item} onPress={() => {this.props.navigation.navigate(PageRoute.NoticeDetailPage,{id:item.id})}} />}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    ItemSeparatorComponent = {() => <View style={{height:10}}/>}
                />

            </View>
        );
    }

}

class NoticeView extends React.Component{
    render(){
        return(
            <TouchableOpacity activeOpacity={0.8}  onPress={this.props.onPress}>
                <View style={styles.noticeView}>
                    <Text style={styles.noticeTitle} numberOfLines={1}>{this.props.data.title}</Text>
                    <Text style={styles.noticeTime}>{getDate(this.props.data.addTime)} ~ {getDate(this.props.data.endTime)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: CommonColors.ThemeBgColor,
    },
    noticeView:{
        marginHorizontal:10,
        flexDirection: 'column',
        borderRadius:5,
        borderColor:CommonColors.BorderColor,
        borderWidth:1,
        backgroundColor:'#FFFFFF11',
        padding:10,
    },
    noticeTitle:{
        fontSize:18,
        color:CommonColors.white,
    },
    noticeTime:{
        fontSize:12,
        color:CommonColors.gray,
        textAlign:'right',
    },
})