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

    constructor(props) {
    super(props);
    this.state = {

      docID : props.navigation.state.params.docId,
      PlanID : props.navigation.state.params.PlanID,
      oldOperatorID : props.navigation.state.params.OperatorID,
      OperatorID : props.navigation.state.params.OperatorID,
      process_id: props.navigation.state.params.PrID,
      PrID : props.navigation.state.params.PrID,      
      process_name: props.navigation.state.params.process,
      job_name: props.navigation.state.params.JobName,
      MachineNo : props.navigation.state.params.MachineNo,
      JTimeDetailID: props.navigation.state.params.JTimeDetailID,

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
    enddatetime:
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
        ()=>{
              

                this.fetchjobData();
                this.fetchoperatorData();
                this.getExistProduction();


               
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







set_activity(value) 
{
   this.setState({ visibleModal: null })
   if (value!='') 
   
   {
    var activityid = this.state.ActivityInterID;
    var sAHead  = this.state.ActivityAHead;
    var myactivity_name =this.state.Activityname;
    var myactivity_ActivityID =this.state.ActivityActivityID;
    var myactivity_Status =this.state.ActivityStatus;
    var loginid =this.state.usernewID;
    var logincompanyid =this.state.newCompanyId;
    var mydocID =this.state.docID;
    var myprocess_id =this.state.process_id;
    var myJTimeDetailID =this.state.JTimeDetailID;    
    var myOperatorID =this.state.OperatorID;
    var myoldOperatorID =this.state.oldOperatorID;
    var myprocessID =this.state.process_id;
    var mymachineID =this.state.MachineNo;
    var myBasePruniqueID =this.state.BasePruniqueID;
    var myPlanID =this.state.PlanID;
    var myprocess_name =this.state.process_name;



    
    var details = {
    'accountid':loginid,
    'PrID':myprocessID,
    'ActivityID':activityid,
    'PlanUniqueID':myPlanID,
    'DocID':mydocID,
    'SeqNo':'0',
    'MachineID':mymachineID,
    'SuperViserID':loginid,
    'Output':'0',
    'PassNo':'0',
    'FB':'0',
    'Noofqcsamples':'0',
    'ICompanyID':logincompanyid,
    'StartendDate':'2060-01-01 01:01:01',
    'OperatorID':myOperatorID,
    'MobileSerialNo':logincompanyid,
    'Wastage':'0',
    'Remarks':'0',
    'JobFinished':'0',
    'JTimeDetailID':myJTimeDetailID,
    'JActivityId':'0'
     };



/*alert(loginid);
alert(myprocessID);
alert(activityid);
alert(myPlanID);
alert(mymachineID);
alert(mydocID);
alert(logincompanyid);
alert(myJTimeDetailID);
alert(myOperatorID);*/





  if (myactivity_Status=='2' || myactivity_Status=='1') 
  {

    var formBody = [];
    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

  fetch(Constants.service_url+'Production/startActivity',{
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
                    this.setState({ visibleModal: 20 })
                    this.getExistProduction();
                   }


                  else
                    {
                       alert('Activity start unsuccessfully');
                    }
            
         }).catch((error) => 
            {
               alert('problem while adding data');
            })
        .done(); 
      }




  else
      {

          alert("Activity not idle or done")
      
      }  
  }

}










 onoperatorChange(value: string) 
 {   
      this.setState({
      OperatorID: value,
   
    });
  }












 fetchoperatorData() 
  { 

    var details = {   
    'SupervisiorID':this.state.usernewID,
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

fetch(Constants.service_url+'Production/getOperator',{
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
                    this.setState({ data: ticketList.data });
                   }


                  else
                    {
                       alert('No Operator for this user');
                    }
            
         }).catch((error) => 
            {
               alert('problem while adding data');
            })
        .done();   
  };







 fetchjobData= async () => 
 {
    
      this.setState({ spinner:true }); 
    var details = {
    'DocID':this.state.docID
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getJob',{
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

             this.setState({ spinner:false });
            console.log("Response:",responseData);
            var ticketList = responseData;
            this.setState({"fpid_json": ticketList.data[0].FPID,"JobName_josn":ticketList.data[0].JobName})
            this.setState({ jobdata: ticketList.data });
         }).catch((error) => {

                    this.setState({ spinner:false });
                alert('problem while adding data');
            })
        .done();   
  };











getExistProduction = async () => 
{

    this.setState({ spinner:true }); 
    var details = {
    'PrID':this.state.process_id,
    'RecordID':this.state.JTimeDetailID,
    'DocID':this.state.docID,
    'PlanUniqueID':this.state.PlanID
};

/*alert(this.state.JTimeDetailID);*/

var formBody = [];
 for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getOperatorActivity',{
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
                    this.setState({ existactivitydata: ticketList.data });
                   }
                    

                  else
                    {                      
                       
                    this.setState({ spinner:false });
                    alert('No any Activity Complete ');
                    }


         }).catch((error) => {
                Alert.alert('Database problem while adding  Activity data');
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
            <Title>Edit  Process</Title>
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
            {
                <TouchableOpacity
                     style = {mystyles.docrow}>
                <View style={mystyles.row_cell_timeplace}>
                 <Text style={mystyles.row_time}>Docket No:{this.state.docID}</Text>
                 <Text style={mystyles.row_place}>Job No:{this.state.fpid_json}</Text>
                 <Text style={mystyles.row_place}>Job Name:{this.state.JobName_josn}</Text>
                 
               </View>
              </TouchableOpacity>
            }


            


         </View>
            <View  style={mystyles.selectbox} >
              <Picker
              mode="dropdown"
              disabled={ !this.state.hidden ?  true : false }
              style={mystyles.inputs}
              placeholder="Select Operator"
              placeholderStyle={{ color: '#0a205a',fontSize:17 }}
              note={false}
              selectedValue={this.state.OperatorID}
              onValueChange={this.onoperatorChange.bind(this)}
              >  
              <Picker.Item  color="#2980b9" label="Select Operator name" value='' /> 
               {
               this.state.data.map((item, index) => (
               <Picker.Item  color="#2980b9" label={item.UserName} value={item.UserId}  />
                 ))
              }
              </Picker>   
            </View>





             <View   style = {mystyles.container} >
              {
                 this.state.existactivitydata.map((item, index) => (
                    <TouchableOpacity
                       key = {item.id}
                       style = {mystyles.row}  >

                       <Content>
                            <Form>
                             <Button block info>
                              <Text>{item.InterName}</Text>
                             </Button>
                              <Item fixedLabel>
                                <Label>Start</Label>
                                <DatePicker
                                editable={ !this.state.hidden ?  true : false }
                                 style={{width: 200}}
                                  date={item.StartDate}
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
                                  onDateChange={(date) => {this.setState({startdatetime: date})}}
                                />
                              </Item>
                              <Item fixedLabel last>
                                <Label>End</Label>
                                <DatePicker
                                editable={ !this.state.hidden ?  true : false }
                                 style={{width: 200}}
                                  date={item.EndDateTime}
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

                              <Item fixedLabel last>
                                <Label>Output</Label>
                                <Input editable={ !this.state.hidden ?  true : false }>{item.impressions} </Input>
                              </Item>

                              <Item fixedLabel last>
                                <Label>Wastage</Label>
                                <Input editable={ !this.state.hidden ?  true : false }>{item.Wastage} </Input>
                              </Item>
                            </Form>
                            <Button block success  onPress={() =>this.props.navigation.navigate('Editprocessupdate', 
                      {InterName:item.InterName,StartDate:item.StartDate,EndDateTime:item.EndDateTime,impressions:item.impressions,
                        Wastage:item.Wastage,ActivityId:item.ActivityId,AutoInc:item.AutoInc,
            })}       >
                              <Text>Edit</Text>
                             </Button>

                          </Content>
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
   opcontainer: {
      marginTop: 14,
      alignSelf: "stretch",
        },  
        
    row: {     
       padding: 25,
      marginTop: 3,
      elevation: 1,
      borderRadius: 2,
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 15,
    },


     docrow: {      
       padding: 15,
      marginTop: 3,
      backgroundColor: '#df9436',
      elevation: 1,
      borderRadius: 1,
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 15,
      paddingBottom: 20,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 10,
    },





     selectbox: {      
       padding: 5,
      marginTop: 3,
      backgroundColor: '#f87925',
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
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 10,
    },



    oprow: {
      
       padding: 15,
      marginTop: 3,
      backgroundColor: '#d2f9d8',
      elevation: 1,
      borderRadius: 2,
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 6,
    },
    row_cell_timeplace: {
      flex: 1,
      flexDirection: 'column',
    },
    row_cell_temp: {
      paddingLeft: 16,
      flex: 0,
    },
    row_time: {
      textAlignVertical: 'bottom',
      includeFontPadding: false,
      flex: 0,
    },
    row_place: {
      textAlignVertical: 'top',
      includeFontPadding: false,
      flex: 0,
    },

    row_place2: {

      color: '#FFFFFF', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlignVertical: 'top',
      includeFontPadding: false,
      flex: 0,
    },

    row_cell_timeplace2: 
    {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      flex: 1,
      flexDirection: 'column',
    },


  inputContainer: {
      borderBottomColor: '#e8874b',
      backgroundColor: '#dccfc7',
      borderRadius:10,
      borderBottomWidth: 2,
      width:250,
      height:45,
      marginBottom:15,
      flexDirection: 'row',
      alignItems:'center'
  },

  inputs:{
    height:45,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },

   text: {
      color: '#4f603c',
   },
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  productImg:{
    width:200,
    height:200,
  },
  name:{
    fontSize:28,
    color:"#696969",
    fontWeight:'bold'
  },
  price:{
    marginTop:10,
    fontSize:18,
    color:"green",
    fontWeight:'bold'
  },
  description:{
    textAlign:'center',
    marginTop:10,
    color:"#696969",
  },
  star:{
    width:40,
    height:40,
  },
  btnColor: {
    height:30,
    width:30,
    borderRadius:30,
    marginHorizontal:3
  },
  btnSize: {
    height:40,
    width:40,
    borderRadius:40,
    borderColor:'#778899',
    borderWidth:1,
    marginHorizontal:3,
    backgroundColor:'white',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer:{
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentColors:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  contentSize:{ 
    justifyContent:'center', 
    marginHorizontal:30, 
    flexDirection:'row', 
    marginTop:20
  },
  separator:{
    height:2,
    backgroundColor:"#eeeeee",
    marginTop:20,
    marginHorizontal:30
  },
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  addToCarContainer:{
    marginHorizontal:30
  }
});