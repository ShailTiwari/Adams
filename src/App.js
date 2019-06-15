import React, { Component } from 'react';
import {  AppRegistry,  StyleSheet,  Text,  View, Dimensions} from 'react-native';
import { createAppContainer,createStackNavigator } from 'react-navigation';





import Home from "./screens/home/";
import Login from "./screens/login/";

import Dashboard from "./screens/dashboard/";
import Editrunningprocess from "./screens/dashboard/editprocess";

import Addprocess from "./screens/addprocess/";
import Addprocessnext from "./screens/addprocess/editprocess";

import Editprocess from "./screens/editprocess/";
import Editprocessnext from "./screens/editprocess/editprocess";
import Editprocessupdate from "./screens/editprocess/editupdateprocess";



import Offlineprocess from "./screens/offlineprocess/";
import editOfflineprocess from "./screens/offlineprocess/editprocess";



import Holdprocess from "./screens/holdprocess/";
import Metinance from "./screens/metinance/";

import Account from "./screens/account/";


const { width, height } = Dimensions.get("window");



const RootStack = createStackNavigator(
  {
    Home:Home,
    Login:Login,   
    Dashboard:Dashboard,   
    Addprocess:Addprocess, 
    Addprocessnext:Addprocessnext,  
    Editprocess:Editprocess,    
    Editprocessnext:Editprocessnext,  
    Editprocessupdate:Editprocessupdate,   
    Offlineprocess:Offlineprocess,    
    editOfflineprocess:editOfflineprocess,   
    Holdprocess:Holdprocess,  
    Metinance:Metinance,  
    Editrunningprocess:Editrunningprocess,
    Account:Account,
  },
  {
    initialRouteName: 'Home',
     headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

