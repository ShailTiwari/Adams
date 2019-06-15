import React, { Component } from "react";
import { Platform,Alert,ImageBackground, View,StyleSheet,   Dimensions, StatusBar,AsyncStorage,NetInfo } from "react-native";
import { Container, Button, H3, Text } from "native-base";

import { createStackNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import styles from "./styles";
const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");

  /*import { NavigationActions } from 'react-navigation';*/  
const { width, height } = Dimensions.get("window");
import Constant from '../../../Constant';
const Constants = Constant.getConstants();
console.disableYellowBox = true;



export default class Home extends  React.Component {
  static navigationOptions = {
    title: 'Welcome',
     header: null,
  };


constructor(props) {
  super(props)
  this.state = { 
    user_id : '' ,
    name : '' ,
    connection_Status : "",
  }
}






 componentDidMount() {

    NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange

    );
   
    NetInfo.isConnected.fetch().done((isConnected) => {

      if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }

    });
  }
  

  componentWillUnmount()
   {

    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange

    );

  }

  _handleConnectivityChange = (isConnected) => {

    if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
        this.checklogindata();
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
  };





checklogindata() 
   {
     
  AsyncStorage.getItem('myloginid', (err, result) => {
      this.setState({
        usernewID: result
      });
    
    });



     AsyncStorage.getItem('CompanyId', (err, result) => {
      this.setState({
        newCompanyId: result
      },()=>{ });
    });



  
  

}



       

        getData = () =>
        {  


        if(this.state.connection_Status  == 'Online')
             {       
      
         if(this.state.usernewID == null || this.state.usernewID == '' ||  this.state.usernewID == 'undefine')
             {              
              this.props.navigation.navigate('Login')
             }

            else
            {
              this.props.navigation.navigate('Dashboard')
            }}

            else
            {
                 alert("You are Offline")
            }
        }





 render() 
  {
     setTimeout(() => {
      this.getData();
    }, 100);
    return (
      <Container style={mystyles.container}>
       
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
          </View>


          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >

           <Text style={{Color:'red' ,fontSize: 20, textAlign: 'center', marginBottom: 20}}> You are { this.state.connection_Status } </Text>
           
            <H3 style={styles.text}>Renuka Adams</H3>
            <View style={{ marginTop: 8 }} />
            
            <H3 style={styles.text}> Live Production  Entry</H3>

            <View style={{ marginTop: 8 }} />
          </View>


          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={this.getData.bind(this)}
            >
              <Text>Lets Go!</Text>
            </Button>
          </View>



      </Container>
    );
  }
}


const mystyles = StyleSheet.create({
  container: {
    backgroundColor: '#320ab5',
  }
}); 