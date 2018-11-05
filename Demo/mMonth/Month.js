import React, {Component} from 'react'
import {
    View,
} from 'react-native'
import PropTypes from 'prop-types'
import Day from "../mDay/Day";

//定义全局变量
var madd=new Array(12);
var numString="一二三四五六七八九十";
var monString="正二三四五六七八九十冬腊";
var cYear,cMonth,cDay,TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95,

    0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6,

    0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B,

    0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D,

    0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0]=0;
madd[1]=31;
madd[2]=59;
madd[3]=90;
madd[4]=120;
madd[5]=151;
madd[6]=181;
madd[7]=212;
madd[8]=243;
madd[9]=273;
madd[10]=304;
madd[11]=334;

function GetBit(m,n){
    return (m>>n)&1;
}



export default class Month extends Component{

    static propTypes = {
        horizontal:PropTypes.bool,      //是否横向展示

        describe : PropTypes.string,    //关于当月的描述

        marks:PropTypes.array,          //标记数组（默认打标记-右上角圆点）
        markColor:PropTypes.string,     //标记颜色

        isSelectMore:PropTypes.bool,    //是否多选
        selectColor:PropTypes.string,   //选中颜色
        selectShape:PropTypes.string,   //  圆：round  正方形：square，
        selectSpace:PropTypes.number,   //选中背景距离边格的距离，默认0，
        selectDaysWithMonth:PropTypes.object,   //selectDaysBack 返回的month模型

        getDayCount:PropTypes.func,     //获取单月多少天
        selectDaysBack:PropTypes.func,  //选中返回数组
        getDays:PropTypes.func,         //获取当月天

    };
    static defaultProps = {
        horizontal : false,

        describe : '',

        marks:[],

        isSelectMore : false,
        selectColor : '#1296db',
        selectShape: 'round',
        selectSpace: 0,
        selectDaysWithMonth: {},
    };

    constructor(props){
        super(props);
        this.state = {
            daysArr:[],
            systemMonth : 0,
            systemDay   : 0,
            selectArray : [],
            month : props.month,
            year : props.month,
            isBack : props.month.isBack,
        }
    }
    componentWillMount(){
        this.loadMonthData(this.state.month.year,this.state.month.month,true);
    }

    refreshDay = (month) =>{
        this.state.month = month;
        this.state.isBack = month.isBack;
        this.state.daysArr = [];
        this.loadMonthData(this.state.month.year,this.state.month.month,true);
    };

    render(){
        return(
            <View style = {{flexDirection:'row',flexWrap:'wrap',width:this.props.width,height:this.props.height}}>
                {
                    this.state.daysArr.map((item,index) =>{
                        return(
                            <Day day = {item}
                                 ke={ {index}}
                                 style = {{width:this.props.width/7,
                                     height:this.props.height/7}}
                                 selectDayBack = {(day) =>{
                                     if (this.props.selectDaysBack) {
                                         this.props.selectDaysBack({year:day.year,
                                                                    month:day.month,
                                                                    day:day});
                                     }
                                 }}/>
                        )
                    })
                }
            </View>
        )
    }


    getcDateString = () => {
        var month="";
        if(cMonth<1){
            month+="(闰)";
            month+=monString.charAt(-cMonth-1);
        }
        else{
            month+=monString.charAt(cMonth-1);
        }
        month+="月";
        let str = (cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"三"));
        let lastDay = str + numString.charAt((cDay-1)%10);

        return [month,lastDay];
    };


