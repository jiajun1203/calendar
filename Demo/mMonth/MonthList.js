import React, {Component} from 'react'
import {
    View,Text, ScrollView,Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'
import Month from './Month'

const topWeekHeight = 30;
const date = new Date();
const weekArray = ['日','一','二','三','四','五','六'];


export default class MonthList extends Component{
    static propTypes = {
        horizontal: PropTypes.bool,
        year : PropTypes.number,    //默认当前年
        month: PropTypes.number,    //默认当前月 和 日

        marks : PropTypes.array,    //日期标签（右上角小红点）样式[{year:[month:[day]]}]
        selectDays:PropTypes.array, //选中数组

        isShowNotCurrentMonth : PropTypes.bool, //是否展示非本月日期
        isSelectGray : PropTypes.bool,          //当展示非本月日期是，是否可选择非本月日期

        isSelectMore: PropTypes.bool,       //是否多选
        markColor : PropTypes.string,       //标签颜色
        selectColor : PropTypes.string,     //选中颜色
        selectShape:PropTypes.string,   //  圆：round  正方形：square，
        selectSpace:PropTypes.number,   //选中背景距离边格的距离，默认0，

        getMarks : PropTypes.func,      //返回当前年月，获取对应月标签数组
        getSelectDays : PropTypes.func, //返回当前年月，获取对应月选中数组  ***每月初始化调用一次，此后不再调用
        selectDaysBack : PropTypes.func,    //返回选中day数组
    };

    static defaultProps = {
        horizontal : true,
        year : date.getFullYear(),
        month : date.getMonth() + 1,

        markColor:'#FF0000',
        selectColor : '#1E90FF',
        selectShape: 'round',
        selectSpace:5,

        isShowNotCurrentMonth:true,
    };
    constructor(props){
        super(props);
        this.state = {

            prepareArray : [],
            oldIndex : 1,
            offSet : {x:props.width,y:0},
            viewsTime : [],
            currentMonth : props.month,
            currentYear : props.year,
            selectArray : [],
            data:[],

            viewArray : [],
        }
    };
    componentWillMount(){


        this.state.data = [ this.setMarkValue(this.getYearSpecifiedData(this.getMonthArray(this.props.year,this.props.month,true,true,false),this.getCorrespondingTime(false,this.props.year,this.props.month).month)),
            this.setMarkValue(this.getYearSpecifiedData(this.getMonthArray(this.props.year,this.props.month,true,false,false),this.props.month)),
            this.setMarkValue(this.getYearSpecifiedData(this.getMonthArray(this.props.year,this.props.month,true,false,true),this.getCorrespondingTime(true,this.props.year,this.props.month).month))];


        if (this.props.getShowTime){
            this.props.getShowTime(this.state.data[1].year,this.state.data[1].month);
        }

        this.setState({
            data:this.state.data
        });
    };

    getYearSpecifiedData = (data,month) =>{
        let findIndex = data.month.findIndex(item => item.time === month);
        return data.month[findIndex].data;
    };

    getDetailWith = (year,month) =>{
        if (this.findMonthInYear(year,month)){
            let yearData = this.state.prepareArray[this.state.prepareArray.findIndex((item) =>item.year === year)];
            for (let i = 0; i < yearData.month.length; i++) {
                if (yearData.month[i].time === month)  {
                    return yearData.month[i].data;
                }
            }
        }
    };

    getCorrespondingTime = (isNext,year,month) =>{
        if (isNext){
            if (month === 12){
                year = year + 1;
                month = 1;
            } else
                month = month + 1;
        } else {
            if (month === 1){
                year = year - 1;
                month = 12;
            } else
                month = month - 1;
        }
        return {year:year,month:month};
    };

    findMonthInYear = (year,month) =>{
        let findYearIndex = this.state.prepareArray.findIndex(item => item.year === year);
        if (findYearIndex === -1){
            return false;
        }
        let yearData = this.state.prepareArray[findYearIndex];
        if (!yearData){
            return false;
        }
        let findMonthIndex = yearData.month ? yearData.month.findIndex(item => item.time === month) : -1;
        return findMonthIndex === -1 ? false : true;
    };

    getMonthArray = (year,month,isContinue,isUp,isNext) =>{
        // debugger;
        if (!year || !month){

            if (!month)
                year = date.getFullYear();

            if (!month)
                month = date.getMonth() + 1;
        }
        if (isNext){
            if (month === 12){
                year = year + 1;
                month = 1;
            } else
                month = month + 1;
        } else if (isUp){
            if (month === 1){
                year = year - 1;
                month = 12;
            } else
                month = month - 1;
        }
        let findYearIndex = this.state.prepareArray.findIndex(item => item.year === year);
        let yearData = findYearIndex === -1 ? {} : this.state.prepareArray[findYearIndex];
        if (findYearIndex !== -1){
            let findMonthIndex = yearData.month ? yearData.month.findIndex(item => item.time === month) : -1;
            if (findMonthIndex !== -1){
                return this.getYearSpecifiedData(this.state.prepareArray[findYearIndex],month);
            }else {
                yearData.month = yearData.month ? yearData.month : [];
            }
        }

        let data = {    year:year,
                        month:month,
                        isSelectMore:this.props.isSelectMore,
                        isGray:true,
                        isSelectGray:this.props.isSelectGray,
                        isShowNotCurrentMonth : this.props.isShowNotCurrentMonth,
                        markColor:this.props.markColor,
                        selectColor : this.props.selectColor,
                        selectShape : this.props.selectShape,
                        selectSpace : this.props.selectSpace,};

        if (findYearIndex === -1){
            yearData = {year:year,month:[{time:month,data:data}]};
            this.state.prepareArray.push(yearData);
        }else{
            if (!this.state.prepareArray[findYearIndex].month){
                this.state.prepareArray[findYearIndex].month = [];
            }
            this.state.prepareArray[findYearIndex].month.push({time:month,data:data});
            yearData = this.state.prepareArray[findYearIndex];
        }
        return yearData;
    };

    setMarkValue = (item) =>{
        let markArr = [];
        let selectedArr = [];
        if (item){
            let index = this.state.selectArray.findIndex(value => value.year === item.year);

            if (index > -1){
                item.isBack = false;
                let months = this.state.selectArray[index].months;
                if (months){
                    let mIndex = months.findIndex(value => value.month === item.month);
                    if (mIndex > -1 && months[mIndex].days){
                        months[mIndex].days.map((value) =>{
                            selectedArr.push(value);
                        });
                    }else {
                        if (this.props.getSelectDays) {
                            selectedArr = this.props.getSelectDays(item);
                            months.push({month:item.month,days:selectedArr});
                        }
                    }
                }else {
                    this.state.selectArray[index].months = [];
                    if (this.props.getSelectDays) {
                        selectedArr = this.props.getSelectDays(item);
                        this.state.selectArray[index].months.push({month:item.month,days:selectedArr});
                    }
                }
            }else if (this.props.getSelectDays){
                selectedArr = this.props.getSelectDays(item);
                this.state.selectArray.push({year:item.year,months:[{month:item.month,days:selectedArr}]});
            }

            if (this.props.getMarks){
                markArr = this.props.getMarks(item);
            }
            item.selectDays = selectedArr;
            item.marks = markArr;
        }
        return item;
    };

    gotoContentCenter = (animation = false) =>{
        if (this.swiperView){
            this.swiperView.scrollTo({x:this.props.horizontal ? this.props.width : 0,y:!this.props.horizontal ? this.props.height : 0,animated:animation});
        }
    };

    onScrollEndDrag = (e) =>{
        let nativeEvent = e.nativeEvent;
        let dataArr = [];
        let data;

        let isSwiper = this.props.horizontal ? nativeEvent.contentOffset.x > nativeEvent.layoutMeasurement.width :
            nativeEvent.contentOffset.y > nativeEvent.layoutMeasurement.height;

        let isHorizontalSwiper = Math.abs(nativeEvent.contentOffset.x - nativeEvent.layoutMeasurement.width) > nativeEvent.layoutMeasurement.width * 0.2;
        let isVerticalSwiper = Math.abs(nativeEvent.contentOffset.y - nativeEvent.layoutMeasurement.height) > nativeEvent.layoutMeasurement.height * 0.2;

        let isLoad = this.props.horizontal ? isHorizontalSwiper : isVerticalSwiper;

        if (isSwiper){
            //下个月
            if (isLoad){
                data = this.state.data[2];
                let time = this.getCorrespondingTime(true,data.year,data.month);
                dataArr = [ this.setMarkValue(this.state.data[1]),
                    this.setMarkValue(data),
                    this.setMarkValue(this.getDetailWith(time.year,time.month))];
            } else{
                this.gotoContentCenter(true);
                return
            }
        }else {
            //上个月
            if (isLoad){
                data = this.state.data[0];
                let time = this.getCorrespondingTime(false,data.year,data.month);
                dataArr = [ this.setMarkValue(this.getDetailWith(time.year,time.month)),
                    this.setMarkValue(data),
                    this.setMarkValue(this.state.data[1])];
            }else{
                this.gotoContentCenter(true);
                return
            }
        }

        if (dataArr.findIndex(item => item === undefined) !== -1){
            this.gotoContentCenter();
            return;
        }

        if (this.props.getShowTime){
            this.props.getShowTime(dataArr[1].year,dataArr[1].month);
        }

        this.state.data = dataArr;
        this.state.offSet = {x:0,y:0};

        this.gotoContentCenter();

        if (this.leftMonth && this.leftMonth.refreshDay){
            this.leftMonth.refreshDay(dataArr[0]);
        }
        if (this.centerMonth && this.centerMonth.refreshDay){
            this.centerMonth.refreshDay(dataArr[1]);
        }
        if (this.rightMonth && this.rightMonth.refreshDay){
            this.rightMonth.refreshDay(dataArr[2]);
        }
    };

    onScrollBeginDrag = () =>{
        if (this.state.data.length < 3){
            return;
        }
        let upData = this.state.data[0];
        let downData = this.state.data[2];
        let upTime = this.getCorrespondingTime(false,upData.year,upData.month);
        let downTime = this.getCorrespondingTime(true,downData.year,downData.month);
        this.findMonthInYear(upTime.year,upTime.month);
        this.findMonthInYear(downTime.year,downTime.month);
        if (!this.findMonthInYear(upTime.year,upTime.month)) {
            this.getMonthArray(upData.year,upData.month,false,true,false);
        }
        if (!this.findMonthInYear(downTime.year,downTime.month)){
            this.getMonthArray(downData.year,downData.month,false,false,true);
        }
    };

    getViews = () =>{

        this.state.data.map((item,index) =>{
            if (item){
                if (this.props.getMarks){
                    markArr = this.props.getMarks(item);
                }
                if (this.props.getSelectDays){
                    selectedArr = this.props.getSelectDays(item);
                }
                item.marks = markArr;
                item.selectDays = selectedArr;
            }

            this.state.viewArray.push(
                <View style = {{width : this.props.width,height:this.props.height}}>
                    <Month  ref = {ref => {
                        if (index === 0){
                            this.leftMonth = ref;
                        }else if(index === 1){
                            this.centerMonth = ref;
                        }else if(index === 2){
                            this.rightMonth = ref;
                        }
                    }}
                            year={item.year}
                            month={item.month}
                            isSelectMore={item.isSelectMore}
                            isGray={item.true}
                            isSelectGray={item.isSelectGray}
                            isShowNotCurrentMonth = {item.isShowNotCurrentMonth}
                            markColor={item.markColor}
                            selectColor = {item.selectColor}
                            selectShape = {item.selectShape}
                            selectSpace = {item.selectSpace}
                            width = {item.width}
                            height = {item.height}
                            selectDaysBack = {(selectItem) =>{

                                if (selectItem && Array.isArray(selectItem)){
                                    this.state.selectArray = this.state.selectArray.concat(selectItem);
                                    return;
                                }

                                let yearFindIndex = this.state.selectArray.findIndex(item => item.year === selectItem.year);
                                if (yearFindIndex > -1){
                                    let year = this.state.selectArray[yearFindIndex];

                                    let monthFindIndex = year.months.findIndex(item => item.month === selectItem.month);
                                    if (monthFindIndex > -1){
                                        let days = year.months[monthFindIndex].days;
                                        let dayFindIndex = days.findIndex(item => item === selectItem.day.day);
                                        if (dayFindIndex === -1){
                                            days.push(selectItem.day.day);
                                        }else {
                                            days.splice(dayFindIndex,1);
                                        }
                                    }else {
                                        year.months.push({month:selectItem.month,days:[selectItem.day.day]});
                                    }
                                }else {
                                    this.state.selectArray.push({year:selectItem.year,months:[{month:selectItem.month,days:[selectItem.day.day]}]});
                                }

                                if (this.props.selectDaysBack){
                                    this.props.selectDaysBack(this.state.selectArray);
                                }
                            }}/>
                </View>
            )
        });

        return this.state.viewArray;
    };

    render(){

        if (this.state.data.length === 0){
            return(<View/>)
        }

        if (this.state.viewArray.length === 0){
            this.getViews();
        }

        return(
            <View style={[this.props.style,{width:this.props.width,height:this.props.height}]}>
                <View style={{height:topWeekHeight,width:this.props.width,flexDirection:'row'}}>
                    {
                        weekArray.map((item,index) =>{
                            return(
                                <View style = {{justifyContent:'center',flex:1,alignItems:'center'}}>
                                    <Text style = {{fontSize:11}}>
                                        {item}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>

                <ScrollView style = {{flex:1}}
                            ref = {ref => {this.swiperView = ref}}
                            onScrollEndDrag = {this.onScrollEndDrag}
                            horizontal = {this.props.horizontal}
                            scrollsToTop = {false}
                            alwaysBounceVertical = {false}
                            iosautomaticallyAdjustContentInsets = {false}
                            scrollEventThrottle = {16}
                            onScrollBeginDrag = {this.onScrollBeginDrag}
                            overScrollMode = {'never'}
                            bounces = {false}
                            contentOffset = {{x:this.props.horizontal ? this.props.width : 0,y:!this.props.horizontal ? this.props.height : 0}}
                            showsVerticalScrollIndicator = {false}
                            showsHorizontalScrollIndicator = {false}>
                    { this.state.viewArray }
                </ScrollView>
            </View>
        )
    }

}