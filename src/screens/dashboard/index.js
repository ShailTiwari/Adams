import React, { Component } from 'react';
import { TextInput,Alert,AppRegistry,Text,Picker, View, TouchableOpacity, StyleSheet,AsyncStorage,   Linking , Animated, StatusBar  } from 'react-native';
import { createAppContainer,createStackNavigator } from 'react-navigation';
import Storage from 'react-native-data-storage';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';

import
 {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Footer,
  FooterTab,
  Body,
  Left,
  Right,
  Icon,
  Form,   
  Badge, 
  ListItem,
  CheckBox
} 


from "native-base";
import styles from "./styleslist";  
import Constant from '../../../Constant';
const Constants = Constant.getConstants();  





class List extends Component 
{

  constructor(props) {
    super(props);
    this.state = 
    {
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
      tab6: false,
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

        AsyncStorage.getItem('mypost', (err, result) => {
      this.setState({
        usernewpost: result
      },()=>{ });
    });


    AsyncStorage.getItem('UserId', (err, result) => {     
      this.setState({ usernewID
        : result },
        ()=>{

 AsyncStorage.getItem('CompanyId', (err, result) => {     
      this.setState({ newCompanyId: result },
        ()=>{
               this.fetchdashboardoperatorData(this.state.usernewID); 
               this.getData(this.state.usernewID);
               
             });
       });

         });
       });

    }





componentWillUnmount() 
  { 

        AsyncStorage.getItem('mypost', (err, result) => {
      this.setState({
        usernewpost: result
      },()=>{ });
    });


    AsyncStorage.getItem('UserId', (err, result) => {     
      this.setState({ usernewID
        : result },
        ()=>{

 AsyncStorage.getItem('CompanyId', (err, result) => {     
      this.setState({ newCompanyId: result },
        ()=>{
               this.fetchdashboardoperatorData(this.state.usernewID); 
               this.getData(this.state.usernewID);
               
             });
       });

         });
       });

    }




 getData = (userid) =>
        {        
      
         if(this.state.usernewID == null || this.state.usernewID == '' ||  this.state.usernewID == 'undefine')
            {              
              this.props.navigation.navigate('Login')
             }
        }






 fetchdashboardoperatorData(userid) 
    { 
    this.setState({ data: [] }); 
    this.setState({ spinner:true }); 
    var details = {
    'SupID':this.state.usernewID,
    'CompanyID':this.state.newCompanyId,
    'Userpost':this.state.usernewpost
     };

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
fetch(Constants.service_url+'Production/getSRunningJobs',{
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
                    {
                      this.setState({ spinner:false });
                       alert('No Running Job Please Add New');
                    }
            
         }).catch((error) => 
            {
                this.setState({ spinner:false });
                alert('Database Connection Problem');
            })
        .done();  
  };






  static navigationOptions = {
    title: 'Welcome',
     header: null,
     headerLeft: null
  };



   render() {
      return (
         <Container style={styles.container}>

         


        <Header>

         <Left>
         <Button
              hasText
              transparent
              onPress={this.fetchdashboardoperatorData.bind(this)}
            >
              <Icon name="home" />
            </Button>
          </Left>


          
          <Body>
            <Title>Running Process</Title>
          </Body>
          <Right />
        </Header>
         <Content>
          <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={mystyles.spinnerTextStyle}
            />

         <View   style = {mystyles.container} >
            {
               this.state.data.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {mystyles.row}
                      onPress={() =>this.props.navigation.navigate('Editrunningprocess', 
                      {docId:item.DocID,PlanID:item.PlanID,SeqNo:item.PSeqNo,OperatorID:item.OperatorID,PrID:item.PrID,MachineNo:item.MachineNo,JTimeDetailID:item.JTimeDetailID,
                operatorname:item.UserName,MachineName:item.MachineName,process:item.PrName,TotalQty:item.TotalQty,
            })}       >

               <View style={mystyles.row_cell_timeplace}>
                 <Text style={mystyles.row_time}>Docket No:{item.DocID}</Text>
                 <Text style={mystyles.row_place}>Machine Name:{item.MachineName}</Text>
                  <Text style={mystyles.row_place}>Operator Nmae:{item.UserName}</Text>
                  <Text style={mystyles.row_place}>Output:{item.TotalQty}</Text>

               </View>
                <Text style={mystyles.row_cell_temp}>{item.PrName}</Text>
                  </TouchableOpacity>
               ))
            }
         </View>


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
