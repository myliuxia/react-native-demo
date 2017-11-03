import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { CommonStyles, CommonColors } from '../CommonStyles';
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

    //顶部刷新
    onHeaderRefresh = ()=>{

    }
    //底部刷新
    onFooterRefresh = ()=>{

    }
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
                <View>
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
                          <Image style={{width:30,height:30}} source={this.state.iconpath}/>
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
        };
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.data.text==nextProps.data.sortcolmn){
            this.state.sortcolmn = nextProps.data.sortcolmn;
            this.state.sortway = nextProps.data.sortway;
            if('desc'==nextProps.data.sortway){
              this.state.icon = require('../img/icon/sort-desc.png');
            }else if('asc'==nextProps.data.sortway){
              this.state.icon = require('../img/icon/sort-asc.png');
            }else if(''==nextProps.data.sortway){
              this.state.icon = require('../img/icon/sort.png');
            }
        }else{
            this.state.icon = require('../img/icon/sort.png');
        }
    }
    render(){
        return(
          <View style={{flexDirection:'row'}}>
            <Text style={{color:'white',fontSize:16}}>{this.state.text}</Text>
            <Image style={{height:20,width:10,marginLeft:6}} source={this.state.icon}/>
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
          correntPage:1,
          pageSize :10,
      };
  }
  componentWillMount(){
    console.log("----------------------");
    this.getData(this.state.sortcolmn,this.state.sortway,this.state.correntPage,this.state.pageSize).then((responseJson)=>{
      console.log("success");
      this.setState({
          listdata:responseJson,
      })
      if(responseJson.length<this.state.pageSize){
        this.setState({
          refreshState: RefreshState.NoMoreData,
        })
      }
    }).catch((error)=>{
      showAlert(error.toString());
    });
  }
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
    let result = requestWebMoblie(protocalPath.commodityList,param).then((responseJson)=>{
        console.log(responseJson);
        for(let i=0;i<responseJson.length;i++){
          responseJson[i].key = responseJson[i].id;
          if(responseJson[i].pictures.length>0){
            responseJson[i].url={uri:img_server_url+responseJson[i].pictures[0].pictureURL}
          }else{
            responseJson[i].url={uri:img_server_url+'null'}
          }
        }
        console.log(responseJson);
        return responseJson;

    }).catch((error)=>{
      showAlert(error.toString());
    });
    return result;
  }

  componentWillReceiveProps(nextProps){
    this.refs._list.refs._flatlist.scrollToOffset({animated: true, offset: 0});
    if(nextProps.data.sortcolmn!=this.state.sortcolmn||nextProps.data.sortway!=this.state.sortway){
      this.getData(nextProps.data.sortcolmn,nextProps.data.sortway,1,this.state.pageSize).then((responseJson)=>{
        this.setState({
            listdata:responseJson,
            refreshState: RefreshState.Idle,
        })
        if(responseJson.length<this.state.pageSize){
          this.setState({
            refreshState: RefreshState.NoMoreData,
          })
        }
      }).catch((error)=>{
        showAlert(error.toString());
      });
      this.setState({
          correntPage:1,
          sortcolmn:nextProps.data.sortcolmn,
          sortway:nextProps.data.sortway
      });
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
      this.setState({refreshState: RefreshState.HeaderRefreshing});
      this.getData(this.state.sortcolmn,this.state.sortway,1,this.state.pageSize).then((responseJson)=>{
        this.setState({
            correntPage:1,
            listdata:responseJson,
            refreshState: RefreshState.Idle,
        })
        if(responseJson.length<this.state.pageSize){
          this.setState({
            refreshState: RefreshState.NoMoreData,
          })
        }
      }).catch((error)=>{
        showAlert(error.toString());
      });
  }
  //底部刷新
  onFooterRefresh = ()=>{
      this.setState({refreshState: RefreshState.FooterRefreshing})
      this.getData(this.state.sortcolmn,this.state.sortway,this.state.correntPage+1,this.state.pageSize).then((responseJson)=>{
        let newdata = [...this.state.listdata,...responseJson]
        this.setState({
            correntPage:this.state.correntPage+1,
            listdata:newdata,
            refreshState: RefreshState.Idle,
        })
        if(responseJson.length<this.state.pageSize){
          this.setState({
            refreshState: RefreshState.NoMoreData,
          })
        }
      }).catch((error)=>{
        showAlert(error.toString());
      });
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
        <View style = {{height:height-120,backgroundColor: '#252424',}}>
        <RefreshListView
            style={{backgroundColor:"#252424"}}
            contentContainerStyle={styles.tablecaontainer}
            ref="_list"
              onEndReachedThreshold={0.1}
            listRef="_flatlist"
            data = {this.state.listdata}
            renderItem={({item}) => <NewsViewTable {...this.props} data={item} />}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}//顶部刷新
            onFooterRefresh={this.onFooterRefresh}//底部刷新
            ItemSeparatorComponent = {() => <View style={{height:4}}/>}
        />
        </View>
      )
  }
  render2(){
      return(
        <View style = {{height:height-120,backgroundColor: '#252424',}}>
        <RefreshListView
            contentContainerStyle={styles.listcontainer}
            ref="_list"
            onEndReachedThreshold={0.1}
            listRef="_flatlist"
            data = {this.state.listdata}
            renderItem={({item}) => <NewsViewList {...this.props} data={item} />}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.onHeaderRefresh}//顶部刷新
            onFooterRefresh={this.onFooterRefresh}//底部刷新
            ItemSeparatorComponent = {() => <View style={{height:4}}/>}
        />
        </View>
      )
  }

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
          <View style={styles.tablenew}>
              <TouchableOpacity delayLongPress={20} onPress={this._changepage}>
              <View style={styles.tablepicview}>
                <Image style={styles.tablenewspic} source={itemData.url}/>
              </View>
              <Text umberOfLines={2} style={styles.tablecommodityname}>{itemData.name}</Text>
              <View style={styles.tablepriceview}>
                <Text umberOfLines={2} style={styles.tablecommodityid}>商品编号:{itemData.commodityId}</Text>
                <Text umberOfLines={2} style={styles.tableprice}>￥{itemData.price}</Text>
              </View>
              </TouchableOpacity>
          </View>
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
  sortview:{
    height:40,
    backgroundColor:"#525050",
    borderBottomWidth:1,
    borderColor:'rgb(102, 102, 102)',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:8,
    paddingRight:8,
  },
  tablecaontainer:{
      backgroundColor: '#252424',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-around',
      paddingBottom:45,
      paddingTop:5,
  },
  tablenew:{
    width:width/2 -10,
    backgroundColor:"#525050",
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'rgb(102, 102, 102)',
    borderLeftWidth:1,
    borderRightWidth:1
  },
  tablepicview:{
    alignItems :'center',
    width: width/2-10,
    height: width/2-10,
  },
  tablenewspic: {
      width: width/2-10,
      height: width/2-10,
  },
  tablecommodityname:{
    color:'white',
    fontSize:18,
    paddingLeft:4,
    paddingRight:4
  },
  tablepriceview:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom:2,
    paddingLeft:4,
    paddingRight:4
  },
  tablecommodityid:{
    color:'#999999'
  },
  tableprice:{
    fontSize:15,
    color:'red'
  },
  listcontainer:{
    backgroundColor: '#252424',
    paddingBottom:45
  },
  listview:{
    backgroundColor: '#525050',
    flexDirection:'row',
    flex:1,
    height:150,
    borderBottomWidth:1,
    borderColor:'rgb(102, 102, 102)',
    paddingTop:10,
    paddingLeft:10
  },
  listimage:{
    width: width*11/30,
    height: width*11/30
  },
  Listcontent:{
    marginLeft:7
  },
  listcommodityname:{
    color:'white',
    fontSize:25,
  },
  listcommodityid:{
    marginTop:53,
    color:'#999999',
    fontSize:17,
  },
  listcommodityprice:{
    color:'red',
    fontSize:17,
  }
});
