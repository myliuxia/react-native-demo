import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { CommonStyles ,CommonColors} from '../CommonStyles';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import { PageRoute } from '../App.js';
import {IconButton} from "../widget/TitleButton";
import { protocalPath } from '../api/protocalPath';
import { requestWebMoblie,img_server_url } from '../api/Server';
const qs = require('querystring');
import { showAlert } from "../CommonFunctions";
const {width, height} = Dimensions.get('window');
// 委托页面对外默认组件
export default class NewsPage extends React.Component {

    constructor(){
      console.log("constructor");
        super();
        this.state = {
            liststyle:1,
            iconpath:require('../img/icon/table.png'),
            sortcolmn:'',
            sortway:'',
            listdata:[],
			      refreshState: RefreshState.Idle
        };
    }

    static navigationOptions = ({navigation, screenProps}) =>({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '买卖',
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
                    onPress={() => navigation.navigate(PageRoute.SearchPage)}/>
                :
                <IconButton
                    iconStyle={{height:25,width:25,tintColor:"#FFFFFF"}}
                    source={require('../img/icon/login.png')}
                    onPress={() => navigation.navigate(PageRoute.LoginPage)}/>
        ),
    });

    //改变列表样式
    _changeList = ()=>{
      if(this.state.liststyle==1){
        this.setState({
          liststyle:2,
          iconpath:require('../img/icon/list.png')
        });
      }else{
        this.setState({
          liststyle:1,
          iconpath:require('../img/icon/table.png')
        });
      }
    }

    _changesorthuanshou=()=>{
      if('换手率'!=this.state.sortcolmn){
          this.setState({
              sortcolmn:'换手率',
              sortway:'asc',
          });
      }else{
          if(''==this.state.sortway){
              this.setState({
                  sortcolmn:'换手率',
                  sortway:'asc',
              });
          }else if('asc'==this.state.sortway){
              this.setState({
                  sortcolmn:'换手率',
                  sortway:'desc',
              });
          }else if('desc'==this.state.sortway){
            this.setState({
                sortcolmn:'',
                sortway:'',
            });
          }
        }
    }

    _changesortchengjiao=()=>{
      if('成交额'!=this.state.sortcolmn){
          this.setState({
              sortcolmn:'成交额',
              sortway:'asc',
          });
      }else{
          if(''==this.state.sortway){
              this.setState({
                  sortcolmn:'成交额',
                  sortway:'asc',
              });
          }else if('asc'==this.state.sortway){
              this.setState({
                  sortcolmn:'成交额',
                  sortway:'desc',
              });
          }else if('desc'==this.state.sortway){
            this.setState({
                sortcolmn:'',
                sortway:'',
            });
          }
        }
    }

    _changesortshangshi=()=>{
        if('上市时间'!=this.state.sortcolmn){
            this.setState({
                sortcolmn:'上市时间',
                sortway:'asc',
            });
        }else{
          if(''==this.state.sortway){
              this.setState({
                  sortcolmn:'上市时间',
                  sortway:'asc',
              });
          }else if('asc'==this.state.sortway){
              this.setState({
                  sortcolmn:'上市时间',
                  sortway:'desc',
              });
          }else if('desc'==this.state.sortway){
            this.setState({
                sortcolmn:'',
                sortway:'',
            });
          }
        }
    }
    _changesortprice=()=>{

      console.log(this.state.sortcolmn);
        console.log(this.state.sortway);
        console.log("changeprice");
        if('价格'!=this.state.sortcolmn){
            this.setState({
                sortcolmn:'价格',
                sortway:'asc',
            });
        }else{
          if(''==this.state.sortway){
              this.setState({
                  sortcolmn:'价格',
                  sortway:'asc',
              });
          }else if('asc'==this.state.sortway){
              this.setState({
                  sortcolmn:'价格',
                  sortway:'desc',
              });
          }else if('desc'==this.state.sortway){
            this.setState({
                sortcolmn:'',
                sortway:'',
            });
          }
        }
        console.log(this.state.sortcolmn);
          console.log(this.state.sortway);
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
                <View style={styles.container}>
                  <View style={styles.sortview}>
                      <TouchableOpacity delayLongPress={20} delayPressIn ={20} onPress={this._changesorthuanshou}>
                          <SortView data={{text:'换手率',sortcolmn:this.state.sortcolmn,sortway:this.state.sortway}} />
                      </TouchableOpacity>
                      <TouchableOpacity delayLongPress={20}  delayPressIn ={20} onPress={this._changesortchengjiao}>
                          <SortView data={{text:'成交额',sortcolmn:this.state.sortcolmn,sortway:this.state.sortway}} />
                      </TouchableOpacity>
                      <TouchableOpacity delayLongPress={20}  delayPressIn ={20} onPress={this._changesortshangshi}>
                          <SortView data={{text:'上市时间',sortcolmn:this.state.sortcolmn,sortway:this.state.sortway}} />
                      </TouchableOpacity>
                      <TouchableOpacity delayLongPress={20}  delayPressIn ={20} onPress={this._changesortprice}>
                          <SortView data={{text:'价格',sortcolmn:this.state.sortcolmn,sortway:this.state.sortway}} />
                      </TouchableOpacity>
                      <TouchableOpacity delayLongPress={20} delayPressIn ={20} onPress={this._changeList}>
                          <Image style={{width:20,height:20,tintColor:CommonColors.ActiveColor}} source={this.state.iconpath}/>
                      </TouchableOpacity>
                  </View>
                  <Listpage {...this.props} data={{liststyle:this.state.liststyle,sortcolmn:this.state.sortcolmn,sortway:this.state.sortway}}  />
                </View>
        );
    }
}
class SortView extends Component{
    constructor(props){
        super(props);
        this.state = {
            text:props.data.text,
            icon:require('../img/icon/sort.png'),
            sortcolmn:props.data.sortcolmn,
            sortway:props.data.sortway,
            color:'#FFFFFF',
        };
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.data.text==nextProps.data.sortcolmn){
            this.state.sortcolmn = nextProps.data.sortcolmn;
            this.state.sortway = nextProps.data.sortway;
            if('desc'==nextProps.data.sortway){
                this.setState({
                    icon:require('../img/icon/sort-desc.png'),
                    color:CommonColors.ActiveColor,
                })
            }else if('asc'==nextProps.data.sortway){
                this.setState({
                    icon:require('../img/icon/sort-asc.png'),
                    color:CommonColors.ActiveColor,
                })
            }else if(''==nextProps.data.sortway){
                this.setState({
                    icon:require('../img/icon/sort.png'),
                    color:'white',
                })
            }
        }else{
            this.setState({
                icon:require('../img/icon/sort.png'),
                color:'white',
            })
        }
    }
    render(){
        return(
          <View style={{flexDirection:'row'}}>
            <Text style={{color:this.state.color,fontSize:16}}>{this.state.text}</Text>
            <Image style={{height:18,width:18}} source={this.state.icon}/>
          </View>
        )
    }
}

