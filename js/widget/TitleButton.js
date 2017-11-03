import React, {
    Component,
} from 'react';

import {
    TouchableHighlight,
    Text,
    Image
} from 'react-native';

export default class TitleButton extends Component {
    render() {
        return (
            <TouchableHighlight style={{flex:1,width:45,alignItems:'center',justifyContent:'center'}} onPress={this.props.onPress}
                                underlayColor='#80000000'>
                <Text style={{color: 'white', fontSize: 14}}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }
}

export class GoBackButton extends Component {
    render() {
        return (
            <TouchableHighlight style={{flex:1,width:45,alignItems:'center',justifyContent:'center'}} onPress={this.props.onPress}
                                underlayColor='#80000000'>
                <Image style={{height:20,width:11,}} source = {require('../img/icon/ic_btn_back.png')}/>
            </TouchableHighlight>
        );
    }
}

export class IconButton extends Component {
    render() {
        return (
            <TouchableHighlight style={{flex:1,width:45,alignItems:'center',justifyContent:'center'}} onPress={this.props.onPress}
                                underlayColor='#80000000'>
                <Image style={this.props.iconStyle} source = {this.props.source}/>
            </TouchableHighlight>
        );
    }
}
