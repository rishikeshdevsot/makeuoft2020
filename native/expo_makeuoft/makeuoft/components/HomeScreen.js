import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';

export default class HomeScreen extends Component {
    constructor(props)
    {
        super(props);

        /***
         * 0 : House id not submitted
         * 1 : House id found
         * 2 : Password Valid
         * 3 : Relocate to Home Screen
         */
        this.state = {
            screen: 'Login',
            loginState: '0',
            inputHouseID: 'Enter a Home ID',
            inputHousePassword: 'Enter password',
            // validHouseID: "Nahian_Home_1",
            validHouseID: "",
            validHousePassword: ""
        }

        this.validateHouseID = this.validateHouseID.bind(this);
    };

    validateHouseID()
    {
        console.log(this.state.inputHouseID);
        if(this.state.inputHouseID == this.state.validHouseID){this.setState({loginState: 1})}

    };

    validateHousePassword()
    {
        console.log(this.state.inputHousePassword);
        if(this.state.inputHousePassword == this.state.validHousePassword){
            this.setState({loginState: 2})
            this.props.callback()
        }
    };

    render(){
        return (
            this.state.loginState!=2 ? this.renderLogin()
            : this.state.loginState==2 && this.renderGoToDashboard()
        );
    };

    renderGoToDashboard()
    {
        return(
            <View style={styles.container}>
                <Text style={{top: -200, fontSize:40, color:'#61DAFB' }}>
                    Home Analyzer
                </Text>

                <Text style={{top: -100, fontSize:20, color:'#61DAFB' }}>
                    Login successful!
                </Text>
            </View>
        );
    }

    renderLogin()
    {
        return(
            <View style={styles.container}>
                <Text style={{top: -200, fontSize:40, color:'#61DAFB' , marginBottom:200}}>
                    Home Analyzer
                </Text>

                <View style={{top:230, position:'absolute'}}>
                    <Text style={{top: 0, fontSize:15, color:'#61DAFB', left: 0, marginBottom:5 }}>
                        Search for house id:
                    </Text>
                    <TextInput
                        style={{ 
                            height: 50, 
                            borderColor: '#61DAFB',
                            color:'white', 
                            borderWidth: 1, 
                            borderRadius: 10, 
                            padding: 5, 
                            width: 250  ,
                        }}
                        onChangeText={houseID => {this.setState({inputHouseID: houseID})}}
                        onFocus={()=>{this.setState({inputHouseID: ''})}}
                        value={this.state.inputHouseID}
                    />
                    <TouchableOpacity 
                        style={{ height: 40, borderWidth: 1, left:50, borderRadius: 20, backgroundColor:'#61DAFB', padding: 5, width: 150, marginTop:5}}
                        onPress={()=> this.validateHouseID()}
                    >
                        <Text style={{fontSize:15, color:'white', textAlign:"center", top: 5 }}>
                            Submit House ID
                        </Text>
                    </TouchableOpacity> 
                </View>
                {(this.state.loginState==1) && this.renderPasswordInput()}
            </View>
        );
    }

    renderPasswordInput()
    {
        return (
            <View style={{top:370, position:'absolute', }}>
                <Text style={{top: 0, fontSize:15, color:'#61DAFB', left: 0, marginBottom:5 }}>
                    Enter password for {this.state.validHouseID}
                </Text>
                <TextInput
                    style={{ 
                        height: 50, 
                        borderColor: '#61DAFB',
                        color:'white', 
                        borderWidth: 1, 
                        borderRadius: 10, 
                        padding: 5, 
                        width: 250  ,
                    }}
                    onChangeText={houseID => {this.setState({inputHousePassword: houseID})}}
                    onFocus={()=>{this.setState({inputHousePassword: ''})}}
                    value={this.state.inputHousePassword}
                />
                <TouchableOpacity 
                    style={{ height: 40, borderWidth: 1, left:50, borderRadius: 20, backgroundColor:'#61DAFB', padding: 5, width: 150, marginTop:5}}
                    onPress={()=> this.validateHousePassword()}
                >
                    <Text style={{fontSize:15, color:'white', textAlign:"center", top: 5 }}>
                        Submit Password
                    </Text>
                </TouchableOpacity> 
            </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2130',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