class Listpage extends Component{
  constructor(props){
      super(props);
      this.state = {
          liststyle:props.data.liststyle,
          sortcolmn:props.data.sortcolmn,
          sortway:props.data.sortway,
          listdata:[],
          refreshState: RefreshState.Idle,
          currentPage:1,
          pageSize :8,
      };
  }

  componentDidMount() {
      //加载数据
      this.onHeaderRefresh()
  }
  componentWillMount(){

  }

    /**
     * 数据加载
     * @param sortcolmn 排序依据
     * @param sortway 排序；类型
     * @param page 查询页码
     * @param pageSize 每页条数
     */
  getData = (sortcolmn,sortway,page,pageSize)=>{
    let orderby = '';
    if('换手率'==sortcolmn){
      orderby='getTurnoverRate';
    }else if('成交额'==sortcolmn){
      orderby='getTotalMoney';
    }else if('上市时间'==sortcolmn){
      orderby='getMarketDate';
    }else if('价格'==sortcolmn){
      orderby='getPrice';
    }
    let param = qs.stringify({
      currentPage:page,
      pageSize :pageSize,
      orderBy:orderby,
      orderType :sortway
    })
    //let param1 = "currentPage="+page+"&pageSize="+pageSize+"&orderBy="+orderby+"&orderType="+sortway;
    let result = requestWebMoblie(protocalPath.commodityList,param);
    result.then((responseJson)=>{
        console.log("++++");
        console.log(responseJson);
        if(responseJson){
            for(let i=0;i<responseJson.length;i++){
                responseJson[i].key = responseJson[i].id;
                if(responseJson[i].pictures.length>0){
                    responseJson[i].url={uri:img_server_url+responseJson[i].pictures[0].pictureURL}
                }else{
                    responseJson[i].url={uri:img_server_url+'null'}
                }
            }
            //console.log(responseJson);
            this.setState({
                currentPage:this.state.currentPage+1,
                listdata:[...this.state.listdata,...responseJson],
                refreshState: responseJson.length < this.state.pageSize ? RefreshState.NoMoreData : RefreshState.Idle,
            })

        }else{
            this.setState({
                refreshState:RefreshState.Failure,
            })
        }

    }).catch((error)=>{
        showAlert(error.toString());
        this.setState({
            refreshState:RefreshState.Failure,
        })
    }).done();

  }

