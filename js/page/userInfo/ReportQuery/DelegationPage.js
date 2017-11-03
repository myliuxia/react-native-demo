//当日委托
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    DrawerLayoutAndroid,
    TextInput,
    ScrollView,
    Platform,
    Modal
} from 'react-native';
import { GoBackButton } from '../../../widget/TitleButton';
import { StackNavigator } from 'react-navigation';
import { CommonStyles } from '../../../CommonStyles';
import { showAlert } from '../../../CommonFunctions';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view';
import { PageRoute } from "../../../App";
import { request } from '../../../api/Server';
import { protocalPath } from '../../../api/protocalPath';
// 委托页面对外默认组件
export default class DelegationPage extends React.Component {

    constructor(props) {
        super(props);
        console.log('----------------------------------');
        console.log(props.navigation.state);
        this.state = {
            liststyle: 1,
            iconpath: require('../../../img/icon/filter.png'),
            sortcolmn: '',
            sortway: '',
            listData: [],
            refreshState: RefreshState.Idle,
            已委托: '已委托',
            部分成交: '部分成交',
            全部成交: '全部成交',
            全部撤单: '全部撤单',
            部分成交后撤单: '部分成交后撤单',
            filters: {
                condition: '',
                orderNo: ''
            },
            modalVisible:false

        };
        if (props.navigation.state.params != undefined) {
            this.state.commodityId = props.navigation.state.params.commodityId
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: CommonStyles.headerStyle,
        headerTitle: '当日委托',
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

    getFilters = (filters) => {
        console.log('getFilters');
        console.log(filters);
        this.setState({
            filters: filters
        });
        this.closeDrawer();
    }


    //顶部刷新
    onHeaderRefresh = () => {

    }
    //底部刷新
    onFooterRefresh = () => {

    }

    _filter = () => {
        console.log('filter');
        this.openDrawer();
        
    }
    //打开侧边栏
    openDrawer = () => {
        console.log('openDrawer');
        if(Platform.OS=='ios'){
            this.setModalVisible(true);
        }else{
            this.refs.drawerLayout.openDrawer();
        }
        
    }
    //关闭侧边栏
    closeDrawer = () => {
        console.log('closeDrawer');
        if (Platform.OS == 'ios') {
            this.setModalVisible(false);
        } else {
            this.refs.drawerLayout.closeDrawer();
        }
        
    }
    _changeSortTime = () => {
        console.log('_changeSortTime');
        if ('时间' != this.state.sortcolmn) {
            this.setState({
                sortway: 'asc',
            });
        } else {
            if ('' == this.state.sortway) {
                this.setState({
                    sortway: 'asc',
                });
            } else if ('asc' == this.state.sortway) {
                this.setState({
                    sortway: 'desc',
                });
            } else if ('desc' == this.state.sortway) {
                this.setState({
                    sortway: '',
                });
            }
        }
        this.setState({
            sortcolmn: '时间',
        });
    }

    _changeSortUnsettled = () => {
        console.log('_changeSortUnsettled');
        if ('未成交' != this.state.sortcolmn) {
            this.setState({
                sortway: 'asc',
            });
        } else {
            if ('' == this.state.sortway) {
                this.setState({
                    sortway: 'asc',
                });
            } else if ('asc' == this.state.sortway) {
                this.setState({
                    sortway: 'desc',
                });
            } else if ('desc' == this.state.sortway) {
                this.setState({
                    sortway: '',
                });
            }
        }
        this.setState({
            sortcolmn: '未成交',
        });
    }

    _changeSortCount = () => {
        console.log('_changeSortCount');
        if ('数量' != this.state.sortcolmn) {
            this.setState({
                sortway: 'asc',
            });
        } else {
            if ('' == this.state.sortway) {
                this.setState({
                    sortway: 'asc',
                });
            } else if ('asc' == this.state.sortway) {
                this.setState({
                    sortway: 'desc',
                });
            } else if ('desc' == this.state.sortway) {
                this.setState({
                    sortway: '',
                });
            }
        }
        this.setState({
            sortcolmn: '数量',
        });
    }
    _changeSortPrice = () => {
        console.log('_changeSortPrice');
        if ('价格' != this.state.sortcolmn) {
            this.setState({
                sortway: 'asc',
            });
        } else {
            if ('' == this.state.sortway) {
                this.setState({
                    sortway: 'asc',
                });
            } else if ('asc' == this.state.sortway) {
                this.setState({
                    sortway: 'desc',
                });
            } else if ('desc' == this.state.sortway) {
                this.setState({
                    sortway: '',
                });
            }
        }
        this.setState({
            sortcolmn: '价格',
        });
    }

    setModalVisible=(visible) =>{
        this.setState({ modalVisible: visible });
    }
    iosDrawer = () => {
        return (
            <View style={[{ flex: 1, backgroundColor: 'black' }]}>
                <View style={{
                    height: 40, backgroundColor: "#525050", borderBottomWidth: 1,
                    borderColor: 'rgb(102, 102, 102)', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, paddingRight: 5,
                }}>
                    <TouchableOpacity onPress={this._changeSortTime}>
                        <SortView data={{ text: '时间', sortcolmn: this.state.sortcolmn, sortway: this.state.sortway }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._changeSortPrice}>
                        <SortView data={{ text: '价格', sortcolmn: this.state.sortcolmn, sortway: this.state.sortway }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._changeSortCount}>
                        <SortView data={{ text: '数量', sortcolmn: this.state.sortcolmn, sortway: this.state.sortway }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._changeSortUnsettled}>
                        <SortView data={{ text: '未成交', sortcolmn: this.state.sortcolmn, sortway: this.state.sortway }} />
                    </TouchableOpacity>
                    <View>
                        <Modal
                            animationType={"slide"}
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => { this.setModalVisible(false) }}
                        >
                            <FilterDrawer closeDrawer={this.closeDrawer} getFilters={this.getFilters}></FilterDrawer>
                        </Modal>

                        <TouchableOpacity onPress={this._filter} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>筛选</Text>
                            <Image style={{ width: 30, height: 30 }} source={this.state.iconpath} />
                        </TouchableOpacity>

                    </View>
                    
                </View>
                <DelegationList sortcolmn={this.state.sortcolmn} sortway={this.state.sortway} filters={this.state.filters} commodityId={this.state.commodityId}></DelegationList>
            </View>
            
        );
    }


    render() {
        if(Platform.OS=='ios'){
            return this.iosDrawer();
        }else{
            const { navigate } = this.props.navigation;
            var navigationView = (
                <FilterDrawer closeDrawer={this.closeDrawer} getFilters={this.getFilters}></FilterDrawer>
            );
            return (
                <DrawerLayoutAndroid
                    ref={'drawerLayout'}
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Right}
                    renderNavigationView={() => navigationView}>
                    <View style={[{ flex: 1, backgroundColor: 'black' }]}>
                        <View style={{
                            height: 40, backgroundColor: "#525050", borderBottomWidth: 1,
                            borderColor: 'rgb(102, 102, 102)', flexDirection: 'row',
                            justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, paddingRight: 5,
                        }}>
                            <TouchableOpacity onPress={this._changeSortTime}>
                                <SortView data={{ text: '时间', sortcolmn: this.state.sortcolmn, sortway: this.state.sortway }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._changeSortPrice}>
                                <SortView data={{ text: '价格', sortcolmn: this.state.sortcolmn, sortway: this.state.sortway }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._changeSortCount}>
                                <SortView data={{ text: '数量', sortcolmn: this.state.sortcolmn, sortway: this.state.sortway }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._changeSortUnsettled}>
                                <SortView data={{ text: '未成交', sortcolmn: this.state.sortcolmn, sortway: this.state.sortway }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._filter} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 16 }}>筛选</Text>
                                <Image style={{ width: 30, height: 30 }} source={this.state.iconpath} />
                            </TouchableOpacity>
                        </View>
                        <DelegationList sortcolmn={this.state.sortcolmn} sortway={this.state.sortway} filters={this.state.filters} commodityId={this.state.commodityId}></DelegationList>
                    </View>
                </DrawerLayoutAndroid>
            );
        }
        

        
    }
}

