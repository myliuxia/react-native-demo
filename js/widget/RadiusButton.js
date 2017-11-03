import React, {
    Component
} from 'react';

import {
    TouchableHighlight,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';

import {
    CommonStyles,
    CommonColors
} from '../CommonStyles';


export default class RadiusButton extends Component {
    render() {
        return (
            <TouchableHighlight style={[CommonStyles.redButton,this.props.style]} onPress={this.props.onPress}
                                underlayColor={CommonColors.ThemeColorPressed}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600'}}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }
}
export class RedRadiusButton extends Component {
    render() {
        return (
            <TouchableOpacity style={[Styles.confirmButton, this.props.style]} onPress={this.props.onPress}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
export class GrayRadiusButton extends Component {
    render() {
        return (
            <TouchableOpacity style={[Styles.resetButton,this.props.style]} onPress={this.props.onPress}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const Styles = StyleSheet.create({
    resetButton: {
        backgroundColor: '#CFCFCF',
        borderRadius: 8,
        width: 120,
    },
    confirmButton: {
        backgroundColor: '#EE3B3B',
        borderRadius: 8,
        width: 120,
    }
})
