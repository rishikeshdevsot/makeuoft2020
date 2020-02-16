import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as firebase from "firebase";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


export default class Dashboard extends Component {
    constructor(props)
    {
        super(props);
        // Initialize Firebase

        const firebaseConfig = {
            apiKey: "AIzaSyDGzfh53GI5hepXZM6zQvTzMyLonY64n48",
            authDomain: "makeuoft2020-268400.firebaseapp.com",
            databaseURL: "https://makeuoft2020-268400.firebaseio.com",
            projectId: "makeuoft2020-268400",
            storageBucket: "makeuoft2020-268400.appspot.com",
            messagingSenderId: "547083102723",
            appId: "1:547083102723:web:25dd247a8489337ddc3c36",
            measurementId: "G-CYH6XPZMCE"
        };


        this.imgURL = "https://00e9e64bacfd37b7e07201e0ea52fd3f808a35b05f8d87de4a-apidata.googleusercontent.com/download/storage/v1/b/makeuoftimagesinput/o/output.jpg?qk=AD5uMEuMb4-viRn_zBVgkO54VXtEUc5OqNik5uSIt4JsAdz6hSGsB09zjKWBmTDKXsgNvKtpYQdmNeRgbk06DsIVgxxz9h6wt0WXLs1pXEptdZaoQuyusWfQSUZYgjleINA1XxKMKtMV6izCXe9qnV5dhr0rCnloqZKcH3TD0xmF1BRiilt99Mbd3oT3hbnHteELBP0JvxhFJWOKrNzxyY3lbe09-fILnkIwoiPqdy2Js67DbDSMofLCsAepAEbSYrNYZ_H9ans9XdKXS85gWMBkG2DFtriRCvGHbX-uDUbYTBsrBtFVuzks1QtsgdVyM6fNQ0wJvB_bt2BMwVQUtNjjR6sp5TLzCm47oJXtKQ3bh-yOtJ0jRUvq29Bbxx-3jD1-zoUwX75whdxZUlHXmMpPWosWkBvguyt9o0t1yaH--HktWf5RyG-j2T0_Lly9m5kgsURhcZflw9QUDIMXwcp9Dvo1ngD4YQPjcTOdi50I-3botvbEeG5P1mpMxTTbQiw6Ged-wKT8xPWiECgp10JF_oyKYaH-91GIYAY9Q5SPxyvHvdCmZ9gVgrshqljwiLRUJLkYd48Wq21D_ho2XWPVj7mLl2K94BxuRhrZn4mhkdfldaYnESa67RdFxlKoZm2wll5iAbP08P_Ity9rTJZC_uv0sgiKb9CjCMsMN9wPtFpXfz_ULxVOVifEr9_Wp8Z6iD2sOYBvMgyBPfOanIxcrQgTTRiTymJaWIUo4sG5602C7BfdOgsHLBUSzHSIrIJPOblHuGG70nlXNQBxX086KwvovUNhCMYZfz-BrHf3EHD4IXuvNdY";
        this.textURL = "https://00e9e64baca4950fd589fae0b8af92921fbef21d6da6b48e1c-apidata.googleusercontent.com/download/storage/v1/b/makeuoftimagesoutput/o/facesandracy.txt?qk=AD5uMEvlv9tonPxKj5rW8cbi-CZeHbHCoVMQfk0vF4j2inbNk02q09rKe3ZQ_DTZvok5G1dh79aSk1aaOQvTPjFI27jMgCDSBVnCFgn7rOUlAJDzAGxCoS5evz26BPnsKVg7_LNKlSBsDLfH7aqcrMwh9PvT942gfyuddBpD2eqoMxiugVDQrpNVi85maWDyH9CvydlYsUOxiK3tU0LWiZoZLUwodacFwLhVTAYSKNGDGqUOpRePb8oapQhXdJWc92QOCgxsVIYHDfCGWakaQ547pC-cEgCHtXYRrzKxjNV90fATx8KK6nck9nsOJTs2xqX-YCupWZfpQb4SkxDCBkPPcEkEqlJ_mfLUiCtF9eGRHrLl_R2akae7HynKVvMiSky84dOC14caf4ccXxqZe_GBeTk5qZlpQKAKXYqAHwKUVZoZCBiG8LtC2NGN_DlGkE8CgVp3se6e17IcXXQxEcVLi7jIUPc9St0QrBWBFlH-rHfkDin-GpOseKxS8PGVh_wU0vfEPDrlu3btTirUPguAvpCgHlSELWtq7C6XrUsmdCjheJsxFaCgtVXa6AQUzT_YirgRykQ13XxmzjKCGR6ftg3Ck2RIOHycRqD5CwjwS_lY1CTwUvMG6iOm0Cun3768yFYAURz7x-3vgokQ3JCxV-BQb8S27F0YRjicWGFs41KUaooC9NX5Il5hDBJr14vaMXFomm2VA4hGRDyqVwqJal2niYLtAddJH6i7uYTPy01jFmVNZ1wvX74NAcYLEvGRtF45M8H1Ii4UaVAGzIbIo_lJ4bYT-WqcsmkCRkVqvfiQ3ku1Wv0";

        this.state = {
            imgURL: this.imgURL,
            imgAnalysisURL: '',
            lastUpdateTime: new Date().toString(),
            analysisArray: [],
            showImg:true         
            
        }
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig); 
        }  
    }

    registerForPushNotifications = async () => {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        let finalStatus = status;
        if(status!=='granted')
        {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        // if still not granted, exit
        if(finalStatus !== 'granted'){ return; }
        // get push notifications
        let token = await Notifications.getExpoPushTokenAsync();
        // console.log(token)

        // Push the new token to the server
        firebase.database().ref('users/' + 'michelle1').set({
            exponentPushToken: token
        });
    };
    _handleNotification = notification => {
        // do whatever you want to do with the notification
        console.log( notification );
    };

    render(){
        return (
          <View style={styles.container}>
            <Text style={{top: -180, fontSize:20, color:'#61DAFB', left: -110, marginBottom:20 }}>
                Live Image Feed:
            </Text>
            
            { this.state.showImg &&
                this.getImg()
            }

            <View style={{left:0, top: 100}}>
                <Text style={{color:'white'}}>
                    {this.state.analysisArray}
                </Text>
            </View>

          </View>
        );
    }

    renderDataArray()
    {
        var rows = [];
        this.state.analysisArray.forEach((i)=>{
            // console.log(i)
            const key = i.split(':')[0]
            const value = i.split(':')[1]
            // console.log('key: ', key)
            // console.log('value: ', value)
            rows.push(
                <Text key={key} style={{color:'white'}}>
                    {key} : {value}
                </Text>
            );
        });
        // console.log(rows)
        return(rows)
    }

    getImg()
    {
        return(
            <Image
                style={{width: 350 , height: 250, position:'absolute', top:120 }}
                source={{uri: this.state.imgURL}}
            /> 
        );
    }

    componentDidMount()
    {
        let _this = this;
        this._notificationSubscription = Notifications.addListener(this._handleNotification);

        function success() {
            _this.setState({
                analysisArray: this.responseText,
            })
        }

        function error(err) {
            console.log('Error Occurred :', err);
        }


        firebase.database().ref('users' ).on('value', (snapshot) => {

            var xhr = new XMLHttpRequest();
            xhr.onload = success;
            xhr.onerror = error;
            xhr.open('GET', this.textURL);
            xhr.send();

            const vals =snapshot.val()['01']
            const data = Object.values(vals)[0]["data"]
            // console.log('hi')
            this.setState({
                showImg: !this.state.showImg,
                imgURL : this.imgURL
            })
        })

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