class FilterDrawer extends Component {

    constructor() {
        super();
        this.state = {
            selected: '',
            previousSelected: '',
            button: new Map(),
        }
        this.state.button.set('全部', <UnSelecedButton title='全部' select={this.select}></UnSelecedButton>);
        this.state.button.set('已委托', <UnSelecedButton title='已委托' select={this.select}></UnSelecedButton>)
        this.state.button.set('部分成交', <UnSelecedButton title='部分成交' select={this.select}></UnSelecedButton>);
        this.state.button.set('全部成交', <UnSelecedButton title='全部成交' select={this.select}></UnSelecedButton>)
        this.state.button.set('全部撤单', <UnSelecedButton title='全部撤单' select={this.select}></UnSelecedButton>);
        this.state.button.set('部分成交后撤单', <UnSelecedButton title='部分成交后撤单' select={this.select}></UnSelecedButton>);
        this.select = this.select.bind(this);
    }
    //回调
    select = (title) => {
        this.setState({
            previousSelected: this.state.selected,
            selected: title,
        });
    }

    cancle = () => {
        this.props.closeDrawer();
    }
    confirm = () => {
        this.props.getFilters({
            condition: this.state.selected,
            orderNo: this.state.orderNo
        })
    }

    render() {
        let button = this.state.button;
        //现在被点击的按钮改变为<选中按钮>，前一个被选中的改变为<未选中按钮>
        button.set(this.state.selected, <SelectedButton title={this.state.selected}></SelectedButton>)
        button.set(this.state.previousSelected, <UnSelecedButton title={this.state.previousSelected} select={this.select}></UnSelecedButton>)
        return (
            <View style={[Styles.drawerLayoutContainer,]}>
                <ScrollView style={[{ flex: 1 }]}>
                    <View >
                        <View style={[Styles.drawerLayoutItem, { paddingHorizontal: 10, borderBottomColor: '#666666', borderBottomWidth: 0.5, borderStyle: 'solid', justifyContent: 'flex-end' }]}>
                            <Text style={[CommonStyles.commonText,]}>商品代码：</Text>
                        </View>
                        <View style={[Styles.drawerLayoutItem, { borderBottomColor: '#666666', borderBottomWidth: 0.5, borderStyle: 'solid' }]}>
                            <View style={{ margin: 10, backgroundColor: 'black', borderColor: '#4f5254', borderWidth: 0.5, borderStyle: 'solid', borderRadius: 4, }}>
                                <TextInput placeholder='请输入商品代码'
                                    maxLength={12}
                                    placeholderTextColor='#686969'
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ orderNo: text })}
                                    value={this.state.orderNo}
                                    style={Styles.input} />
                            </View>
                            <View style={[{ margin: 10, }]}>
                                <Text style={CommonStyles.commonText}>委托状态：</Text>
                            </View>
                        </View>
                        <View style={[Styles.drawerLayoutItem, { flexDirection: 'row', }]}>
                            {button.get('全部')}
                            {button.get('已委托')}
                            {button.get('部分成交')}
                        </View>
                        <View style={[Styles.drawerLayoutItem, { flexDirection: 'row' }]}>
                            {button.get('全部成交')}
                            {button.get('全部撤单')}
                        </View>
                        <View style={[Styles.drawerLayoutItem, { flexDirection: 'row' }]}>
                            {button.get('部分成交后撤单')}
                        </View>
                        <View style={[{ flex: 3 }]}>
                        </View>
                    </View>
                </ScrollView>
                <View style={[{ flexDirection: 'row', alignContent: 'flex-end', height: 40 }]}>
                    <TouchableOpacity style={[{ padding: 10, flex: 1, backgroundColor: '#00ffff' }]} onPress={this.cancle}>
                        <Text style={CommonStyles.commonText}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ padding: 10, flex: 1, backgroundColor: '#0091ff' }]} onPress={this.confirm}>
                        <Text style={CommonStyles.commonText}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class SelectedButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity style={[Styles.drawerOption, { paddingBottom: 0, paddingRight: 0, borderColor: 'blue', borderStyle: 'solid', borderWidth: 0.5 }]}>
                <Text style={[CommonStyles.commonText, { flex: 4, marginRight: 10, color: 'blue' }]}>{this.props.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', flex: 2, }}>
                    <View style={{ width: 10, }}>
                        <View style={{ borderLeftWidth: 10, borderBottomWidth: 10, borderLeftColor: '#606469', borderBottomColor: 'blue', flex: 1 }}>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}

