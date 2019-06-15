import React, { Component } from 'react';
import { TextInput,Alert,AppRegistry,Text,Picker, View, TouchableOpacity, StyleSheet,AsyncStorage,   Linking , Animated, StatusBar  } from 'react-native';
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
      JTimeDetailID:'0',
     
      /*JTimeDetailID : props.navigation.state.params.JTimeDetailID,      
      operator_name: props.navigation.state.params.operatorname,
      MachineName: props.navigation.state.params.MachineName,
      process_name: props.navigation.state.params.process,*/

      JobName: 'Job Name: ', 
      jobno: 'Job No: ',
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: true,
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
      existonlinedata: [],
      jobdata: [],
      faultdata:[],
      visibleModal: null,



          

       printingwastage: '0',
      printingoutput: '0',
      printingremark: '0',
      printingpassno: '0',
      printingtype: '0',
      printingend: false,
      printingendop: false,
      printinghold: false,

      coatingwastage: '0',
      coatingoutput: '0',
      coatingremark: '0',
      coatingpassno: '0',
      coatingend: false,
      coatinghold: false,

      Laminationwastage: '0',
      Laminationoutput: '0',
      Laminationremark: '0',
      Laminationpassno: '0',
      Laminationend: false,
      Laminationendop: false,
      Laminationhold: false,

      Pastingwastage: '0',
      Pastingoutput: '0',
      Pastingremark: '0',
      Pastingpassno: '0',
      Pastingtype: '0',
      Pastingend: false,
      Pastingendop: false,
      Pastinghold: false,

      Punchingwastage: '0',
      Punchingoutput: '0',
      Punchingremark: '0',
      Punchingpassno: '0',
      Punchingdie: '0',
      Punchingend: false,
      Punchingendop: false,
      Punchinghold: false,

      Embosewastage: '0',
      Emboseoutput: '0',
      Emboseremark: '0',
      Embosepassno: '0',
      Embosedie: '0',
      Emboseend: false,
      Emboseendop: false,
      Embosehold: false,


      Cuttingwastage: '0',
      Cuttingoutput: '0',
      Cuttingremark: '0',
      Cuttingend: false,
      Cuttingendop: false,
      Cuttinghold: false,



      Costingwastage: '0',
      Costingoutput: '0',
      Costingremark: '0',
      Costingpassno: '0',
      Costingend: false,
      Costingendop: false,
      Costinghold: false,


      otherremark: '0',
      otherend: '0',
      otherendop: false,
      otherhold: '0',    
      myhidden: true,
      checkbox4: false,
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
              

                this.fetchJTimeDetailID();
                this.fetchjobData();
                this.fetchoperatorData();
               // this.getExistProduction();
                this.fetchfaultData(); 
                this.getonlineprocess();  


               
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






 changeprintingpassno(value: string) 
 {   
    this.setState({
      printingpassno: value,
   
    });
  }




 changeprintingtype(value: string) 
 {   
    this.setState({
      printingtype: value,
   
    });
  }


  changeprintingend() 
  {
    this.setState({
      printingend: !this.state.printingend
    });
  }


  changeprintingendop() 
  {
    this.setState({
      printingendop: !this.state.printingendop
    });
  }



  
  changeprintinghold() {
    this.setState({
      printinghold: !this.state.printinghold
    });
  }




 changePastingpassno(value: string) 
 {   
    this.setState({
      Pastingpassno: value,
   
    });
  }




 changePastingtype(value: string) 
 {   
    this.setState({
      Pastingtype: value,
   
    });
  }


  changePastingend() {
    this.setState({
      Pastingend: !this.state.Pastingend
    });
  }


 changePastingendop() {
    this.setState({
      Pastingendop: !this.state.Pastingendop
    });
  }


  
  changePastinghold() {
    this.setState({
      Pastinghold: !this.state.Pastinghold
    });
  }









changecoatingpassno(value: string) 
 {   
    this.setState({
      coatingpassno: value,
   
    });
  }



  changecoatingend() {
    this.setState({
      coatingend: !this.state.coatingend
    });
  }
changecoatingendop() {
    this.setState({
      coatingendop: !this.state.coatingendop
    });
  }

  
  changecoatinghold() {
    this.setState({
      coatinghold: !this.state.coatinghold
    });
  }




changeLaminationpassno(value: string) 
 {   
    this.setState({
      Laminationpassno: value,
   
    });
  }



  changeLaminationend() {
    this.setState({
      Laminationend: !this.state.Laminationend
    });
  }

  
  changeLaminationendop() {
    this.setState({
      changeLaminationendop: !this.state.Laminationendop
    });
  }


  changeLaminationhold() {
    this.setState({
      Laminationhold: !this.state.Laminationhold
    });
  }



changePunchingpassno(value: string) 
 {   
    this.setState({
      Punchingpassno: value,
   
    });
  }



  changePunchingend() {
    this.setState({
      Punchingend: !this.state.Punchingend
    });
  }

  changePunchingendop() {
    this.setState({
      Punchingendop: !this.state.Punchingendop
    });
  }
  
  changePunchinghold() {
    this.setState({
      Punchinghold: !this.state.Punchinghold
    });
  }




changeEmbosepassno(value: string) 
 {   
    this.setState({
      Embosepassno: value,
   
    });
  }



  changeEmboseend() {
    this.setState({
      Emboseend: !this.state.Emboseend
    });
  }

  changeEmboseendop() 
  {
    this.setState({
      Emboseendop: !this.state.Emboseendop
    });
  }


  
  changeEmbosehold() {
    this.setState({
      Embosehold: !this.state.Embosehold
    });
  }



  changeCuttingend() {
    this.setState({
      Cuttingend: !this.state.Cuttingend
    });
  }

  changeCuttingendop() {
    this.setState({
      Cuttingendop: !this.state.Cuttingendop
    });
  }
  
  changeCuttinghold() {
    this.setState({
      Cuttinghold: !this.state.Cuttinghold
    });
  }






