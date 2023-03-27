/* eslint-disable prettier/prettier */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";

// no Auth
import LoginScreen from "../Screens/Authentication/LoginScreen";
import SignUpScreen1 from "../Screens/Authentication/SignUpScreen1";
import ForgotPasswordScreen from "../Screens/Authentication/ForgotPasswordScreen";

// Auth
import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import EditProfileScreen from "../Screens/Profile/EditProfileScreen";
import PlayGameScreen from "../Screens/Game/PlayGameScreen";
import GameScreen from "../Screens/Game/GameScreen";
import ScratchCardScreen from "../Screens/ScratchCard/ScratchCardScreen";
import DataPrivacityScreen from "../Screens/Profile/DataPrivacityScreen";
import PaymentHistoricsScreen from "../Screens/Profile/PaymentHistoricsScreen";
import HelpScreen from "../Screens/Profile/HelpScreen";
import ChainSimulatorSreen from "../Screens/ChainSimulator/ChainSimulatorScreen";
import TopRankingScreen from "../Screens/Ranking/TopRankingScreen";
import AddScreen from "../Screens/Game/AddScreen";
import { Congratulations } from "../Screens/Reward/Congratulations";
import { Lose } from "../Screens/Reward/Lose";

// Context
import { AuthenticationContext } from "../Context/AuthenticationContextProvider";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { state } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {state.userToken == null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp1" component={SignUpScreen1} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        ) : (
          // User is signed in
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="PlayGame" component={PlayGameScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen
              name="ScratchCardScreen"
              component={ScratchCardScreen}
            />
            <Stack.Screen name="DataPrivacy" component={DataPrivacityScreen} />
            <Stack.Screen
              name="PaymentHistorics"
              component={PaymentHistoricsScreen}
            />
            <Stack.Screen name="Help" component={HelpScreen} />

            <Stack.Screen
              name="ChainSimulator"
              component={ChainSimulatorSreen}
            />

            <Stack.Screen name="TopRanking" component={TopRankingScreen} />

            <Stack.Screen name="Add" component={AddScreen} />

            <Stack.Screen name="Congratulations" component={Congratulations} />

            <Stack.Screen name="Lose" component={Lose} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
