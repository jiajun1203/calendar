import React, {PureComponent, Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PanResponder,
} from 'react-native';
var left = 100;
var top = 100;
export default class TextView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            redViewBgColor: 'red',
            left : 100,
            top : 100,
        }
    }

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder:  (evt, gestureState) => {
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this._highlight();
            },
            onPanResponderMove: (evt, gestureState) => {
                this.setState({top:gestureState.moveY,left:gestureState.moveX});
                console.log(gestureState);
            },
            onPanResponderRelease: (evt, gestureState) => {
                this._unhighlight();
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
        });
    }

    _unhighlight(){
        this.setState({redViewBgColor: 'red'})
    }

    _highlight(){
        this.setState({redViewBgColor: 'blue'})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.redView,{marginTop:this.state.top - 50,marginLeft:this.state.left - 50,
                    backgroundColor: this.state.redViewBgColor}]}
                      {...this._panResponder.panHandlers}
                ></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    redView: {
        width: 100,
        height: 100,
    },

});