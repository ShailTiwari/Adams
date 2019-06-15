import React, { Component } from 'react';
import { TextInput,Alert,AppRegistry,Text,Picker, View, TouchableOpacity, StyleSheet,AsyncStorage,   Linking , Animated, StatusBar,ActivityIndicator  } from 'react-native';
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
  Form
} 
from "native-base";


import styles from "./styleslist"; 
   

import Constant from '../../../Constant';
const Constants = Constant.getConstants();  

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: true,
      tab6: false,
      names:[],      
      holddata:[],      
      usernewID:'',      
      newCompanyId:'',      
      visibleModal: null,
      operatordata:[],
      machinedata:[],      
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
               this.getHoldJobssearch(this.state.usernewID); 
               
             });
       });

         });
       });
  
    
    }











 getHoldJobssearch(userid) 
  {  
    this.setState({names:[]})
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

fetch(Constants.service_url+'Production/getHoldJobs', {
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

                    this.setState({ names: ticketList.data });
                   }


                  else
                    {
                       
                   alert('No Hold Job for this user');
                    }
            
         }).catch((error) => 
            { 
                   this.setState({ spinner:false }); 
                alert('problem while adding Hold Job');
            })
        .done();   
  };










changeholdstatus(value) 
 {
    this.setState({ setmachineid:''});
    this.setState({ myprocessid:''});

  if (value!='') 
   {
    var str = value
    var res = str.split("|");
    var PlanID =res[0];
    var MachineNo =res[1];
    var DocId =res[2];
    var PrID =res[3];

    this.setState({ holdPlanID: PlanID });
    this.setState({ holdMachineNo: MachineNo });
    this.setState({ holdDocId: DocId });
    this.setState({ holdPrID: PrID });
     
     if (PrID!='' && MachineNo!='' && MachineNo!='undefined' )
   {
    var details = {
    'PrID':PrID,
    'MachineID':MachineNo
    };

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/checkExistProductioninmachine',{
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
                    this.setState({ hidden: true });
                    this.setState({ visibleModal: 1 });
                  //  alert("This Machine Already Have Running Job")
                     }                   

                  else
                    {                      
                      this.setholdstatus();
                      this.setState({ hidden: false }); 
                     } 

         }).catch((error) => {
                alert('problem while adding data Exis machine');
            })
        .done();   
      }

    }
  }












 setholdstatus() 
 {


  if (this.state.holdPlanID !='')
     {
     // alert(this.state.docid);

    var details = 
    {
    'PlanID': this.state.holdPlanID,
    'MachineNo': this.state.holdMachineNo,
    'DocId': this.state.holdDocId,
    'PrID': this.state.holdPrID,
    'Status':'2'
     };



var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}

formBody = formBody.join("&");


fetch(Constants.service_url+'Production/updateHoldStatus', {
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
                    
            this.setState({ holddata: ticketList.data });
                  // alert('Job Unhold success');
                   this.getHoldJobssearch();   
                   }


                  else
                    {
                      
                       alert('Job Unhold Failed');
                    }

         }).catch((error) => {
                alert('problem while adding data');
            })
        .done(); 

     }
  

 }





 set_machine() 
 {
this.setState({ visibleModal: null });

    var details = {      
    'SupervisiorID':this.state.usernewID,
    'CompanyID':this.state.newCompanyId
     };


var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getOperator', {
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
                    this.setState({ operatordata: ticketList.data });
                    this.setState({ visibleModal: 2 });
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



 }








  operatorchange(value) 
 {  
   if (value!='') 
   {
    var str = value
    var res = str.split("|");
    var OpID =res[0];
    var OPname =res[1];


    this.setState({ operatorid: value });
    this.setState({ myoperatorid: OpID });
    this.setState({ myoperatorname: OPname });
    this.setState({ machinedata:[] });
    this.setState({ processdata:[] });

    var details = 
    {
    'OperatorID':OpID
     };

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
     }
      

      formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getMachine', {
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
                    this.setState({ machinedata: ticketList.data });
                   }


                  else
                    {
                       alert('No Machine Allocated for this Operator');
                    }


         }).catch((error) => {
                alert('Database error in machine Fatching start');
            })
        .done(); 

     }
  }









 machinechange(valuee) 
 {  
    this.setState({ setmachineid:''});
    this.setState({ myprocessid:''});





   if (valuee!='') 
   {
    var mystr = valuee
    var res = mystr.split("|");
    var RecId =res[0];
    var myPrID =res[1];
    var BasePruniqueID =res[2];
    var machinename =res[3];

    this.setState({ mymachineid: mystr });
    this.setState({ setmachineid: RecId });
    this.setState({ myprocessid:myPrID });
    this.setState({ BasePruniqueID: BasePruniqueID });
    this.setState({ mymachinename: machinename });
     
     if (myPrID!='' && RecId!='' && RecId!='undefined' )
   {
    var details = {
    'PrID':myPrID,
    'MachineID':RecId
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/checkExistProductioninmachine',{
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
                    alert("This Machine Already have running Job")
                   }                   

                  else
                    {                      
                      
                      //this.setState({ hidden: false }); 
                      this.setoperatorholdmachine();
                    } 

         }).catch((error) => {
                alert('problem while adding data fetchJTimeDetailID');
            })
        .done();   
      }

    }
  }







 setoperatorholdmachine() 
 {


  if (this.state.holdPlanID !='')
     {
     // alert(this.state.docid);

    var details = 
    {
    'PlanID': this.state.holdPlanID,
    'MachineNo': this.state.holdMachineNo,
    'DocId': this.state.holdDocId,
    'PrID': this.state.holdPrID,
    'Status':'2'
     };



var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}

formBody = formBody.join("&");


fetch(Constants.service_url+'Production/updateHoldStatus', {
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
                    
            this.setState({ holddata: ticketList.data });
                  // alert('Job Unhold success');
                   this.getHoldJobssearch();   
                   }


                  else
                    {
                      
                       alert('Job Unhold Failed');
                    }

         }).catch((error) => {
                alert('problem while adding data');
            })
        .done(); 

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

