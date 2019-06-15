import React, { Component } from 'react';
import {TextInput,Alert,AppRegistry,Text,Picker, View, TouchableOpacity, StyleSheet,AsyncStorage,Linking,Animated,StatusBar} from 'react-native';
import {createAppContainer,createStackNavigator} from 'react-navigation';
import Storage from 'react-native-data-storage';
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
  Badge
} from "native-base";


import styles from "./styleslist";  
import Constant from '../../../Constant';
const Constants = Constant.getConstants();  

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JobName: 'Job Name: ', 
      jobno: 'Job No: ',
      tab1: false,
      tab2: true,
      tab3: false,
      tab4: false,
      tab5: false,
      tab6: false,
      names:[],
      activitydata:[],
      jobdata:[],
      operatordata:[],
      machinedata:[],
      processdata:[],
      joblistdata:[],
      setmachineid:'',
      myprocessid:'',
      docid:'',
      TotalQty:'0',
      hidden: true,      
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
               this.fetchoperatorData(this.state.usernewID); 
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














       
getData = () =>
  {
     if(this.state.usernewID == null || this.state.usernewID == '' ||  this.state.usernewID == 'undefine')
       {
        this.props.navigation.navigate('Login')
       }
  }







 fetchoperatorData() 
  {
    this.setState({ spinner:true }); 
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
                    this.setState({ spinner:false });
                    this.setState({ operatordata: ticketList.data });
                   }


                  else
                    {
                       this.setState({ spinner:false });
                       alert('No Operator for this user');
                    }
            
         }).catch((error) => 
            {   this.setState({ spinner:false });
                alert('problem while adding data');
            })
        .done();   
  };







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

    this.setState({ spinner:true }); 
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
                    this.setState({ spinner:false });
                    this.setState({ machinedata: ticketList.data });
                   }


                  else
                    {
                       this.setState({ spinner:false });
                       alert('No Machine Allocated for this Operator');
                    }


         }).catch((error) => {
                 this.setState({ spinner:false });
                alert('problem while adding data');
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

    this.setState({ spinner:true }); 
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
                    this.setState({ spinner:false }); 
                    this.setState({ hidden: true });
                    var DocID = ticketList.data[0].DocID; 
                    var PlanID = ticketList.data[0].PlanID;
                    var OperatorID = ticketList.data[0].OperatorID;
                    var PrID = ticketList.data[0].PrID;
                    var MachineNo = ticketList.data[0].MachineNo;
                    var JTimeDetailID = ticketList.data[0].JTimeDetailID;                    
       this.props.navigation.navigate('Editrunningprocess', {docId:DocID,PlanID:PlanID,OperatorID:OperatorID,PrID:PrID,MachineNo:MachineNo,JTimeDetailID:JTimeDetailID,
                operatorname:this.state.myoperatorname,MachineName:this.state.mymachinename,process:PrID,TotalQty:this.state.TotalQty,
            })
                   }                   

                  else
                    {                      
                      
                      this.setState({ spinner:false }); 
                      this.setState({ hidden: false }); 
                    } 

         }).catch((error) => {
                 this.setState({ spinner:false }); 
                alert('Connection error fetch JTimeDetail ID');
            })
        .done();   
      }

    }
  }










 showjobs() 
 {  


     if (this.state.docid !='')
     {
    this.setState({ spinner:true }); 
    var details = 
    {
    'string': this.state.docid,
    'PrID': this.state.myprocessid,
    'MachineId': this.state.setmachineid,
    'OperatorID': this.state.operatorid,
    'BasePruniqueID':this.state.BasePruniqueID
      };


  var formBody = [];
  for (var property in details)
   {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
   }

formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getJobDetail', {
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
                    this.setState({ joblistdata: ticketList.data });
                   }


                  else
                    {
                       this.setState({ spinner:false });
                       alert('No Jobs Found');
                    }

         }).catch((error) => {
                this.setState({ spinner:false });
                alert('problem while adding data show jobs');
            })
        .done(); 

     }
  }



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
            <Title>Add New Process</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>

         <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={mystyles.spinnerTextStyle}
            />


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




          



         <View  style={mystyles.oprow} >
          <View style={{flexDirection: "row"}}>
          <TextInput style={mystyles.inputs}
              editable={ !this.state.hidden ?  true : false }
              placeholder="Enter DocId Here"
              keyboardType="Doc Id"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({docid : TextInputValue }) }/>
                <Button iconLeft info style={styles.mb15}
                 onPress={this.showjobs.bind(this)}>
                 <Icon name="alert" />
                 <Text> Show Jobs</Text></Button>
        </View>
      </View>





          <View   style = {mystyles.container} >
            {
               this.state.joblistdata.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {mystyles.row}
                   >


               <View style={mystyles.row_cell_timeplace}>
                 <Text style={mystyles.row_time}>Docket No:{item.DocId}</Text>
                 <Text style={mystyles.row_place}>Job Name:{item.JobName}</Text>
                 <Text style={mystyles.row_place}>Component:{item.Component}</Text>
                 <Text style={mystyles.row_place}>Process:{item.PrName}</Text>
                 <Text style={mystyles.row_place}>Job Qty:{item.JobQty}</Text>
                 <Text style={mystyles.row_place}>Form No:{item.FormNo} Plate No:{item.PlateNo}</Text>
               </View>
                 <Button rounded danger

                  onPress={() =>this.props.navigation.navigate('Addprocessnext', 
                      {docId:item.DocId,PlanID:item.PlanUniqueID,SeqNo:item.SeqNo,OperatorID:this.state.myoperatorid,PrID:item.PrID,
                        JobName:item.JobName,process:item.PrName,MachineNo:this.state.setmachineid,
            })}        >
            <Text> Press Here </Text></Button>
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