changeCostingpassno(value: string) 
 {   
    this.setState({
      Costingpassno: value,
   
    });
  }



  changeCostingend() {
    this.setState({
      Costingend: !this.state.Costingend
    });
  }


  changeCostingendop() {
    this.setState({
      Costingendop: !this.state.Costingendop
    });
  }

  
  changeCostinghold() {
    this.setState({
      Costinghold: !this.state.Costinghold
    });
  }





  changeotherend() {
    this.setState({
      otherend: !this.state.otherend
    });
  }


  changeotherendop() {
    this.setState({
      otherendop: !this.state.otherendop
    });
  }

  
  changeotherhold() {
    this.setState({
      otherhold: !this.state.otherhold
    });
  }






 firstmodalchange(value) 
 {  
   if (value!='') 
   {
    var str = value
    var res = str.split("|");
    var RecId =res[0];
    var PrID =res[1];
    var BasePruniqueID =res[2];

    this.setState({ mymachineid: str });
    this.setState({ machineid: RecId });
    this.setState({ processid: PrID });
    this.setState({ BasePruniqueID: BasePruniqueID });
    }
  }




 changeactivitystatus(value) 
 {

   // alert(value);
   this.setState({ visibleModal: null });
   if (value!='') 
   {
    var str = value;
    var res = str.split("|");
    var InterID =res[0];
    var AHead =res[1]; 
    var activityname =res[2];
    var activityActivityID =res[3];
    var activityStatus =res[4];
    var activityexistprocess =res[5];
    var activityJActivityID =res[6];

    //alert(InterID);        

    this.setState({ ActivityInterID: InterID });
    this.setState({ ActivityAHead: AHead });
    this.setState({ Activityname: activityname });
    this.setState({ ActivityActivityID: activityActivityID });
    this.setState({ ActivityStatus: activityStatus });
    this.setState({ ActivityJActivityID: activityJActivityID });

    if (AHead=='00004')
     {
      this.setState({ visibleModal: 4 })
     }


   else  if (activityStatus=='0')
     {
      this.setState({ visibleModal: 2 })
     }



     else
     {
      this.setState({ visibleModal: 1 })
     } 


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
    var startdatetime_process =this.state.startdatetime;
    

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
    'StartendDate':startdatetime_process,
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
this.setState({ spinner:true }); 
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
                    this.setState({ spinner:false });                    
                    this.setState({ visibleModal: 20 })
                    this.fetchJTimeDetailID();
                   }


                  else
                    {
                       this.setState({ spinner:false }); 
                       alert('Activity start unsuccessfully');
                    }
            
         }).catch((error) => 
            {
               this.setState({ spinner:false }); 
               alert('Databse error in Activity start ');
            })
        .done(); 
      }




  else
      {

          alert("Activity not idle or done")
      
      }  
  }

}








end_activity(value) 
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
    var myJActivityID =this.state.ActivityJActivityID;    
    var myOperatorID =this.state.OperatorID;
    var myoldOperatorID =this.state.oldOperatorID;
    var myprocessID =this.state.process_id;
    var mymachineID =this.state.MachineNo;
    var myBasePruniqueID =this.state.BasePruniqueID;
    var myPlanID =this.state.PlanID;
    var myprocess_name =this.state.process_name;

if (myOperatorID==myoldOperatorID) 
{


        if (myactivity_ActivityID=='00002')
     {
      //WastageModal
      this.setState({ visibleModal: 16 })
     }



    else   if (myactivity_ActivityID=='00003')
     {
      //processoutputmodal

      if (myprocess_id=='Pr') 
      {
        //printingmodal
      this.setState({ visibleModal: 3 })
      }

       else if (myprocess_id=='FC'||myprocess_id=='BC') 
          {
          //CoatingModal
          this.setState({ visibleModal: 10 })
          }

       else if (myprocess_id=='FL')
         {
             //Lamination Modal         
            this.setState({ visibleModal: 11 })
         }

          else if (myprocess_id=='Pa')
         {
             //Pasting Modal         
            this.setState({ visibleModal: 12 })
         }


          else if (myprocess_id=='PN')
         {
             //Punching Modal         
            this.setState({ visibleModal: 13 })
         }


          else if (myprocess_id=='EM')
         {
             //Embose Modal         
            this.setState({ visibleModal: 14 })
         }


          else if (myprocess_id=='PCut'||myprocess_id=='FCut'||myprocess_id=='SH') 
         {
             //Cutting Modal         
            this.setState({ visibleModal: 15 })
         }

          else  
         {
             //Coating Modal         
            this.setState({ visibleModal: 10 })
         }



     }




     else
        { 
         this.setState({ visibleModal: 17 })                          
        }


}

    else
    {
    alert("Operator should be same at end time of activity")
    }


}

}













