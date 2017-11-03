

import {StyleSheet} from 'react-native';

// 共用颜色
export const CommonColors = {
    ThemeColor: '#070D14',
    ThemeBgColor: '#070D14',
    BorderColor: '#666666',
    ActiveColor: '#0091FF',
    Transparent: '#00000000',
    ThemeColorPressed: '#D61E1E',
    divider: '#cccccc',
    red:'#cc3300',
    red1:'#FF002A',
    orange:'#D67C12',
    yellow:'#EDC40D',
    gray:'#999999',
    green:'#00cc99',
    blue:'#01a6c9',
    golden:'#B69971',
    white:'#FFFFFF',
};

// 定义图标高度与宽度
export const CommonStyles = StyleSheet.create({
    // 红色按钮
    redButton: {
        height: 30,
        flexDirection: 'row',
        backgroundColor: CommonColors.ThemeColor,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },

    // 标题按钮
    titleButton: {
        width: 50,
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },

    // 标题栏
    headerStyle: {
        backgroundColor: CommonColors.ThemeColor,
    },

  // 标题栏标题
  headerTitleStyle: {
	color: 'white',
	alignSelf:'center',
	alignContent:'center',
  },
    //标题栏右边按钮
    titleRightButton:{
        width: 50,
        color: 'white',
        fontSize: 14,
        textAlign: 'center',

    },
    commonText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});