/*
alert(loginid);
alert(myprocessID);
alert(activityid);
alert(myPlanID);
alert(mymachineID);
alert(mydocID);
alert(logincompanyid);
alert(myJTimeDetailID);
alert(myOperatorID);
*/





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









  static navigationOptions = {
    title: 'Welcome',
     header: null,
  };




   render() 
   {
    

      return (
         <Container style={styles.container}>
        <Header>
         <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          
          <Body>
            <Title>Hold Jobs</Title>
          </Body>
          <Right />
        </Header>
         <Content>
          <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={mystyles.spinnerTextStyle}
            />



          <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 1} >
                  <View style={mystyles.modalContent}>
                     <Text>This Machine Already have Running Job</Text>
                      <Text>Are you want to change Machine</Text>
                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>


                              <Button style={mystyles.button} rounded large success onPress={() => this.set_machine()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>




        <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 2} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>

           

              <View  style={mystyles.selectbox} >
              <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Operator"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}
              selectedValue={this.state.operatorid}
              onValueChange={this.operatorchange.bind(this)}
              >           
              <Picker.Item  color="#666666" label="Select operator name" value='' /> 

               {
               this.state.operatordata.map((item, index) => (
               <Picker.Item  color="#666666" label={item.UserName} value={item.UserId+'|'+item.UserName}  />
                 ))
              }
              </Picker>   
            </View>






             <View  style={mystyles.selectbox} >
              <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Machine"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.mymachineid}
              onValueChange={this.machinechange.bind(this)}
              >           
              <Picker.Item  color="#666666" label="Select Machine name" value='' /> 
               {
               this.state.machinedata.map((item, index) => (
               <Picker.Item  color="#666666" label={item.MachineName} value={item.RecId+'|'+item.PrID+'|'+item.BasePruniqueID+'|'+item.MachineName} />
                ))
              }
              </Picker>   
            </View>





                    
                    <View style={{flexDirection: "row"}} >
                      <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                        <Text>No</Text>
                      </Button>
                      

                      <Button style={mystyles.button} rounded large success >
                          <Text>Yes</Text>
                      </Button>
                    </View>

                   </View>
                </Modal>
            </View>






         <View   style = {mystyles.container} >
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {mystyles.row}
                      >

               <View style={mystyles.row_cell_timeplace}>
                 <Text style={mystyles.row_time}>{item.DocId}</Text>
                 <Text style={mystyles.row_place}>{item.JobName}</Text>
                 <Text style={mystyles.row_place}>{item.MachineName}</Text>
                 <Text style={mystyles.row_place}>{item.PrName}</Text>
               </View>
                  <Button iconLeft danger style={styles.mb15}
                 onPress={() => this.changeholdstatus(item.PlanID+'|'+item.MachineNo+'|'+item.DocId+'|'+item.PrID)} >
                  <Icon active name="warning" /><Text> Unhold Jobs</Text>
                  </Button>


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
              <Text>Add</Text>
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
      paddingLeft: 2,
      paddingRight: 2,
      marginLeft: 2,
      marginRight: 2,
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
    row_cell_timeplace2: {
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
});