saveOutput(value) 
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
    var myJActivityID =this.state.ActivityJActivityID;    
    var myOperatorID =this.state.OperatorID;    
    var myOnlineID =this.state.OnlineID;
    var myprocessID =this.state.process_id;
    var mymachineID =this.state.MachineNo;
    var myBasePruniqueID =this.state.BasePruniqueID;
    var myPlanID =this.state.PlanID;
    var myprocess_name =this.state.process_name;
    var enddatetime_process =this.state.endtdatetime;
    
   

        if (myactivity_ActivityID=='00002')
     {
       
          var pewastage = this.state.Costingwastage;
          var peoutput  = this.state.Costingoutput;
          var peremark =this.state.Costingremark;
          var passno =this.state.Costingpassno;
          var ptype ='0';
          var nofqc ='0';
          var chkbox =this.state.Costingend;
          var chkboxop =this.state.Costingendop;
          var hold =this.state.Costinghold;
          var patype ='0';
          var pajobs ='0';
          var pedie ='0';
     }



    else   if (myactivity_ActivityID=='00003')
     {
      //processoutputmodal

      if (myprocess_id=='Pr') 
      {
        //printingmodal
          var pewastage = this.state.printingwastage;
          var peoutput  = this.state.printingoutput;
          var peremark =this.state.printingremark;
          var passno =this.state.printingpassno;
          var ptype =this.state.printingtype;
          var nofqc ='0';
          var chkbox =this.state.printingend;
          var hold =this.state.printinghold;
          var patype ='0';
          var pajobs ='0';
          var pedie ='0';
      }



       else if (myprocess_id=='FC'||myprocess_id=='BC') 
          {
          //CoatingModal
          var pewastage = this.state.coatingwastage;
          var peoutput  = this.state.coatingoutput;
          var peremark =this.state.coatingremark;
          var passno =this.state.coatingpassno;
          var ptype ='0';
          var nofqc ='0';
          var chkbox =this.state.coatingend;
          var chkboxop =this.state.coatingendop;
          var hold =this.state.coatinghold;
          var patype ='0';
          var pajobs ='0';
          var pedie ='0';
          }





       else if (myprocess_id=='FL')
         {
           //Lamination Modal         
          var pewastage = this.state.Laminationwastage;
          var peoutput  = this.state.Laminationoutput;
          var peremark =this.state.Laminationremark;
          var passno =this.state.Laminationpassno;
          var ptype ='0';
          var nofqc ='0';
          var chkbox =this.state.Laminationend;
          var chkboxop =this.state.Laminationendop;
          var hold =this.state.Laminationhold;
          var patype ='0';
          var pajobs ='0';
          var pedie ='0';
         }




          else if (myprocess_id=='Pa')
         {
             //Pasting Modal         
          var pewastage = this.state.Pastingwastage;
          var peoutput  = this.state.Pastingoutput;
          var peremark =this.state.Pastingremark;
          var passno =this.state.Pastingpassno;
          var ptype =this.state.Pastingtype;
          var nofqc ='0';
          var chkbox =this.state.Pastingend;
          var chkboxop =this.state.Pastingendop;
          var hold =this.state.Pastinghold;
          var patype ='0';
          var pajobs ='0';
          var pedie ='0';
         }





          else if (myprocess_id=='PN')
         {
             //Punching Modal         
          var pewastage = this.state.Punchingwastage;
          var peoutput  = this.state.Punchingoutput;
          var peremark =this.state.Punchingremark;
          var passno =this.state.Punchingpassno;
          var ptype ='0';
          var nofqc ='0';
          var chkbox =this.state.Punchingend;
          var chkboxop =this.state.Punchingendop;
          var hold =this.state.Punchinghold;
          var patype ='0';
          var pajobs ='0';
          var pedie =this.state.Punchingdie;
         }





          else if (myprocess_id=='EM')
         {
             //Embose Modal         
          var pewastage = this.state.Embosewastage;
          var peoutput  = this.state.Emboseoutput;
          var peremark =this.state.Emboseremark;
          var passno =this.state.Embosepassno;
          var ptype ='0';
          var nofqc ='0';
          var chkbox =this.state.Emboseend;
          var chkboxop =this.state.Emboseendop;
          var hold =this.state.Embosehold;
          var patype ='0';
          var pajobs ='0';
          var pedie =this.state.Embosedie;
         }





          else if (myprocess_id=='PCut'||myprocess_id=='FCut'||myprocess_id=='SH') 
         {
             //Cutting Modal         
          var pewastage = this.state.Cuttingwastage;
          var peoutput  = this.state.Cuttingoutput;
          var peremark =this.state.Cuttingremark;
          var passno ='0';
          var ptype ='0';
          var nofqc ='0';
          var chkbox =this.state.Cuttingend;
          var chkboxop =this.state.Cuttingendop;
          var hold =this.state.Cuttinghold;
          var patype ='0';
          var pajobs ='0';
          var pedie ='0';
         }




          else  
         {
             //Costing Modal         
          var pewastage = this.state.Costingwastage;
          var peoutput  = this.state.Costingoutput;
          var peremark =this.state.Costingremark;
          var passno =this.state.Costingpassno;
          var ptype ='0';
          var nofqc ='0';
          var chkbox =this.state.Costingend;
          var chkboxop =this.state.Costingendop;
          var hold =this.state.Costinghold;
          var patype ='0';
          var pajobs ='0';
          var pedie ='0';
         }



     }




     else
        { 
          var pewastage = '0';
          var peoutput  = '0';
          var peremark =this.state.otherremark;
          var passno ='0';
          var ptype ='0';
          var nofqc ='0';
          var chkbox ='0';
          var hold =this.state.otherhold;
          var chkboxop =this.state.otherendop;
          var patype ='0';
          var pajobs ='0';
          var pedie ='0';                         
        }


if (hold==false)
 {
  hold=0;
  }

  if (hold==true)
 {
  hold=1;
  }


 if (chkbox==false)
 {
  chkbox=0;
  }

  if (chkbox==true)
 {
  chkbox=1;
  }


