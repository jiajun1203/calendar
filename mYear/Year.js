import React, {Component} from 'react'
import {
    View,Platform,
    Text,ScrollView,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import PropTypes from 'prop-types'


export default class Day extends Component{

    static propTypes = {
        year  :  PropTypes.string,   //所属年
        lunar :  PropTypes.string,   //阴历月份
        month :  PropTypes.string,   //公历月份
        describe   :  PropTypes.string,   //描述
        systemMonth : PropTypes.number ,//系统当前月
        days  :     [],
        marks :     [],
        isSelectMore : PropTypes.bool,
        selectDays : [],
        isGray : bool,      //是否灰色展示(非本月)
        selectColor:PropTypes.string,   //选中颜色
        selectShape:PropTypes.string,   //  圆：round  正方形：square，
        selectSpace:PropTypes.number,   //选中背景距离边格的距离，默认0，

    };
    static defaultProps = {
        year  :  2018,   //所属年
        lunar :  '',   //阴历月份
        month :  10,   //公历月份
        describe   :  '',   //描述
        systemMonth : 10 ,//系统当前月
        days  :     [],
        marks :     [],
        isSelectMore : false,
        selectDays : [],
        isGray : true,      //是否灰色展示(非本月)default  ture
        selectColor: '#1E90FF',   //选中颜色
        selectShape: 'round',   //  圆：round  正方形：square，
        selectSpace: 5,   //选中背景距离边格的距离，默认0，
    };

    /*  返回模型
    * month:{
    *   year  :     //所属年
    *   lunar :     //阴历月份
    *   month :     //公历月份
    *   describe   :     //描述
    *   systemMonth : number ,系统当前月
    *   days  :     [],
    *   marks :     [],
    *   isSelectMore :
    *   selectDays : [],
    *   isGray : bool,      //是否灰色展示(非本月)
    *    selectColor:PropTypes.string,   //选中颜色
        selectShape:PropTypes.string,   //  圆：round  正方形：square，
        selectSpace:PropTypes.number,   //选中背景距离边格的距离，默认0，
    * }
    * */

    /*
    * day:{
    *   month :     //所属月
    *   lunar :     //阴历天
    *   day   :     //公历天
    *   currentDay:number,//系统当天
    *   describe   :     //描述
    *   isMark : 是否被标记
    *   isSelect:是否被选中
    * }
    * */
    render(){

        return(
            <View style = {{flex:1}}>
                <View style={{height:Platform.OS === 'ios' ? 44 : 56,backgroundColor: '#1296db',
                    justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style = {{fontSize: 16,
                        color: '#FFF',flex:1,
                        backgroundColor: 'transparent'}}>
                        月
                    </Text>
                </View>


            </View>
        )
    }

    loadMonthData = (month) =>{

    }

}