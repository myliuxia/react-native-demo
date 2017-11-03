import React, {Component} from 'react'
import {
    Text,
    View,
    Animated,
    Easing,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import { PageRoute } from '../App.js';
import {CommonColors } from '../CommonStyles';
import {img_server_url,requestWebMoblie} from '../api/Server';
import { protocalPath } from '../api/protocalPath';
// 屏幕宽度
var ScreenWidth = Dimensions.get('window').width;

export default class ScrollVertical extends React.Component {
    static defaultProps = {
        enableAnimation: true,
    };

    constructor(props) {
        super(props)
        let translateValue= new Animated.ValueXY({x: 0, y: 0})
        translateValue.addListener(({x,y})=>{
            // Log('value',x,y)
        })
        this.state = {
            translateValue: translateValue,
            // 滚屏高度
            scrollHeight: this.props.scrollHeight || 20,
            // 滚屏内容
            kb_content: [],
            // Animated.View 滚动到的 y轴坐标
            kb_tempValue: 0,
            // 最大偏移量
            kb_contentOffsetY: 0,
            // 每一次滚动切换之前延迟的时间
            delay: 3000,
            // 每一次滚动切换的持续时间
            duration: 1000,
            enableAnimation: true,
            noticeList:[],//首页公告信息
        }
    }

    getNoticeList = () => {
        let params = 'currentPage=' + 1 + '&pageSize=' + 8;
        let result = requestWebMoblie(protocalPath.noticeList, params);
        result.then((responseJson) => {
            //console.log(responseJson);
            this.setState({
                noticeList: responseJson,
            });
            if(this.state.noticeList.length > 2){
                this.startAnimation();
                this.setState({
                    kb_contentOffsetY: this.state.noticeList.length * this.state.scrollHeight,
                })
            }
        }).catch((error => {
            console.log(error.toString());
        })).done();
    }

    render() {
        return (
            <View style={[styles.kbContainer, {height: this.state.scrollHeight*2}]}>
                {
                    this.state.noticeList.length !== 0 ?
                        <Animated.View
                            style={[
                                {flexDirection: 'column'},
                                {
                                    transform: [
                                        {translateY: this.state.translateValue.y}
                                    ]
                                }
                            ]}>
                            {this.state.noticeList.map(this._createKbItem.bind(this))}
                        </Animated.View> : null
                }
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
        this.setState({
                enableAnimation: nextProps.enableAnimation?true:false
            }, () => {
                this.startAnimation();
            }
        )
    }

    componentDidMount() {
        //console.log('componentDidMount')
        this.getNoticeList();

    }


    _createKbItem(kbItem, index) {
        return (

            <TouchableOpacity key={index} style={styles.noticeListItem}
                    onPress={()=>{this.props.navigation.navigate(PageRoute.NoticeDetailPage,{id:kbItem.id})}} >
                <View style={styles.noticeListItem}>
                    <View style={styles.noticeListLab}><Text style={styles.labText}>最新</Text></View>
                    <Text style={styles.noticeListText} numberOfLines={1} >{kbItem.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    startAnimation = () => {
        if (this.state.enableAnimation) {
            if(!this.animation){
                //console.log('this animation is:'+this.animation);
                this.animation = setTimeout(() => {
                    this.animation=null;
                    this._startAnimation();
                }, this.state.delay);
            }

        }

    }

    componentWillUnmount() {
        if (this.animation) {
            clearTimeout(this.animation);
        }
        if(this.state.translateValue){
            this.state.translateValue.removeAllListeners();
        }
    }

    _startAnimation = () => {
        this.state.kb_tempValue -= this.state.scrollHeight;

        //console.log('start Animation.........:')
        Animated.sequence([

            Animated.timing(
                this.state.translateValue,
                {
                    isInteraction: false,
                    toValue: {x: 0, y: this.state.kb_tempValue},
                    duration: this.state.duration, // 动画持续的时间（单位是毫秒），默认为1000
                    easing: Easing.linear
                }
            ),
        ])
            .start(() => {
                // 无缝切换
                // Log('end')
                //console.log(this.state.kb_tempValue+'==='+this.state.kb_contentOffsetY);
                if (this.state.kb_tempValue === -this.state.kb_contentOffsetY) {
                    // 快速拉回到初始状态
                    this.state.translateValue.setValue({x: 0, y: 0});
                    this.state.kb_tempValue = 0;
                }
                this.startAnimation();
            })
    }
}

const styles = StyleSheet.create({
    kbContainer: {
        // 必须要有一个背景或者一个border，否则本身高度将不起作用
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    /*消息轮播样式*/
    noticeList:{
        flex:1,
            flexDirection: 'column',
            height:40,
            paddingHorizontal:10,
    },
    noticeListItem: {
        flexDirection:'row',
            height:20,
            alignItems:'center',
    },
    noticeListText:{
        color:'#FFFFFF',
            fontSize:12,
            width: ScreenWidth - 150,
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
});

