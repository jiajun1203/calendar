import React, {Component} from 'react'
import {
    View,Platform,Dimensions,
    Text,ScrollView,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import PropTypes from 'prop-types'
import Month from "../mMonth/Month";

const height = Platform.OS === 'ios' ? 64 : 56;

export default class Day extends Component{

    static propTypes = {
        year  :  PropTypes.number,   //所属年
        lunar :  PropTypes.string,   //阴历月份
        month :  PropTypes.number,   //公历月份
        describe   :  PropTypes.string,   //描述
        systemMonth : PropTypes.number ,//系统当前月
        days  :     PropTypes.array,
        marks :     PropTypes.array,
        isSelectMore : PropTypes.bool,
        selectDays : PropTypes.array,
        isGray : PropTypes.bool,      //是否灰色展示(非本月)
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

        let arr = [1,2,3,4,5,6,7,8,9,10,11,12];

        return(
            <View style = {{flex:1}}>
                <View style={{height:height,backgroundColor: '#1296db',
                    justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style = {{fontSize: 16,
                                    color: '#FFF',flex:1,
                                    backgroundColor: 'transparent'}}>
                        月
                    </Text>
                </View>

                <ScrollView style = {{flex:1}}>

                    {/*<Month  year = {2018}*/}
                            {/*ref = {ref =>{*/}
                                {/*ref.refreshDay(1);*/}
                            {/*}}*/}
                            {/*month = {1}*/}
                            {/*width = {this.props.width}*/}
                            {/*height = {this.props.height}*/}
                            {/*selectDaysBack = {(selectItem) =>{*/}

                            {/*}}/>*/}

                    <View style = {{height:this.props.height - height,width:this.props.width,
                                    flexDirection:'row',flexWrap:'wrap'}}>
                        {
                            arr.map((item,index) =>{
                                return(
                                    <View>
                                        <View style = {{height:20,justifyContent:'center',marginLeft:15}}>
                                            <Text style = {{fontSize:17,fontWeight:'bold'}}>
                                                {item + '月'}
                                            </Text>
                                        </View>
                                        <Month style = {{marginLeft:10}}
                                               year = {2018}
                                               fontSize = {9}
                                               selectSpace = {5}
                                               isSelect = {false}
                                               textBold={'bold'}
                                               isShowNotCurrentMonth = {false}
                                               isGray = {true}
                                               isShowLunar = {false}
                                               isShowLine = {false}
                                               key = {index}
                                               month = {item}
                                               width = {(this.props.width - 8)/3 - 10}
                                               height = {(this.props.height - height)/4 - 20}/>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>

            </View>
        )
    }
}