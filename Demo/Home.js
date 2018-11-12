import React, {Component} from 'react'
import {
    View,Dimensions,Text,
} from 'react-native'
import MonthList from "./mMonth/MonthList";
import Year from "./mYear/Year"
const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            year : '',
            month : ''
        }
    }
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
    render(){
        return(
            <View style = {{flex:1}}>
                    {/*<View style = {{marginTop:44,justifyContent:'center',alignItems:'center'}}>*/}
                        {/*<Text style = {{fontSize:23}}>*/}
                            {/*{this.state.year + '    ' + this.state.month}*/}
                        {/*</Text>*/}
                    {/*</View>*/}

                <Year style = {{width:maxWidth,height:maxHeight}}
                      width = {maxWidth}
                      height = {maxHeight}/>

                {/*<MonthList style = {{marginHorizontal:25,marginTop:64}}*/}
                           {/*width = {maxWidth - 50}*/}
                           {/*height = {270}*/}
                           {/*isSelectMore = {false}*/}
                           {/*isShowNotCurrentMonth = {true}*/}
                           {/*isSelectGray = {false}*/}
                           {/*horizontal = {true}*/}
                           {/*getShowTime = {(year,month) =>{*/}
                               {/*this.setState({*/}
                                   {/*year:year,*/}
                                   {/*month:month*/}
                               {/*})*/}
                           {/*}}*/}
                            {/*getMarks={(month) =>{*/}
                                {/*return [3,6,9];*/}
                            {/*}}*/}
                            {/*getSelectDays={(month) =>{*/}
                                {/*return [13,16,19];*/}
                            {/*}}*/}
                            {/*selectDaysBack={(days) =>{*/}
                                {/*// console.log(days);*/}
                            {/*}}/>*/}

                {/*<Month  style = {{marginHorizontal:25,marginTop:64}}*/}
                        {/*width = {Dimensions.get('window').width - 50}*/}
                        {/*height = {270}*/}
                        {/*month = {{year:2018,*/}
                                    {/*month:10,*/}
                                    {/*systemMonth:10,*/}
                                    {/*marks :[1,5,9],*/}
                                    {/*isSelectMore:true,*/}
                                    {/*selectDays:[1,8,15],*/}
                                    {/*isGray:true,*/}
                                    {/*markColor:'#FF0000',*/}
                                    {/*selectColor : '#1E90FF',*/}
                                    {/*selectShape : 'round',*/}
                                    {/*selectSpace : 5,}}*/}
                        {/*selectDaysBack = {(days) =>{*/}
                            {/*console.log(days);*/}
                        {/*}}/>*/}
            </View>
        )
    }
}