  //属性改变触发事件
  componentWillReceiveProps(nextProps){
    this.refs._list.refs._flatlist.scrollToOffset({animated: true, offset: 0});
    if(nextProps.data.sortcolmn!=this.state.sortcolmn||nextProps.data.sortway!=this.state.sortway){
      this.setState({
          sortcolmn:nextProps.data.sortcolmn,
          sortway:nextProps.data.sortway
      })
      this.onHeaderRefresh();
    }
    if(nextProps.data.liststyle!=this.state.liststyle){
      this.setState({
        liststyle:nextProps.data.liststyle
      });
    }
  }
  //顶部刷新
  onHeaderRefresh = ()=>{
    console.log("refresh");
      this.setState({
          currentPage: 1,
          listdata: [],
          refreshState: RefreshState.HeaderRefreshing,
      })
      this.getData(this.state.sortcolmn,this.state.sortway,1,this.state.pageSize);


  }
  //底部刷新
  onFooterRefresh = ()=>{
      this.setState({refreshState: RefreshState.FooterRefreshing})

      this.getData(this.state.sortcolmn,this.state.sortway,this.state.currentPage,this.state.pageSize);

  }

  render() {

      if(this.state.liststyle==1){
        return this.render1();
      }else{
        return this.render2();
      }
  }

  render1(){
      return(
        <View style = {{flex:1,}}>
        <RefreshListView
            keyExtractor={this._keyExtractor}
            contentContainerStyle={styles.tablecaontainer}
            ref="_list"
            onEndReachedThreshold={0.1}
            listRef="_flatlist"
            data = {this.state.listdata}
            numColumns={2}
            renderItem={({item}) => <NewsViewTable {...this.props} data={item} /> }
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}//顶部刷新
            onFooterRefresh={this.onFooterRefresh}//底部刷新
            ItemSeparatorComponent = {() => <View style={{height:0}}/>}
        />
        </View>
      )
  }
  render2(){
      return(
        <View style = {{flex:1}}>
        <RefreshListView
            keyExtractor={this._keyExtractor}
            ref="_list"
            numColumns={1}
            onEndReachedThreshold={0.1}
            listRef="_flatlist"
            data = {this.state.listdata}
            renderItem={({item}) => <NewsViewList {...this.props} data={item} />}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}//顶部刷新
            onFooterRefresh={this.onFooterRefresh}//底部刷新
            ItemSeparatorComponent = {() => <View style={{height:0}}/>}
        />
        </View>
      )
  }

    _keyExtractor = (item, index) => item.commodityId;

}

class NewsViewTable extends Component{
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
          <TouchableOpacity style={styles.tablenew} delayLongPress={20} onPress={this._changepage}>
            <View>
              <View style={styles.tablepicview}>
                <Image style={styles.tablenewspic} source={itemData.url}/>
              </View>
              <Text umberOfLines={2} style={styles.tablecommodityname}>{itemData.name}</Text>
              <View style={styles.tablepriceview}>
                <Text umberOfLines={2} style={styles.tablecommodityid}>商品编号:{itemData.commodityId}</Text>
                <Text umberOfLines={2} style={styles.tableprice}>￥{itemData.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
    }
}

class NewsViewList extends Component{
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
          <TouchableOpacity delayLongPress={20} onPress={this._changepage}>
          <View style={styles.listview}>
                <Image style={styles.listimage} source={itemData.url}/>
                <View style={styles.Listcontent}>
                    <Text numberOfLines={2} style={styles.listcommodityname}>{itemData.name}</Text>
                    <Text numberOfLines={2} style={styles.listcommodityid}>商品编号:{itemData.commodityId}</Text>
                    <Text numberOfLines={2} style={styles.listcommodityprice}>￥{itemData.price}</Text>
                </View>
          </View>
          </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:'column',
        backgroundColor: CommonColors.ThemeBgColor,
    },
  sortview:{
    height:40,
    backgroundColor:"#FFFFFF22",
    borderBottomWidth:1,
    borderColor:CommonColors.BorderColor,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:8,
    paddingRight:8,
  },
  tablecaontainer:{
      //flexDirection:'row',
      //flexWrap:'wrap',
      //justifyContent:'center',
      paddingHorizontal:5,
  },
  tablenew:{
      width:(width-30)/2,
      backgroundColor:'#FFFFFF11',
      borderRadius:2,
      borderWidth:1,
      borderColor:CommonColors.BorderColor,
      padding:4,
      margin:5,
  },
  tablepicview:{
    alignItems :'center',
    width:(width-50)/2,
    height:(width-50)/2,
  },
  tablenewspic: {
    width:(width-50)/2,
    height:(width-50)/2,
  },
  tablecommodityname:{
    color:'white',
    fontSize:16,
    height:20,
  },
  tablepriceview:{
    flexDirection:'row',
    justifyContent:'space-between',
    height:20,
  },
  tablecommodityid:{
    color:'#999999'
  },
  tableprice:{
    fontSize:14,
    color:CommonColors.red,
  },
  listview:{
    flexDirection:'row',
    flex:1,
    height:100,
    borderBottomWidth:1,
    borderBottomColor:CommonColors.BorderColor,
    padding:10,
  },
  listimage:{
    width: 80,
    height: 80
  },
  Listcontent:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
    paddingLeft:10,
  },
  listcommodityname:{
    color:'white',
    fontSize:16,
  },
  listcommodityid:{
    color:'#999999',
  },
  listcommodityprice:{
    color:CommonColors.red,
    fontSize:14,
  }
});