//农历转换
    setRelatedValue = (year,month,day) =>{
        TheDate= new Date(year,month,day);
        var total,m,n,k;
        var isEnd=false;
        var tmp=TheDate.getYear();
        if(tmp<1900){
            tmp+=1900;
        }
        total=(tmp-1921)*365+Math.floor((tmp-1921)/4)+madd[TheDate.getMonth()]+TheDate.getDate()-38;

        if(TheDate.getYear()%4==0&&TheDate.getMonth()>1) {
            total++;
        }
        for(m=0;;m++){
            k=(CalendarData[m]<0xfff)?11:12;
            for(n=k;n>=0;n--){
                if(total<=29+GetBit(CalendarData[m],n)){
                    isEnd=true; break;
                }
                total=total-29-GetBit(CalendarData[m],n);
            }
            if(isEnd) break;
        }
        cYear=1921 + m;
        cMonth=k-n+1;
        cDay=total;
        if(k==12){
            if(cMonth==Math.floor(CalendarData[m]/0x10000)+1){
                cMonth=1-cMonth;
            }
            if(cMonth>Math.floor(CalendarData[m]/0x10000)+1){
                cMonth--;
            }
        }
        let arr = this.getcDateString(cYear,cMonth,cDay);
        arr.unshift(cYear);
        return arr;

    };


    getDayWith = (year,month,i) => {
        let monthData = this.state.month;
        let lunar = this.setRelatedValue(year,month - 1,i);
        let isMark = -1;
        let isSelected = -1;
        if (month === monthData.month) {
            isMark = monthData.marks.findIndex(value => value === i);
            isSelected = monthData.selectDays.findIndex(value => value === i);
        }
        let day = {};
        day.lunarMonth = lunar[1];
        day.lunarDay = lunar[2];
        day.lunarYear = lunar[0];
        day.month = month;
        day.year = monthData.year;
        day.systemMonth = this.state.systemMonth;
        day.day = i;
        day.currentDay = this.state.systemDay;
        day.describe = '';
        day.isSelectGray = monthData.isSelectGray;
        day.isMark = isMark < 0 ? false : true;
        day.isSelected = isSelected < 0 ? false : true;
        day.selectColor = monthData.selectColor;
        day.selectShape = monthData.selectShape;
        day.selectSpace = monthData.selectSpace;
        day.markColor = monthData.markColor;
        day.isShowNotCurrentMonth = monthData.isShowNotCurrentMonth;
        day.isGray = monthData.isGray ? monthData.month === month ? false : true : false;

        return day;
    };


    /**
     *
     * @param year      年
     * @param month     月
     * @param isSearch  是否向上下查找
     */
    loadMonthData = (year,month,isSearch) =>{

        this.state.selectArray = [];

        let downSearchArr = [];

        let curMonthDays = new Date(year, month, 0).getDate();

        if (isSearch){

            let startDate = new Date(year,month - 1,1);

            let startDay = startDate.getDay();

            if (startDay !== 7){

                let newMonth = month;
                let newYear = year;

                if (month === 1){
                    newMonth = 12;
                    newYear = year - 1;
                }else {
                    newMonth = month - 1;
                }

                let upMonthDays = new Date(newYear, newMonth, 0).getDate();
                for (let i = upMonthDays - startDay;i < upMonthDays; i++){
                    let day = this.getDayWith(newYear,newMonth,i);
                    this.state.daysArr.push(day);
                }
            }

            let endDate = new Date(year,month - 1,curMonthDays);

            let endDay = endDate.getDay();

            if (endDay !== 6){

                let newMonth = month;
                let newYear = year;

                if (month === 12){
                    newMonth = 1;
                    newYear = year + 1;
                }else {
                    newMonth = month + 1;
                }
                for (let i = 1; i < 7 - endDay; i++) {
                    let day = this.getDayWith(newYear,newMonth,i);
                    downSearchArr.push(day);
                }
            }
        }

        let daysArr = [];
        let monthData = this.state.month;

        let date = new Date();
        this.state.systemMonth = date.getMonth() + 1;

        this.state.systemDay = date.getDate();
        let arr = [];
        for (let i = 1; i < curMonthDays + 1; i++){

            let day = this.getDayWith(monthData.year,month,i);

            if (month === monthData.month) {
                this.state.daysArr.push(day);
                daysArr.push(day);
            }else {
                daysArr.push(day);
            }
            if (this.props.selectDaysBack &&
                this.state.month.selectDays.length > 0 &&
                this.state.isBack) {

                if (this.state.month.isBack){
                    if (this.state.month.selectDays.findIndex(index => (i) === index) > -1){
                        arr.push({day});
                    }
                    if (arr.length === this.state.month.selectDays.length){
                        this.state.isBack = false;
                        this.props.selectDaysBack([{year:day.year,months:[{month:day.month,days:arr}]}]);
                    }
                }
            }
        }

        if (month !== monthData.month){
            return daysArr;
        }

        for (let i = 0; i < downSearchArr.length; i++){
            this.state.daysArr.push(downSearchArr[i]);
        }

        monthData.days = daysArr;

        this.setState({
            daysArr : this.state.daysArr
        })

    }

}