class UnSelecedButton extends Component {
    constructor(props) {
        super(props);
        this.onPressSelectButton = this.onPressSelectButton.bind(this);
    }
    render() {
        return (
            <TouchableOpacity style={[Styles.drawerOption, { borderWidth: 0.5, borderColor: 'transparent' }]} onPress={() => this.onPressSelectButton(this.props.title)}>
                <Text style={CommonStyles.commonText}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
    onPressSelectButton(title) {
        console.log('onPressSelectButton');
        this.props.select(title);
    }
}

class SortView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.data.text,
            icon: require('../../../img/icon/sort.png'),
            sortcolmn: props.data.sortcolmn,
            sortway: props.data.sortway,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.text == nextProps.data.sortcolmn) {
            this.state.sortcolmn = nextProps.data.sortcolmn;
            this.state.sortway = nextProps.data.sortway;
            if ('desc' == nextProps.data.sortway) {
                this.state.icon = require('../../../img/icon/sort-desc.png');
            } else if ('asc' == nextProps.data.sortway) {
                this.state.icon = require('../../../img/icon/sort-asc.png');
            } else if ('' == nextProps.data.sortway) {
                this.state.icon = require('../../../img/icon/sort.png');
            }
        } else {
            this.state.icon = require('../../../img/icon/sort.png');
        }
    }
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'white', fontSize: 16 }}>{this.state.text}</Text>
                <Image style={{ height: 20, width: 10, marginLeft: 6 }} source={this.state.icon} />
            </View>
        )
    }
}

