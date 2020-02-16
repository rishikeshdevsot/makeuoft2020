import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import HomeScreen from "./HomeScreen";
import Dashboard from "./Dashboard";

export default class Login extends Component {
    constructor(props)
    {
        super(props);

        this.state={
            mode: 'Login'
        }

    };

    render(){
        return (
            (this.state.mode=="Login") ?

                <HomeScreen callback={()=>{
                    this.setState({mode: 'Dashboard'})
                }}/>
                :
                <Dashboard/>
            
        );
    };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2130',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