if (chkboxop==false)
 {
  chkboxop=0;
  }



  if (chkboxop==true)
  {
  chkboxop=1;
  }


 var details = {
    'accountid':loginid,
    'PrID':myprocessID,
    'ActivityID':activityid,
    'PlanUniqueID':myPlanID,
    'DocID':mydocID,
    'SeqNo':'0',
    'MachineID':mymachineID,
    'SuperViserID':loginid,
    'ICompanyID':logincompanyid,
    'StartendDate':enddatetime_process,
    'OperatorID':myOperatorID,
    'OnlineID':myOnlineID,
    'MobileSerialNo':logincompanyid,
    'JTimeDetailID':myJTimeDetailID,
    'JActivityId':myJActivityID,


    'Wastage':pewastage,
    'Output':peoutput,
    'Remarks':peremark,
    'PassNo':passno,
    'EReason':ptype,
    'Noofqcsamples':nofqc,
    'JobFinished':chkbox,
    'JobFinishedoperator':chkboxop,
    'Hold':hold,
    'FB':patype,
    'PastingJobID':pajobs,
    'blockid':pedie
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
this.setState({ spinner:true }); 
  var formBody = [];
    for (var property in details) 
    {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

  fetch(Constants.service_url+'Production/endActivity',{
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
                    this.setState({ visibleModal: 21 })
                    if (chkbox==1 ||hold==1) 
                      { 
                        this.props.navigation.navigate('Dashboard');
                      }
                      else
                      {
                         this.fetchJTimeDetailID();
                      }
                    
                   }


                  else
                    {
                       this.setState({ spinner:false }); 
                       alert('Activity End unsuccessfully');
                    }
            
         }).catch((error) => 
            {
               alert('Databse error in Activity End');
            })
        .done();

}

}










 onoperatorChange(value: string) 
 {   
      this.setState({
      OperatorID: value,
   
    });
  }

ononlineprocessChange(value: string) 
 {   
      this.setState({
      OnlineID: value,
   
    });
  }











 fetchoperatorData() 
  { 

this.setState({ spinner:true }); 
    var details = 
    {
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
                this.setState({ spinner:false }); 
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
                this.setState({ spinner:true }); 
                alert('Databse error in Getting Operator');
            })
        .done();   
  };







 fetchjobData= async () => 
 {
    this.setState({ spinner:true }); 
    var details =
     {
    'DocID':this.state.docID
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getjob',{
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
               alert('Databse error in Getting Jobdata');
            })
        .done();   
  };





fetchJTimeDetailID = async () => 
{
    this.setState({ spinner:true }); 
    var details = {
    'PrID':this.state.process_id,
    'MachineID':this.state.MachineNo,
    'PlanUniqueID':this.state.PlanID
};


var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/checkExistProduction',{
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
                    var myJTimeDetail = ticketList.data[0].JTimeDetailID;
                    this.setState({ JTimeDetailID: myJTimeDetail });
                   }
                    

                  else
                    {                      
                       this.setState({ JTimeDetailID: '0' });
                    }
                    this.getExistProduction();  
         }).catch((error) => {
          this.setState({ spinner:false }); 
                alert('problem while adding data fetchJTimeDetailID');
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


/*var process_id = this.state.process_id;
var JTimeDetailID  = this.state.JTimeDetailID;
var docID =this.state.docID;
var PlanID =this.state.PlanID;


alert(process_id);
alert(JTimeDetailID);
alert(docID);
alert(PlanID);*/


var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getExistProduction_final',{
  method: 'POST',
  headers: {
   'x-api-key': 'MYSECRETRENUKAAPIKEY',
   'Accept': 'application/json',
   'Content-Type': 'application/x-www-form-urlencoded'
 },
 body: formBody
 }) 
 .then((response) => response.json())
        .then((responseData) => 
        {
            console.log("Response:",responseData);
                 var ticketList = responseData;
                  this.setState({ spinner:false }); 
                  if (ticketList.code =='200')
                   {                    
                     this.setState({ existactivitydata: ticketList.data });
                   }
                    

                  else
                    {                      
                       alert('No Activity Running');
                    }


         }).catch((error) => 
         {
              this.setState({ spinner:false }); 
               alert('Databse error in Getting Running Activity');
            })
        .done();   
  };




getonlineprocess = async () => 
{
    var details = {
    'PrID':this.state.process_id,
    'RecordID':this.state.JTimeDetailID,
    'DocID':this.state.docID,
    'PlanUniqueID':this.state.PlanID
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getonlineprocess',{
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
            this.setState({ spinner:false });
                 var ticketList = responseData;
                  if (ticketList.code =='200')
                   {                   
                     this.setState({ existonlinedata: ticketList.data });
                   }
                    

                  else
                    {                     
                       alert('No Online Process');
                    }


         }).catch((error) => {
               this.setState({ spinner:false });
                alert('problem while adding data');
            })
        .done();   
  };