class DelegationList extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            dataCopy: [],//保存一个数据副本
            状态: {
                1: '已委托',
                2: '部分成交',
                3: '全部成交',
                5: '全部撤单',
                6: '部分成交后撤单'
            },
            currentUnWrapCardIndex: -1,
            time: '时间'
        }
    }

    componentWillReceiveProps(nextProps) {
        let data = [];
        let flag = false;
        if (nextProps.filters != undefined) {
            for (let i = 0; i < this.state.dataCopy.length; i++) {
                let condition1 = false;
                if (nextProps.filters.orderNo == undefined || nextProps.filters.orderNo == '' || this.state.dataCopy[i].orderNo == nextProps.filters.orderNo) {
                    condition1 = true;
                }
                let condition2 = false;
                if (nextProps.filters.condition == undefined || nextProps.filters.condition == '' || nextProps.filters.condition == '全部' || this.state.状态[this.state.dataCopy[i].状态] == nextProps.filters.condition) {
                    condition2 = true;
                }
                if (condition1 && condition2) {
                    data.push(this.state.dataCopy[i]);
                }
                if (condition1 || condition2) {
                    flag = true;
                }
            }

        }
        if (!flag) {
            data = this.state.dataCopy;
        }
        if (nextProps.sortcolmn != undefined && nextProps.sortcolmn != '') {
            data = this.sort(data, nextProps.sortcolmn, nextProps.sortway);
        }
        this.setState({
            data: data,
        })

    }

    sort = (data, sortcolmn, sortway) => {
        console.log('按照' + sortcolmn + ',' + sortway + '排序')
        this.state.sortcolmn = sortcolmn;
        this.state.sortway = sortway;

        if (sortway == '') {
            return data;
        } else {
            return data.sort(this.sortNumber)//传入自定义的排序函数
        }

    }
    //用于数组排序的回调函数
    sortNumber = (a, b) => {
        let tempA = a[this.state.sortcolmn];
        let tempB = b[this.state.sortcolmn];
        if (this.state.sortcolmn == this.state.time) {
            tempA = new Date(tempA).getTime();
            tempB = new Date(tempB).getTime();
        }
        let result = tempA - tempB;
        if (this.state.sortway == 'desc') {
            return 0 - result;
        } else {
            return result;
        }

    }

    fetchData = () => {
        let paramString = 'sessionId=' + global.loginUser.sessionID + '&userId=' + global.loginUser.traderID;
        let result = request(protocalPath.myOrderQuery, paramString);
        result.then((responseJson) => {
            console.log(responseJson);
            let data = [];
            for (let i = 0; i < responseJson.resultList.length; i++) {
                console.log('this.props.commodityId =' + this.props.commodityId);
                if (this.props.commodityId == undefined || this.props.commodityId == responseJson.resultList[i].commodityId) {
                    let paramString2 = paramString + '&commodityId=' + responseJson.resultList[i].commodityId;
                    // console.log('paramString2--->' + paramString2);
                    let result2 = request(protocalPath.queryCommodity, paramString2);
                    data.push({
                        key: i,
                        orderNo: responseJson.resultList[i].orderNo,
                        状态: responseJson.resultList[i].status,
                        商品名称: '',
                        商品代码: responseJson.resultList[i].commodityId,
                        价格: responseJson.resultList[i].price,
                        数量: responseJson.resultList[i].quantity,
                        未成交: responseJson.resultList[i].notTradeQty,
                        时间: responseJson.resultList[i].orderTime,
                    });
                    result2.then((responseJson) => {
                        if (responseJson.retcode == 0) {
                            //console.log(responseJson);
                            data[i].商品名称 = responseJson.resultList[0].name;
                        }
                        this.setState({
                            data: data,
                            dataCopy: data
                        });
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            }
            return data;
            //console.log(responseJson);  
        }).catch((error => {
            showAlert(error.toString());
        }));

    }

    componentWillMount = () => {
        this.fetchData();
    }

    noData = () => {
        return (
            <View style={[Styles.container, { flex: 1, alignItems: 'center' }]}>
                <Image source={require('../../../img/icon/order.png')} style={{ width: 85, height: 85, marginTop: 50, marginBottom: 10 }}></Image>
                <Text style={[Styles.hanzi]}>您还没有当日委托</Text>
            </View>
        )
    }

    hasData = () => {
        return (
            <FlatList
                data={this.state.data}
                contentContainerStyle={{ paddingBottom: 100 }}
                currentUnWrapCardIndex={this.state.currentUnWrapCardIndex}
                renderItem={
                    ({ item }) => <Card item={item} currentUnWrapCardIndex={this.state.currentUnWrapCardIndex} unWrap={this.unWrap} status={this.state.状态} fetchData={this.fetchData}></Card>
                }
            />
        )
    }
    unWrap = (index) => {
        //this.getData();//必须要给FlatList中data的重新赋值，样式才会改变，不知道为什么
        this.setState({
            currentUnWrapCardIndex: index
        })
    }
    render() {
        return (this.state.data.length > 0 ? this.hasData() : this.noData());
    }
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delegated: '已委托',
            goodsName: '商品名称',
            goodsCode: '商品代码',
            price: '委托价格',
            count: '数量',
            unsettled: '未成交',
            time: '时间',
            // 状态: {
            //     1: '已委托',
            //     2: '部分成交',
            //     3: '全部成交',
            //     5: '全部撤单',
            //     6: '部分成交后撤单'
            // },
        }
    }
    componentWillMount() {
        this.state.wrapCard =
            <TouchableOpacity style={[Styles.item, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]} onPress={this.props.unWrap.bind(this, this.props.item.key)}>
                <Text style={{ fontSize: 30, fontWeight: '600', color: 'white' }}>...</Text>
            </TouchableOpacity> ,
            this.state.unWrapCard =
            <View style={Styles.items}>
                <View style={[Styles.item]}>
                    <Text style={Styles.hanzi}>{this.state.count}</Text>
                    <Text style={Styles.num}>{(this.props.item.数量)}</Text>
                </View>
                <View style={[Styles.item]}>
                    <Text style={Styles.hanzi}>{this.state.unsettled}</Text>
                    <Text style={Styles.num}>{(this.props.item.未成交)}</Text>
                </View>
                <View style={[Styles.item]}>
                    <Text style={Styles.hanzi}>{this.state.time}</Text>
                    <Text style={Styles.num}>{(this.props.item.时间)}</Text>
                </View>
            </View>
        this.state.itemTail =
            <View style={Styles.itemTail} >
                <TouchableOpacity onPress={this.orderCancel.bind(this, this.props.item.orderNo)}>
                    <Text style={[Styles.itemTailText]}>撤销委托</Text>
                </TouchableOpacity>
            </View>
    }

    render() {
        let item = this.props.item;
        let card;
        if (this.props.currentUnWrapCardIndex == this.props.item.key) {
            card = this.state.unWrapCard
        } else {
            card = this.state.wrapCard;
        }
        let itemTail = null;
        if (item.状态 == 1 || item.状态 == 2) {
            itemTail = this.state.itemTail;
        }
        return (
            <View style={[Styles.card]}>
                <View style={Styles.itemHead}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ backgroundColor: '#63B8FF', borderRadius: 3, fontSize: 16, color: 'white', marginRight: 10 }}> 卖 </Text>
                        <Text style={[Styles.hanzi, { color: 'white' }]}>{(item.orderNo)}</Text>
                    </View>
                    <Text style={[Styles.num, { color: 'white' }]}>{this.props.status[item.状态]}</Text>
                </View>
                <View style={Styles.items}>
                    <View style={Styles.item}>
                        <Text style={Styles.hanzi}>{this.state.goodsName}</Text>
                        <Text style={Styles.num}>{(item.商品名称)}</Text>
                    </View>
                    <View style={Styles.item}>
                        <Text style={Styles.hanzi}>{this.state.goodsCode}</Text>
                        <Text style={Styles.num}>{(item.商品代码)}</Text>
                    </View>
                    <View style={[Styles.item]}>
                        <Text style={Styles.hanzi}>{this.state.price}</Text>
                        <Text style={Styles.num}>{(item.价格)}</Text>
                    </View>
                    {card}
                </View>
                {itemTail}
            </View>
        )
    }
    orderCancel = (orderNo) => {
        let paramString = 'sessionId=' + global.loginUser.sessionID + '&userId=' + global.loginUser.traderID + '&orderNo=' + orderNo;
        console.log(paramString);
        let result = request(protocalPath.orderCancel, paramString);
        result.then((responseJson) => {
            console.log(responseJson);
            if (responseJson.retcode == 0) {
                showAlert('共撤单【1】条，成功撤单【1】条');
                //委托状态有缓存，所以取消委托后，延迟一会儿再获取订单信息。setTimeout由于未知原因在这里不能延迟执行函数，所以这里用setInterval代替
                this.timer = setInterval(myCallback, 1000, this.props.fetchData, this.clearTimer);
                let count = 0;
                function myCallback(fetchData, clearTimer) {
                    if (count == 3) {
                        fetchData();
                    } else if (count > 3) {
                        clearTimer();
                    }
                    count++;
                }
            } else {
                showAlert(responseJson.message);
            }
        }).catch((error => {
            showAlert(error.toString());
        }))

    }
    clearTimer = () => {
        console.log('clearTimer');
        this.timer && clearInterval(this.timer);
        this.timer2 && clearInterval(this.timer2)
    }
    /**
     * 记得要在图形卸载是同时清除Timer相关事件
     */
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }

}

const Styles = StyleSheet.create({
    card: {
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderRadius: 8,
        backgroundColor: '#3B3B3B',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        flex: 1
    },
    itemHead: {
        justifyContent: 'space-between',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 16,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
    },
    itemTail: {
        padding: 10,
        flex: 16,
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        borderStyle: 'solid',
        alignItems: 'flex-end'
    },
    itemTailText: {
        padding: 10,
        fontSize: 18,
        color: '#B69971',
        borderRadius: 4,
        borderColor: '#B69971',
        borderWidth: 0.5,
        borderStyle: 'solid',
        backgroundColor: 'white',
    },
    items: {
        flex: 55,
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
    drawerLayoutContainer: {
        backgroundColor: '#393d43',
        flex: 1
    },
    drawerLayoutItem: {
        flex: 1,
    },
    drawerOption: {
        padding: 10, backgroundColor: '#606469', borderRadius: 3, margin: 10
    },
    input: {
        color: 'white',
    },
});
