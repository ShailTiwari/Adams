import React, { Component } from 'react';
import { Platform,TextInput,Alert,AppRegistry,Text,Picker, View, TouchableOpacity, StyleSheet,AsyncStorage,   Linking , Animated, StatusBar  } from 'react-native';
import { createAppContainer,createStackNavigator } from 'react-navigation';
import Storage from 'react-native-data-storage';
import Modal from 'react-native-modal';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Separator,  
  Footer,
  FooterTab,
} from "native-base";


import Spinner from 'react-native-loading-spinner-overlay';
import styles from "./styleslist";  
import Constant from '../../../Constant';
const Constants = Constant.getConstants();  



class List extends Component 
{

  constructor(props) {
    super(props);
    this.state = 
    {
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
      tab6: true,
      toggle: false ,      
      active: null,
      fpid_json:'',
      JobName_josn:'',
      names: [ ],
      data: [],      
      spinner: false, // will be true when ajax request is running
    };
  }






componentWillMount() 
  {   
    
  AsyncStorage.getItem('UserId', (err, result) => {     
      this.setState({ usernewID
        : result },
        ()=>{

 AsyncStorage.getItem('CompanyId', (err, result) => {     
      this.setState({ newCompanyId: result },
        ()=>{
               this.fetchuserinfoData(this.state.usernewID); 
               this.getData(this.state.usernewID);
               
             });
       });

         });
       });
  



  setTimeout(function () 
    {       
    this.fetchuserinfoData(this.state.usernewID); 
      
    }.bind(this), 3000
    );  
    
    }



 getData = (userid) =>
        {        
      
         if(this.state.usernewID == null || this.state.usernewID == '' ||  this.state.usernewID == 'undefine')
            {              
              this.props.navigation.navigate('Login')
             }
        }






Logout =  async () => {
  try 
  {

     AsyncStorage.removeItem('UserId', (err, result) => {
      
               this.props.navigation.navigate('Login');
    
    });
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
}


 fetchuserinfoData(userid) 
    { 
     this.setState({ spinner:true }); 
    var details = {
    'myuserid':this.state.usernewID
     };

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
fetch(Constants.service_url+'Production/Login_info',{
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
                    this.setState({ data: ticketList.data });
                   }


                  else
                    {  this.setState({ spinner:false });
                       alert('No Info Found');
                    }
            
         }).catch((error) => 
            {   this.setState({ spinner:false });
                alert('Database Connection Problem');
            })
        .done();  
  };






  static navigationOptions = {
    title: 'Welcome',
     header: null,
  };



   render() {
      return (
         <Container style={styles.container}>        


        <Header>
         <Left>
           <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>          
          <Body>
             <Title>My Account</Title>
          </Body>
          <Right />
        </Header>
         <Content>
         <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={mystyles.spinnerTextStyle}
            />



           <View>
            {
               this.state.data.map((item, index) => (
                  <View
                     key = {item.id} >

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Name</Text>
            </Body>
            <Right>
              <Text>{item.UserName}</Text>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
               <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Post</Text>
            </Body>
            <Right>
              <Text>{item.PersonPost}</Text>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>


          <ListItem icon last>
            <Left>
              <Button style={{ backgroundColor: "#4CDA64" }}>
                <Icon active name="link" />
              </Button>
            </Left>
            <Body>
              <Text>Online</Text>
            </Body>
            <Right>
              <Text>Yes</Text>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
           </View>
           ))
            }
         </View>





          <Separator bordered />

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FD3C2D" }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Notifications</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#8F8E93" }}>
                <Icon active name="switch" />
              </Button>
            </Left>
            <Body>
              <Text>Control Center</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
          <ListItem icon last>
            <Left>
              <Button style={{ backgroundColor: "#5855D6" }}>
                <Icon active name="moon" />
              </Button>
            </Left>
            <Body>
              <Text>Software</Text>
            </Body>
            <Right>
              <Text>Smart Adams 1.1</Text>
            </Right>
          </ListItem>
          <Separator bordered />


          <ListItem last icon
          onPress={this.Logout.bind(this)}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="hand" />
              </Button>
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
        </Content>
           <Footer>
          <FooterTab>
            <Button active={this.state.tab1} onPress={() =>this.props.navigation.navigate('Dashboard')}
            >
              <Icon active={this.state.tab1} name="home" />
              <Text>Home</Text>
            </Button>




            <Button active={this.state.tab2} onPress={() =>this.props.navigation.navigate('Addprocess')}>
              <Icon active={this.state.tab2} name="paper" />
              <Text>New</Text>
            </Button>




            <Button active={this.state.tab3} onPress={() =>this.props.navigation.navigate('Editprocess')}>
              <Icon active={this.state.tab3} name="repeat" />
              <Text>Edit</Text>
            </Button>




            <Button active={this.state.tab4} onPress={() =>this.props.navigation.navigate('Offlineprocess')}>
              <Icon active={this.state.tab4} name="lock" />
              <Text>Offline</Text>
            </Button>




            <Button active={this.state.tab5} onPress={() =>this.props.navigation.navigate('Holdprocess')}>
              <Icon active={this.state.tab5} name="radio-button-off" />
              <Text>Hold</Text>
            </Button>



            
            <Button active={this.state.tab6} onPress={() =>this.props.navigation.navigate('Account')}>
              <Icon active={this.state.tab6} name="notifications" />
              <Text>Account</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      )
   }
}
export default List

const mystyles = StyleSheet.create ({
  spinnerTextStyle:  {
    color: '#FFF'
       },

   container: {
      marginTop: 14,
      alignSelf: "stretch",

    },
    row: {
      
      padding: 15,
      backgroundColor: '#41b627',
      color: '#FFFFFF', 
      elevation: 1,
      borderRadius: 1,
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 4,
      marginRight: 4,
      marginTop: 2,
      marginBottom: 10,
    },
    row_cell_timeplace: {
      color: '#FFFFFF', 
      flex: 1,
      flexDirection: 'column',
    },
    row_cell_temp: {
      color: '#FFFFFF', 
      paddingLeft: 16,
      flex: 0,
    },
    row_time: {
      color: '#FFFFFF', 
      textAlignVertical: 'bottom',
      includeFontPadding: false,
      flex: 0,
    },
    row_place: {
      color: '#FFFFFF', 
      textAlignVertical: 'top',
      includeFontPadding: false,
      flex: 0,
    },

   text: {
      color: '#4f603c',
   }

})
