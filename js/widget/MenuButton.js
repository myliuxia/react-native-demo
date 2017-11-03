'use strict';
import React, {
    Component,
} from 'react';

import {
    TouchableHighlight,
    Text,
    View,
    Image
} from 'react-native';

export class MenuButton extends Component {
    render() {
        return (
            <TouchableHighlight style={[{alignItems:'center',justifyContent:'center'},this.props.style]} onPress={this.props.onPress}
                                underlayColor='#FFFFFF10'>
                <View>
                    <Image source={this.props.menuIcon} style={{width:50,height:50}}/>
                    <Text style={{color:'#FFFFFF',fontSize:12,marginTop:5}} >{this.props.menuName}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}