# calendar
# react-native calendar
  支持单/多选，农历展示，添加标记，首次加载自动添加选择项，左右上下滑动查看上下月。
 
  选择框大小，样式均可修改。
 
  下次更新按年展示，

  使用：npm i mrczz-calendar --save

  DEMO:cd到Demo目录下，执行npm install 完成后，直接运行项目 

        <MonthList  style = {{marginHorizontal:25,marginTop:64}}
                    width = {Dimensions.get('window').width - 50}
                    height = {270}
                    isSelectMore = {false}           //是否允许多选
                    isShowNotCurrentMonth = {true}   //是否展示当月天
                    isSelectGray = {false}           //是否可以点击非当月天
                    horizontal = {true}              //是否横向滑动
                    getShowTime = {(year,month) =>{//返回当前年月
                    }}
                    getMarks={(month) =>{
                    //每次加载新界面，获取对应标签，数组中传几号
                    return [3,6,9];
                    }}
                    getSelectDays={(month) =>{
                    //每次加载新界面（重复加载<加载第二次>不获取），获取对应选择天，数组中传几号
                    return [13,16,19];
                    }}
                    selectDaysBack={(days) =>{
                    console.log(days);
                    }}/>
                        

        ## 可设置属性   ##
        horizontal: PropTypes.bool, //暂时只能横屏
        year : PropTypes.number,    //默认当前年
        month: PropTypes.number,    //默认当前月 和 日

        marks : PropTypes.array,    //日期标签（右上角小红点)

        isShowNotCurrentMonth : PropTypes.bool, //是否展示非本月日期
        isSelectGray : PropTypes.bool,          //是否可选择非本月日期

        isSelectMore: PropTypes.bool,       //是否多选
        markColor : PropTypes.string,       //标签颜色
        selectColor : PropTypes.string,     //选中颜色
        selectShape:PropTypes.string,   //  圆：round  正方形：square，
        selectSpace:PropTypes.number,   //选中背景距离边格的距离，默认0，

        getMarks : PropTypes.func,      //返回当前年月，获取对应月标签数组
        getSelectDays : PropTypes.func, //返回当前年月，获取对应月选中数组  ***每月初始化调用一次，此后不再调用
        selectDaysBack : PropTypes.func,    //返回选中day数组
                                


 ![Alt text](https://github.com/jiajun1203/calendar/raw/master/assets/image/month.jpg)

  ![Alt text](https://github.com/jiajun1203/calendar/raw/master/assets/image/monthSelect.jpg)


