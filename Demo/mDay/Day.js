import React, {Component} from 'react'
import {
    View,Text,TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

const textColor = '#000';
const desTextColor = '#808080';


export default class Day extends Component{

    static propTypes = {
        describe : PropTypes.string,    //关于当天的描述
        lunarMonth:PropTypes.string,//      农历月;
        lunarDay:PropTypes.string,//         农历日;
        lunarYear:PropTypes.string,//       农历年
        mark:PropTypes.number,          //标记 默认打标记-右上角圆点）
        markColor:PropTypes.string,     //标记颜色

        selectColor:PropTypes.string,   //选中颜色
        selectShape:PropTypes.string,   //  圆：round  正方形：square，
        selectSpace:PropTypes.number,   //选中背景距离边格的距离，默认0，
        selectDayWithMonth:PropTypes.object,   //selectDayBack 返回的day模型

        selectDayBack : PropTypes.func,     //选择天返回
        getDay:PropTypes.func,         //获取当月天

    };
    static defaultProps = {
        describe : '',

        mark:0,

        isSelectMore : false,
        selectColor : '#1296db',
        selectShape: 'round',
        selectSpace: 0,
        selectDaysWithMonth: {},
    };
    constructor(props){
        super(props);
        this.state = {
            isSelected : false,
        }
    }
    /*
    * day:{
    *   month :     //所属月
    *   systemMonth:    //系统月
    *   lunarMonth      农历月;
        lunarDay        农历日;
        lunarYear       农历年;
    *   day   :     //公历天
    *   currentDay:number,//系统当天
    *   describe   :     //描述
    *   isMark : 是否被标记
    *   isSelected:是否被选中
    *   isGray: 是否非本月灰色展示
    *   selectColor:PropTypes.string,   //选中颜色
        selectShape:PropTypes.string,   //  圆：round  正方形：square，
        selectSpace:PropTypes.number,   //选中背景距离边格的距离，默认0，
        markColor:PropTypes.string,     //标记颜色
    * }
    * */
    render(){

        let {width,height} = this.props.style;
        let day = this.props.day;
        let borderRadius = 3;
        let widhei = width - day.selectSpace;
        if (width > height)
            widhei = height - day.selectSpace;

        if (day.selectShape === 'round') {
            if (width > height)
                borderRadius = widhei/2;
            else{
                widhei = height - day.selectSpace;
                borderRadius = widhei/2;
            }
        }

        let defaultColor = textColor;

        if (day.systemMonth === day.month && day.day === day.currentDay){
            defaultColor = '#FF0000';
        }
        if (day.isGray)
            defaultColor = '#D3D3D3';

        if (day.isSelected){
            defaultColor = '#FFF';
        }

        if (!day.isShowNotCurrentMonth && day.isGray){
            return (
                <View style = {this.props.style}/>
            )
        }

        return(


            <TouchableOpacity style = {[this.props.style,{justifyContent:'center',alignItems:'center',
                                        borderBottomColor:'#D3D3D3',borderBottomWidth:0.5}]}
                              activeOpacity={1}
                              onPress = {() =>{
                                  if (!day.isSelectGray && day.isGray){
                                      return;
                                  }
                                this.setState({isSelected:!day.isSelected});
                                day.isSelected = !day.isSelected;
                                if (this.props.selectDayBack)
                                    this.props.selectDayBack(day);
                              }}>
                <View style = {{width:widhei,justifyContent:'center',
                                height:widhei,alignItems:'center',
                                backgroundColor:day.isSelected ? day.selectColor : 'transparent',
                                borderRadius:borderRadius
                }}>
                    <Text style = {{fontSize:15,color:defaultColor,textAlign:'center'}}>
                        {day.day}
                    </Text>
                    <Text style = {{fontSize:9,color:defaultColor,textAlign:'center'}}>
                        {day.lunarDay === '初一' ? day.lunarMonth : day.lunarDay}
                    </Text>
                </View>
                <View style = {{position: 'absolute',width:5,height:5,borderRadius:2.5,
                                backgroundColor:day.isMark ? day.markColor : 'transparent',
                                top:3,right:3}}/>
            </TouchableOpacity>
        )
    }
}