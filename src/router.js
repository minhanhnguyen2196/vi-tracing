import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Animated, Easing, TouchableOpacity } from 'react-native';
import React, { Component } from 'react'

import Main from '../src/components/Authentication/Main';
import Login from '../src/components/Authentication/Login';
import Scan from '../src/components/Farmer/Scan';
import VerifiedProfile  from './components/Farmer/VerifiedProfile'
import ScanResult from './components/Farmer/ScanResult';
import InputForm from './components/Farmer/InputForm';
import InputForm2 from './components/Farmer/InputForm2';
import Submit from './components/Farmer/Submit';
import Home from './components/Home';
import ShipmentListForFarmer from './components/Farmer/ShipmentListForFarmer';
import ShipmentDetail from './components/Farmer/ShipmentDetail';
import Profile from './components/Farmer/Profile';

import VerifyScan from './components/Verifier/VerifyScan';
import PackageDetailForVerifier from './components/Verifier/PackageDetailForVerifier';
import VerifyForm from './components/Verifier/VerifyForm';
import ShipmentListForVerifier from './components/Verifier/ShipmentListForVerifier';

import MarketScan from './components/Market/MarketScan';
import PackageDetailForMarket from './components/Market/PackageDetailForMarket';
import VerifyFormMarket from './components/Market/VerifyFormMarket';
import ShipmentListForRetailer from './components/Market/ShipmentListForRetailer';

import FormShipper from './components/Shipper/FormShipper';
import ScanShipper from './components/Shipper/ScanShipper';
import ShipmentListForShipper from './components/Shipper/ShipmentListForShipper';

import First from './components/First';
import LoadingScreen from './components/LoadingScreen';

export const AppStack = createStackNavigator({
    First, 
    Main,
    LoadingScreen,
    Login,
    Scan,
    Home,
    Profile,
    VerifiedProfile,
    ScanResult,
    InputForm,
    Submit,
    ShipmentListForFarmer,
    ShipmentDetail,
    VerifyScan,
    PackageDetailForVerifier,
    VerifyForm,
    MarketScan,
    PackageDetailForMarket,
    VerifyFormMarket,
    FormShipper,
    ScanShipper,
    ShipmentListForVerifier,
    ShipmentListForShipper,
    ShipmentListForRetailer
}, {
        initialRouteName: 'LoadingScreen',
        navigationOptions: { 
            header:null
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 700,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
                useNativeDriver: true,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps
                const thisSceneIndex = scene.index
                const width = layout.initWidth

                const translateX = position.interpolate({
                    inputRange: [thisSceneIndex - 1, thisSceneIndex],
                    outputRange: [width, 0],
                })

                return { transform: [{ translateX }] }
            }
        })
    })