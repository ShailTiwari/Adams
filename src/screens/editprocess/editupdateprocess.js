import React, { Component } from 'react';
import { TextInput,Alert,AppRegistry,Text,Picker,Image,FlatList, ScrollView, View, TouchableOpacity, StyleSheet,AsyncStorage,   Linking , Animated, StatusBar  } from 'react-native';
import { createAppContainer,createStackNavigator } from 'react-navigation';
import Storage from 'react-native-data-storage';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
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
  constructor(props) 
  {
    super(props);
    this.state = {

      InterName : props.navigation.state.params.InterName,
      StartDate : props.navigation.state.params.StartDate,
      EndDateTime : props.navigation.state.params.EndDateTime,
      impressions : props.navigation.state.params.impressions,
      Wastage: props.navigation.state.params.Wastage,
      ActivityId : props.navigation.state.params.ActivityId,      
      AutoInc: props.navigation.state.params.AutoInc,

      JobName: 'Job Name: ', 
      jobno: 'Job No: ',
      tab1: false,
      tab2: false,
      tab3: true,
      tab4: false,
      tab5: false,
      tab6: false,
      toggle: false ,      
      active: null,
      fpid_json:'',
      JobName_josn:'',
      names: [ ],
      data: [],
      activitydata: [],
      existactivitydata: [],
      jobdata: [],
      visibleModal: null,
      otherremark: '0',
      otherend: '0',
      otherhold: '0',
      checkbox4: false,
      hidden: true,
      chosenDate: new Date(),
      spinner: false, // will be true when ajax request is running
    };

    
  }




componentWillMount() 
  {   
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      startdatetime:
        date + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec,
    });

    that.setState({
      mystartdatetime:
        date + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec,
    });



that.setState({
    myenddatetime:
        date + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec,
    });


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
        ()=>{ });
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





getupdateProduction = async () => 
{

    this.setState({ spinner:true }); 
    var details = {
    'AutoInc':this.state.AutoInc,
    'ActivityID':this.state.ActivityID
};
/*alert(this.state.JTimeDetailID);*/
var formBody = [];
 for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/updateProduction',{
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
                   }
                    

                  else
                    {                     
                       
                    this.setState({ spinner:false });
                    alert('No update');
                    }


         }).catch((error) => {
                Alert.alert('Database problem while adding  Activity data');
            })
        .done();   
  };








update_output(value) 
{
     this.setState({ spinner:true }); 
    var activityid =this.state.ActivityId;
    var StartDate  = this.state.StartDate;
    var enddatetime  = this.state.EndDateTime;
    var impressions =this.state.impressions;
    var Wastage =this.state.Wastage;
    var AutoInc =this.state.AutoInc;
    var newCompanyId =this.state.newCompanyId;
    var loginid =this.state.usernewID;   

    var details = {
    'activityid':activityid,
    'StartDate':StartDate,
    'enddatetime':enddatetime,
    'impressions':impressions,
    'Wastage':Wastage,
    'AutoInc':AutoInc,
    'CompanyId':newCompanyId,
    'loginid':loginid
     };
    var formBody = [];
    for (var property in details) 
    {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

  fetch(Constants.service_url+'Production/updateoutput',{
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
                    this.setState({ spinner:false }); 
                
                 if (ticketList.code =='200')
                   {                   
                    alert('Update Success');
                    //this.getupdateProduction();
                    this.props.navigation.navigate('Dashboard');
                   }


                  else
                    {
                        alert('update Fail try again');
                    }
            
         }).catch((error) => 
            {
                this.setState({ spinner:false }); 
                alert('problem while adding data');
            })
        .done();     

       }


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
            <Title>Update Output</Title>
          </Body>
          <Right />
        </Header>
         
        <Content padder>
          <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={mystyles.spinnerTextStyle}
            />


             <View   style = {mystyles.container} >
                    <TouchableOpacity
                       style = {mystyles.row}  >

                       <Content>
                            <Form>
                             <Button block info>
                              <Text>{this.state.InterName}</Text>
                             </Button>
                              <Item fixedLabel>
                                <Label>Start</Label>
                                <DatePicker
                                 style={{width: 200}}
                                  date={this.state.StartDate}
                                  mode="datetime"
                                  placeholder="Select Date Time"
                                  format="DD-MM-YYYY h:mm:ss"
                                  maxDate={this.state.mystartdatetime}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  customStyles={{
                                    dateIcon: {
                                      position: 'absolute',
                                      left: 0,
                                      top: 4,
                                      marginLeft: 0
                                    },
                                    dateInput:
                                     {
                                      marginLeft: 36,
                                      borderWidth: 0
                                    }
                                  }}
                                  onDateChange={(date) => {this.setState({StartDate: date})}}
                                />
                              </Item>
                              <Item fixedLabel last>
                                <Label>End</Label>
                                <DatePicker
                                 style={{width: 200}}
                                  date={this.state.EndDateTime}
                                  mode="datetime"
                                  placeholder="Select Date Time"
                                  format="DD-MM-YYYY h:mm:ss"
                                  maxDate={this.state.mystartdatetime}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  customStyles={{
                                    dateIcon: {
                                      position: 'absolute',
                                      left: 0,
                                      top: 4,
                                      marginLeft: 0
                                    },
                                    dateInput:
                                     {
                                      marginLeft: 36,
                                      borderWidth: 0
                                    }
                                  }}
                                  onDateChange={(date) => {this.setState({EndDateTime: date})}}
                                />

                              </Item>


                        <Choose>                    
                           <When condition={(this.state.ActivityId=='00002' ||  this.state.ActivityId=='00003')}> 
                              <Item fixedLabel last>
                                <Label>Output</Label>
                                <TextInput style={styles.inputs}
                                  placeholder="Output"
                                  value={this.state.impressions}
                                  keyboardType="number"
                                  underlineColorAndroid='transparent'
                                  onChangeText={ TextInputValue =>
                                  this.setState({impressions : TextInputValue }) }/>
                              </Item>

                              <Item fixedLabel last>
                                <Label>Wastage</Label>
                                 <TextInput style={styles.inputs}
                                    placeholder="Wastage"                                  
                                    keyboardType="number"
                                    underlineColorAndroid='transparent'
                                    value={this.state.Wastage}
                                    onChangeText={ TextInputValue =>
                                   this.setState({Wastage: TextInputValue }) }/>
                              </Item>
                           </When>

                           <Otherwise>
                         </Otherwise>
                        </Choose>

                            </Form>
                            <Button block success  onPress={this.update_output.bind(this)}>
                              <Text>Update</Text>
                            </Button>

                          </Content>
                    </TouchableOpacity>
                           
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
  
  addToCarContainer:{
    marginHorizontal:30
  }
});