import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  Picker,
  ImageBackground,
  Dimensions,
  AsyncStorage
} from 'react-native';


import { createStackNavigator, createAppContainer, NavigationActions } from 'react-navigation';
import Storage from 'react-native-data-storage';
import Spinner from 'react-native-loading-spinner-overlay';


import Constant from '../../../Constant';
const Constants = Constant.getConstants();



const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require("../../../assets/bg-signup.png");

export default class Login extends Component {

static navigationOptions = {
    title: 'Welcome',
     header: null,
  };





  constructor(props) 
  {
    super(props);
     this.state = 
     {  
      activitydata: [],
      data: [],
      username   : '',
      password: '',
      company: '',
      spinner: false, // will be true when ajax request is running
    }
  }




 onCountryChange(value: string) 
 {   
    this.setState({
      company: value,
   
    });
  }






componentWillMount() 
   {
    this.fetchcompanyData();  
    this.getData();  
   }


checklogindata() 
   {

    AsyncStorage.getItem('myloginid', (err, result) => {
      this.setState({
        usernewID: result
      });
    
    });

     
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


        if(this.state.usernewID == null || this.state.usernewID == '' ||  this.state.usernewID == 'undefine')
             {              
              
             }

            else
            {
              this.props.navigation.navigate('Dashboard');
            }
        }


 fetchcompanyData() 
  {

    this.setState({ spinner:true });
    var details = {
    'CompanyID':'00001'
     };

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}

formBody = formBody.join("&");

  fetch(Constants.service_url+'Production/getCompany', {
  method: 'POST',
  headers: {
   'x-api-key': 'MYSECRETRENUKAAPIKEY',
   'Accept': 'application/json',
   'Content-Type': 'application/x-www-form-urlencoded'
 },
 body: formBody
 }) 
 .then((response) => response.json())
        .then((responseData) => {
                 var ticketList = responseData;
                
                 if (ticketList.code =='200')
                   {
                    this.setState({ spinner:false });
                    this.setState({ data: ticketList.data });
                   }


                  else
                    {  this.setState({ spinner:false });
                       alert('Company Not Found');
                    }
            
         }).catch((error) => 
            {
                this.setState({ spinner:false });
                alert('Database Connection Error');
            })
        .done();   
  };








  Login = async () => 
  {
     this.setState({ spinner:true });
    var details = {
    'username': this.state.username,
    'password': this.state.password,
    'companyselect':this.state.company
  };

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/Login_Admin', {
  method: 'POST',
  headers: {
   'x-api-key': 'MYSECRETRENUKAAPIKEY',
   'Accept': 'application/json',
   'Content-Type': 'application/x-www-form-urlencoded'
 },
 body: formBody
 }) 
 .then((response) => response.json())
        .then((responseData) => {
            console.log("Response:",responseData);
                 var ticketList = responseData;
                
                 if (ticketList.code =='200')
                   {
                    this.setState({ spinner:false });

                    var loginpostid = ticketList.data[0].PersonPost;
                    var userid = ticketList.data[0].UserId;
                    var logincompanyid = ticketList.data[0].ICompanyID
                    this.setState({ activitydata: userid });

                    AsyncStorage.setItem('mypost', loginpostid);
                    AsyncStorage.setItem('CompanyId', logincompanyid);
                    AsyncStorage.setItem('myloginid', userid);
                    AsyncStorage.setItem('UserId',userid, () => 
                     { 
                       this.props.navigation.navigate('Dashboard');
                     });
                    
                   }

                  else
                    { this.setState({ spinner:false });
                       alert('Userid or Password not match');
                    }
            
         }).catch((error) => 
            {
               this.setState({ spinner:false });
               alert('Database Connection Problem');
            })
        .done();   
  };




  render() {
    return (
      <View style={styles.container}>
       <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
            />


          
       <View style={styles.inputContainer}>
         <Picker
                    mode="dropdown"
                     style={styles.inputs}
                    placeholder="Select Company"
                    placeholderStyle={{ color: 'red',fontSize:17 }}                    
                    selectedValue={this.state.company}
                    onValueChange={this.onCountryChange.bind(this)}
                    onPress={this.onCountryChange.bind(this)}
                  > 
                   <Picker.Item  color="#666666" label="Select Company" value="00000"  />
                  
         {
               this.state.data.map((item, index) => (
               <Picker.Item  color="#666666" label={item.CompanyName} value={item.ICompanyID}  />
                 ))
              } 
        </Picker>
</View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="User ID"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({username : TextInputValue }) }/>
        </View>

        


        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
           this.setState({password: TextInputValue }) }/>
        </View>


        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={this.Login.bind(this)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>


      </View>

    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  spinnerTextStyle:  {
    color: '#FFF'
       },
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#320ab5',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:4,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    width:300,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText:{
    color:"white",
    fontWeight:'bold'
  }
}); 