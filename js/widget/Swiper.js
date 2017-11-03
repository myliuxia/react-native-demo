import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    InteractionManager
} from 'react-native';

import { PageRoute } from '../App.js';
import {CommonColors } from '../CommonStyles';
import {img_server_url,requestWebMoblie} from '../api/Server';
import { protocalPath } from '../api/protocalPath';

// 屏幕宽度
var ScreenWidth = Dimensions.get('window').width;

var SwiperWidth = ScreenWidth-34;

/**
 * 幻灯片轮播图
 */
export class SwiperView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedChildIndex: 0,//当前显示的图片序列
            arrIndexImages:[],
            enableTimer:true,
        };

    }
    componentDidMount() {
        this.dataArr();
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer);

    }
    dataArr = () => {
        let result = requestWebMoblie(protocalPath.indexImages, '');
        result.then((responseJson) => {
            //console.log("111111");
            //console.log(responseJson);
            this.setState({
                arrIndexImages: responseJson,
            });

        }).catch((error => {
            console.log(error.toString());
        })).done(() =>{this.startTimer();});
    }



    render(){
        return(
            <View style={styles.swiperBox}>
                <ScrollView
                    ref='scrollView'
                    //水平方向
                    horizontal={true}
                    //当值为true时显示滚动条
                    showsHorizontalScrollIndicator={false}
                    //当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上
                    //pagingEnabled={true}
                    //滑动完一贞
                    onMomentumScrollEnd={()=>{this._onAnimationEnd()}}
                    //开始拖拽
                    onScrollBeginDrag={()=>{this._onScrollBeginDrag()}}
                    //结束拖拽
                    onScrollEndDrag={(e)=>{this._onScrollEndDrag(e)}}
                >
                    {this._readerAllChilds(this.props.navigation)}

                </ScrollView>
                <View style={styles.circleContainer}>
                    {this._readerAllCircles()}
                </View>
            </View>
        )
    }

    /**
     * ScrollView滑动执行顺序onScrollBeginDrag -> onScrollEndDrag -> onMomentumScrollEnd
     */

    /**幻灯图片显示*/
    _readerAllChilds(navigation){

        let allChilds = [];
        //let allArr = this.state.arrIndexImages;
        //获取数据
        for (let i = 0; i < this.state.arrIndexImages.length; i++) {
            allChilds.push(
                <TouchableOpacity activeOpacity={1} key={i} onPress={()=>
                        navigation.navigate(PageRoute.WebViewPage,{uri:this.state.arrIndexImages[i].imageUrl})
                    }>
                    <Image source={{uri:img_server_url+this.state.arrIndexImages[i].imageId+'?imageType='+this.state.arrIndexImages[i].type}}
                           style={styles.imageStyle}/>
                </TouchableOpacity>
            )
        }
        return allChilds;
    }

    /**幻灯片对应圆点*/
    _readerAllCircles(){
        let allCircles = []
        for (let i = 0; i < this.state.arrIndexImages.length; i++) {

            allCircles.push(
                <View key={i} style={ (i === this.state.selectedChildIndex) ? styles.circleSelected : styles.circle}/>
            )
        }
        return allCircles;
    }
    /**手动滑动分页实现 */
    _onAnimationEnd() {

    }
    /**开始拖拽 */
    _onScrollBeginDrag(){
        //console.log("开始拖拽");
        //两种清除方式 都是可以的没有区别
        //this.timer &&clearInterval(this.timer);
        //this.timer && clearTimeout(this.timer);
        this.setState({
            enableTimer:false,
        });
    }
    /**停止拖拽 */
    _onScrollEndDrag(e){
        //console.log("停止拖拽");
        let scrollView = this.refs.scrollView;
        //求出偏移量
        let offsetX = e.nativeEvent.contentOffset.x;
        //求出当前页数
        let pageIndex = Math.round(offsetX / SwiperWidth);
        //判断滑动方向
        if(offsetX < this.state.selectedChildIndex * SwiperWidth ){
            pageIndex = Math.floor(offsetX / SwiperWidth)
        }else if(offsetX > this.state.selectedChildIndex * SwiperWidth ){
            pageIndex = Math.ceil(offsetX / SwiperWidth)
        }

        //更改状态机
        scrollView.scrollResponderScrollTo({x:pageIndex * SwiperWidth,y:0,animated:true});
        this.setState({ selectedChildIndex: pageIndex });

        this.setState({
            enableTimer:true,
        });
        this.startTimer()


    }

    /**通过定时器实现自动播放轮播图 */
    startTimer = () =>{
        if (this.state.enableTimer) {

            this.timer = setTimeout(() => {
                this.timer = null;
                this._startTimer();
            }, 8000);
        }
    }

    _startTimer = () => {

        let scrollView = this.refs.scrollView;
        //console.log("12132342");
        let imageCount = this.state.arrIndexImages.length;
        //4.1 设置圆点
        let activePage = 0;
        //4.2判断
        if(this.state.selectedChildIndex >= imageCount-1){
            activePage = 0;
        }else{
            activePage = this.state.selectedChildIndex+1;
        }
        //4.3 更新状态机
        this.setState({selectedChildIndex: activePage});

        //4.4 让scrollview 滚动起来
        let offsetX = this.state.selectedChildIndex * SwiperWidth;
        //console.log(activePage+"--"+offsetX);
        scrollView.scrollResponderScrollTo({x:offsetX,y:0,animated:true});
        this.startTimer();
    }


}


const styles = StyleSheet.create({
    swiperBox: {
        width:ScreenWidth-20,
        height:SwiperWidth/2 + 14,
        marginHorizontal:10,
        paddingHorizontal: 6,
        paddingVertical: 6,
        borderRadius:6,
        borderWidth:1,
        borderColor:CommonColors.BorderColor,
        backgroundColor: "#FFFFFF11"
    },
    circleContainer: {
        flexDirection:'row',
        position:'absolute',
        bottom:20,
        width:SwiperWidth,
        alignItems:'center',
        justifyContent:'center',
    },
    scrollStyle:{
        width:SwiperWidth,

    },
    imageStyle:{
       width:SwiperWidth,
       height:SwiperWidth/2,
    },
    circle: {
        width:6,
        height:6,
        borderRadius:6,
        backgroundColor:'#00000060',
        marginHorizontal:5,
    },
    circleSelected: {
        width:6,
        height:6,
        borderRadius:6,
        backgroundColor:CommonColors.ActiveColor,
        marginHorizontal:5,
    }
})