getonlineprocess = async () => 
{
    var details = {
    'PrID':this.state.process_id,
    'RecordID':this.state.JTimeDetailID,
    'DocID':this.state.docID,
    'PlanUniqueID':this.state.PlanID
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getonlineprocess',{
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
            this.setState({ spinner:false });
                 var ticketList = responseData;
                  if (ticketList.code =='200')
                   {                   
                     this.setState({ existonlinedata: ticketList.data });
                   }
                    

                  else
                    {                     
                       //alert('No Online Process');
                    }


         }).catch((error) => {
               this.setState({ spinner:false });
                alert('problem while adding data');
            })
        .done();   
  };



 fetchfaultData() 
  {
   

    var details = {
    'SupervisiorID':this.state.usernewID
     };


var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

fetch(Constants.service_url+'Production/getMFault', {
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
                    this.setState({ faultdata: ticketList.data });
                   }


                  else
                    {
                       alert('No Fault List Found');
                    }
            
         }).catch((error) => 
            {
                alert('Databse error in Getting Fault List');
            })
        .done();   
  };







  static navigationOptions = {
    title: 'Welcome',
     header: null,
  };



   alertItemName = (item) => 
   {
      alert(item.name)
   }




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
            <Title>Offline Edit Running Process</Title>
          </Body>
          <Right />
        </Header>

         
         <Content padder>
          <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={mystyles.spinnerTextStyle}
            />

          <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 1} >
                  <View style={mystyles.modalContent}>
                     <Text>Do you want to Start Activity</Text>

                              <View  style={mystyles.inputContainer} >
                             <DatePicker
                                  style={{width: 250}}
                                  date={this.state.startdatetime}
                                  mode="datetime"
                                  placeholder="Select Date Time"
                                  format="DD-MM-YYYY h:mm:ss"
                                  minDate="2019-04-01"
                                  maxDate={this.state.startdatetime}
                                  confirmBtnText="Confirm"
                                  cancelBtnText="Cancel"
                                  customStyles={{
                                    dateIcon: {
                                      position: 'absolute',
                                      left: 0,
                                      top: 4,
                                      marginLeft: 0
                                    },
                                    dateInput: {
                                      marginLeft: 36,
                                      borderWidth: 0
                                    }
                                  }}
                                  onDateChange={(date) => {this.setState({startdatetime: date})}}
                                />                          
                            </View>  


                    
                            <View style={{flexDirection: "row"}} >                             
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>


                              <Button style={mystyles.button} rounded large success onPress={() => this.set_activity()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>




          <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 2} >
                  <View style={mystyles.modalContent}>
                     <Text>Do you want to End Activity!</Text>

                      <View  style={mystyles.inputContainer} >
                             <DatePicker
                                  style={{width: 250}}
                                  date={this.state.enddatetime}
                                  mode="datetime"
                                  placeholder="Select Date Time"
                                  format="DD-MM-YYYY h:mm:ss"
                                  minDate="2019-04-01"
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
                                    dateInput: {
                                      marginLeft: 36,
                                      borderWidth: 0
                                    }
                                  }}
                                  onDateChange={(date) => {this.setState({enddatetime: date})}}
                                />                          
                            </View>  

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.end_activity()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>





            <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 3} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>


                  <View  style={mystyles.inputContainer} >
             <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Pass no"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.printingpassno}
              onValueChange={this.changeprintingpassno.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Pass no" value='' />  
              <Picker.Item  color="#2980b9" label="First" value='1' />
              <Picker.Item  color="#2980b9" label="Second" value='2' />
              <Picker.Item  color="#2980b9" label="Third" value='3' />
              <Picker.Item  color="#2980b9" label="Fourth" value='4' /> 
              <Picker.Item  color="#2980b9" label="Fifth" value='5' /> 
              </Picker>   
            </View> 



              <View  style={mystyles.inputContainer} >
               <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Print type"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.printingtype}
              onValueChange={this.changeprintingtype.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Print type" value='0' /> 
                <Picker.Item  color="#2980b9" label="Front" value='F' />
              <Picker.Item  color="#2980b9" label="Back" value='B' />
              <Picker.Item  color="#2980b9" label="Front-Back" value='FB' />
              <Picker.Item  color="#2980b9" label="Other" value='O' /> 
              </Picker>                 
            </View> 

              <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Wastage Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({printingwastage : TextInputValue }) }/>                              
            </View>  
            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Output Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({printingoutput : TextInputValue }) }/>                         
            </View> 
            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              keyboardType="Remark"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({printremark : TextInputValue }) }/>              
            </View> 


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.printinghold}
               onPress={() => this.changeprintinghold()}
            />
            <Body>
              <Text>Job Hold</Text>
            </Body>
              <CheckBox
              color="green"
              checked={this.state.printingendop}
              onPress={() => this.changeprintingendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>
            <CheckBox
              color="green"
              checked={this.state.printingend}
              onPress={() => this.changeprintingend()}             
            />
            <Body>
              <Text>Job Finished</Text>
            </Body>
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>


       







                <Modal isVisible={this.state.visibleModal === 10} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>


            <View  style={mystyles.inputContainer} >
             <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Pass no"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.coatingpassno}
              onValueChange={this.changecoatingpassno.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Pass no" value='' />  
              <Picker.Item  color="#2980b9" label="First" value='1' />
              <Picker.Item  color="#2980b9" label="Second" value='2' />
              <Picker.Item  color="#2980b9" label="Third" value='3' />
              <Picker.Item  color="#2980b9" label="Fourth" value='4' /> 
              <Picker.Item  color="#2980b9" label="Fifth" value='5' /> 
              </Picker>   
            </View> 



            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Wastage Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({coatingwastage : TextInputValue }) }/>                              
            </View>  

            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Output Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({coatingoutput : TextInputValue }) }/>                         
            </View> 

            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              keyboardType="Remark"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({coatingremark : TextInputValue }) }/>              
            </View> 


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.coatinghold}
              onPress={() => this.changecoatinghold()}
            />

            <Body>
              <Text>Job Hold</Text>
            </Body>
             <CheckBox
              color="green"
              checked={this.state.coatingendop}
              onPress={() => this.changecoatingendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>

            <CheckBox
              color="green"
              checked={this.state.coatingend}
              onPress={() => this.changecoatingend()}
            />
            <Body>
              <Text>Job Finished</Text>
            </Body>
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>




        




            <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 11} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>


                  <View  style={mystyles.inputContainer} >
             <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Pass no"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.Laminationpassno}
              onValueChange={this.changeLaminationpassno.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Pass no" value='' />  
              <Picker.Item  color="#2980b9" label="First" value='1' />
              <Picker.Item  color="#2980b9" label="Second" value='2' />
              <Picker.Item  color="#2980b9" label="Third" value='3' />
              <Picker.Item  color="#2980b9" label="Fourth" value='4' /> 
              <Picker.Item  color="#2980b9" label="Fifth" value='5' /> 
              </Picker>   
            </View> 



              <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Wastage Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Laminationwastage : TextInputValue }) }/>                              
            </View>  


            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Output Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Laminationoutput : TextInputValue }) }/>                         
            </View> 


            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Laminationremark : TextInputValue }) }/>              
            </View> 


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.Laminationhold}
              onPress={() => this.changeLaminationhold()}
            />
            <Body>
              <Text>Job Hold</Text>
            </Body>

              <CheckBox
              color="green"
              checked={this.state.Laminationend}
              onPress={() => this.changeLaminationendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>



            <CheckBox
              color="green"
              checked={this.state.Laminationend}
              onPress={() => this.changeLaminationend()}
            />
            <Body>
              <Text>Job Finished</Text>
            </Body>
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>








            <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 12} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>


                  <View  style={mystyles.inputContainer} >
             <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Pass no"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.Pastingpassno}
              onValueChange={this.changePastingpassno.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Pass no" value='' />  
              <Picker.Item  color="#2980b9" label="First" value='1' />
              <Picker.Item  color="#2980b9" label="Second" value='2' />
              <Picker.Item  color="#2980b9" label="Third" value='3' />
              <Picker.Item  color="#2980b9" label="Fourth" value='4' /> 
              <Picker.Item  color="#2980b9" label="Fifth" value='5' /> 
              </Picker>   
            </View> 





           <View  style={mystyles.inputContainer} >
             <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Type"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.Pastingtype}
              onValueChange={this.changePastingtype.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Pass no" value='' />  
              <Picker.Item  color="#2980b9" label="First" value='1' />
              <Picker.Item  color="#2980b9" label="Second" value='2' />
              <Picker.Item  color="#2980b9" label="Third" value='3' />
              <Picker.Item  color="#2980b9" label="Fourth" value='4' /> 
              <Picker.Item  color="#2980b9" label="Fifth" value='5' /> 
              </Picker>   
            </View> 



              <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Wastage Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Pastingwastage : TextInputValue }) }/>                              
            </View>  


            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Output Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Pastingoutput : TextInputValue }) }/>                         
            </View> 


            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              keyboardType="Remark"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Pastingremark : TextInputValue }) }/>              
            </View> 


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.Pastinghold}
              onPress={() => this.changePastinghold()}
            />
            <Body>
              <Text>Job Hold</Text>
            </Body>


            <CheckBox
              color="green"
              checked={this.state.Pastingendop}
              onPress={() => this.changePastingendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>


            <CheckBox
              color="green"
              checked={this.state.Pastingend}
              onPress={() => this.changePastingend()}
            />
            <Body>
              <Text>Job Finished</Text>
            </Body>
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>














            <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 13} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>


                   <View  style={mystyles.inputContainer} >
             <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Type"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.Punchingpassno}
              onValueChange={this.changePunchingpassno.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Pass no" value='' />  
              <Picker.Item  color="#2980b9" label="First" value='1' />
              <Picker.Item  color="#2980b9" label="Second" value='2' />
              <Picker.Item  color="#2980b9" label="Third" value='3' />
              <Picker.Item  color="#2980b9" label="Fourth" value='4' /> 
              <Picker.Item  color="#2980b9" label="Fifth" value='5' /> 
              </Picker>   
            </View> 





         <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Punch Die Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Punchingdie : TextInputValue }) }/>                              
            </View> 




              <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Wastage Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Punchingwastage : TextInputValue }) }/>                              
            </View>

            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Output Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Punchingoutput : TextInputValue }) }/>                         
            </View> 


            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              keyboardType="Remark"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Punchingremark : TextInputValue }) }/>              
            </View> 


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.Punchinghold}
              onPress={() => this.changePunchinghold()}
            />
            <Body>
              <Text>Job Hold</Text>
            </Body>

              <CheckBox
              color="green"
              checked={this.state.Punchingendop}
              onPress={() => this.changePunchingendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>


            <CheckBox
              color="green"
              checked={this.state.Punchingend}
              onPress={() => this.changePunchingend()}
            />
            <Body>
              <Text>Job Finished</Text>
            </Body>
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>










            <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 14} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>


                   <View  style={mystyles.inputContainer} >
             <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Type"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.Embosepassno}
              onValueChange={this.changeEmbosepassno.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Pass no" value='' />  
              <Picker.Item  color="#2980b9" label="First" value='1' />
              <Picker.Item  color="#2980b9" label="Second" value='2' />
              <Picker.Item  color="#2980b9" label="Third" value='3' />
              <Picker.Item  color="#2980b9" label="Fourth" value='4' /> 
              <Picker.Item  color="#2980b9" label="Fifth" value='5' /> 
              </Picker>   
            </View> 





         <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Embase Die No"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Embosedie : TextInputValue }) }/>                              
            </View> 




              <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Wastage Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Embosewastage : TextInputValue }) }/>                              
            </View> 


            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Output Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Emboseoutput : TextInputValue }) }/>                         
            </View> 


            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              keyboardType="Remark"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Emboseremark : TextInputValue }) }/>              
            </View> 


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.Embosehold}
              onPress={() => this.changeEmbosehold()}
            />
            <Body>
              <Text>Job Hold</Text>
            </Body>

            <CheckBox
              color="green"
              checked={this.state.Emboseendop}
              onPress={() => this.changeEmboseendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>

            <CheckBox
              color="green"
              checked={this.state.Emboseend}
              onPress={() => this.changeEmboseend()}
            />
            <Body>
              <Text>Job Finished</Text>
            </Body>
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>







            <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 15} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>


               


              <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Wastage Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Cuttingwastage : TextInputValue }) }/>                              
            </View>  

            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Output Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Cuttingoutput : TextInputValue }) }/>                         
            </View> 

            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              keyboardType="Remark"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Cuttingremark : TextInputValue }) }/>              
            </View> 


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.Cuttinghold}
              onPress={() => this.changeCuttinghold()}
            />
            <Body>
              <Text>Job Hold</Text>
            </Body>

            <CheckBox
              color="green"
              checked={this.state.Cuttingendop}
              onPress={() => this.changeCuttingendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>

            <CheckBox
              color="green"
              checked={this.state.Cuttingend}
              onPress={() => this.changeCuttingend()}
            />
            <Body>
              <Text>Job Finished</Text>
            </Body>
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>









           <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 16} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>


                  <View  style={mystyles.inputContainer} >
             <Picker
              mode="dropdown"
               style={mystyles.inputs}
              placeholder="Select Type"
              placeholderStyle={{ color: 'red',fontSize:17 }}
              note={false}              
              selectedValue={this.state.Costingpassno}
              onValueChange={this.changeCostingpassno.bind(this)}
              >           
              <Picker.Item  color="#2980b9" label="Select Pass no" value='' />  
              <Picker.Item  color="#2980b9" label="First" value='1' />
              <Picker.Item  color="#2980b9" label="Second" value='2' />
              <Picker.Item  color="#2980b9" label="Third" value='3' />
              <Picker.Item  color="#2980b9" label="Fourth" value='4' /> 
              <Picker.Item  color="#2980b9" label="Fifth" value='5' /> 
              </Picker>   
            </View> 




            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Wastage Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Costingwastage : TextInputValue }) }/>                              
            </View>



              <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Output Here"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Costingoutput : TextInputValue }) }/>                              
            </View>  


            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              keyboardType="Remark"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({Costingremark : TextInputValue }) }/>              
            </View> 

            


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.Costinghold}
              onPress={() => this.changeCostinghold()}
            />
            <Body>
              <Text>Job Hold</Text>
            </Body>

             <CheckBox
              color="green"
              checked={this.state.Costingendop}
              onPress={() => this.changeCostingendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>
            
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>















 <View style={mystyles.container}>
                <Modal isVisible={this.state.visibleModal === 17} 
                 animationIn={'slideInLeft'}
                 animationOut={'slideOutRight'}>
                  <View style={mystyles.modalContent}>

            <View  style={mystyles.inputContainer} >
              <TextInput style={mystyles.inputs}
              placeholder="Enter Remark Here"
              keyboardType="Remark"
              underlineColorAndroid='transparent'
              onChangeText={ TextInputValue =>
              this.setState({otherremark : TextInputValue }) }/>              
            </View> 


              <View style={{flexDirection: "row"}}>
            <CheckBox
              color="red"
              checked={this.state.otherhold}
              onPress={() => this.changeotherhold()}
            />
            <Body>
              <Text>Job Hold</Text>
            </Body>

             <CheckBox
              color="green"
              checked={this.state.otherendop}
              onPress={() => this.changeotherendop()}
            />
            <Body>
              <Text>Shift Finished</Text>
            </Body>
           
            </View> 

                    
                            <View style={{flexDirection: "row"}} >
                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                <Text>No</Text>
                              </Button>
                              

                              <Button style={mystyles.button} rounded large success onPress={() => this.saveOutput()}>
                                  <Text>Yes</Text>
                              </Button>
                            </View>

                   </View>
                </Modal>
            </View>







                <Modal    isVisible={this.state.visibleModal === 20}
                          backdropColor={'#f8f51d'}
                          backdropOpacity={1}
                          animationIn={'zoomInDown'}
                          animationOut={'zoomOutUp'}
                          animationInTiming={1000}
                          animationOutTiming={1000}
                          backdropTransitionInTiming={1000}
                          backdropTransitionOutTiming={1000}
                        >
                          <View style={mystyles.modalContent}>
                             <Text>You are  Start {this.state.Activityname} Activity! </Text>


                                            <View style={{flexDirection: "row"}} >
                                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                                <Text>Done</Text>
                                              </Button>
                                            </View>
                               
                          </View>
                        </Modal>







             


             <Modal    isVisible={this.state.visibleModal === 21}
                          backdropColor={'#0a205a'}
                          backdropOpacity={1}
                          animationIn={'zoomInDown'}
                          animationOut={'zoomOutUp'}
                          animationInTiming={1000}
                          animationOutTiming={1000}
                          backdropTransitionInTiming={1000}
                          backdropTransitionOutTiming={1000}
                        >
                          <View style={mystyles.modalContent}>
                             <Text>You are  End {this.state.Activityname} Activity! </Text>


                                            <View style={{flexDirection: "row"}} >
                                              <Button style={mystyles.button} rounded large danger onPress={() => this.setState({ visibleModal: null })}>
                                                <Text>Done</Text>
                                              </Button>
                                            </View>
                               
                          </View>
                        </Modal>







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




             <View  style={mystyles.selectbox} >
              <Picker
              mode="dropdown"
              disabled={ !this.state.myhidden ?  true : false }
              style={mystyles.inputs}
              placeholder="Select Online Process"
              placeholderStyle={{ color: '#0a205a',fontSize:17 }}
              note={false}
              selectedValue={this.state.OnlineID}
              onValueChange={this.ononlineprocessChange.bind(this)}
              >  
              <Picker.Item  color="#2980b9" label="Select Online Process" value='' /> 
               {
               this.state.existonlinedata.map((item, index) => (
               <Picker.Item  color="#2980b9" label={item.Description} value={item.PlanUniqueID}  />
                 ))
              }
              </Picker>   
            </View>








            <View   style = {mystyles.container} >
              
              {

               this.state.existactivitydata.map((myexistitem, index) => (
                
                <Choose>                    
                    <When condition={(myexistitem.existprocess==1 && myexistitem.Status==1 && myexistitem.lockprocess==0)}>  
                      <TouchableOpacity
                  style={[mystyles.row, {backgroundColor: '#19a329'}]}
                  key = {myexistitem.id}  
                  >
                <View style={mystyles.row_cell_timeplace2}>
                 <Text style={mystyles.row_time}> </Text>
                 <Text style={mystyles.row_place2}>{myexistitem.InterName} (Completed)</Text>
               </View>
                  </TouchableOpacity>
                    </When>





                     <When condition={(myexistitem.existprocess==1 && myexistitem.Status==1 && myexistitem.lockprocess==1)}>  
                      <TouchableOpacity
                  style={[mystyles.row, {backgroundColor: '#19a329'}]}
                  key = {myexistitem.id}  
                 onPress={() => this.changeactivitystatus(myexistitem.InterID+'|'+myexistitem.AHead+'|'+myexistitem.InterName+'|'+myexistitem.ActivityID+'|'+myexistitem.Status+'|'+myexistitem.existprocess+'|'+myexistitem.JActivityID)} 
                  >
                <View style={mystyles.row_cell_timeplace2}>
                 <Text style={mystyles.row_time}> </Text>
                 <Text style={mystyles.row_place2}>{myexistitem.InterName} (Completed)</Text>
               </View>
                  </TouchableOpacity>
                    </When>


                    





                    <When condition={(myexistitem.existprocess==1 && myexistitem.Status==0 && myexistitem.lockprocess==1)}>    
                      <TouchableOpacity
                  style={[mystyles.row, {backgroundColor: '#c12626'}]}
                  key = {myexistitem.id} 
                 onPress={() => this.changeactivitystatus(myexistitem.InterID+'|'+myexistitem.AHead+'|'+myexistitem.InterName+'|'+myexistitem.ActivityID+'|'+myexistitem.Status+'|'+myexistitem.existprocess+'|'+myexistitem.JActivityID)} 
                  >
                <View style={mystyles.row_cell_timeplace2}>
                 <Text style={mystyles.row_time}> </Text>
                 <Text style={mystyles.row_place2}>{myexistitem.InterName} (Running) </Text>
               </View>
                  </TouchableOpacity>
                    </When>




                     <When condition={(myexistitem.existprocess==1 && myexistitem.Status==5 && myexistitem.lockprocess==1)}>    
                      <TouchableOpacity
                  style={[mystyles.row, {backgroundColor: '#f8f51d'}]}
                  key = {myexistitem.id}   >
                <View style={mystyles.row_cell_timeplace2}>
                 <Text style={mystyles.row_time}> </Text>
                 <Text style={mystyles.row_place2}>{myexistitem.InterName} (Hold)</Text>
               </View>
                  </TouchableOpacity>
                    </When>




                      <When condition={(myexistitem.existprocess==0 && myexistitem.Status==2 && myexistitem.lockprocess==0)}>    
                      <TouchableOpacity
                  style={[mystyles.row, {backgroundColor: '#0a205a'}]}
                  key = {myexistitem.id}  >
                <View style={mystyles.row_cell_timeplace2}>
                 <Text style={mystyles.row_time}> </Text>
                 <Text style={mystyles.row_place2}>{myexistitem.InterName} (idle)</Text>
               </View>
                  </TouchableOpacity>
                    </When>



                    <When condition={(myexistitem.existprocess==0 && myexistitem.Status==2 && myexistitem.lockprocess==1)}>    
                      <TouchableOpacity
                  style={[mystyles.row, {backgroundColor: '#0a205a'}]}
                  key = {myexistitem.id}  
                 onPress={() => this.changeactivitystatus(myexistitem.InterID+'|'+myexistitem.AHead+'|'+myexistitem.InterName+'|'+myexistitem.ActivityID+'|'+myexistitem.Status+'|'+myexistitem.existprocess+'|'+myexistitem.JActivityID)} 
                 >
                <View style={mystyles.row_cell_timeplace2}>
                 <Text style={mystyles.row_time}> </Text>
                 <Text style={mystyles.row_place2}>{myexistitem.InterName} (idle)</Text>
               </View>
                  </TouchableOpacity>
                    </When>





                    <Otherwise>
                     <TouchableOpacity
                  style={[mystyles.row, {backgroundColor: '#0a205a'}]}
                  key = {myexistitem.id}  
                 onPress={() => this.changeactivitystatus(myexistitem.InterID+'|'+myexistitem.AHead+'|'+myexistitem.InterName+'|'+myexistitem.ActivityID+'|'+myexistitem.Status+'|'+myexistitem.existprocess+'|'+myexistitem.JActivityID)} 
                  >
                <View style={mystyles.row_cell_timeplace2}>
                 <Text style={mystyles.row_time}> </Text>
                 <Text style={mystyles.row_place2}>{myexistitem.InterName} (idle)</Text>
               </View>
                  </TouchableOpacity>
                    

                    </Otherwise>
              </Choose>


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