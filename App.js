import ParameterEnter from "./screens/ParameterEnter";
import ResultView from "./screens/ResultView";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {createStackNavigator}  from 'react-navigation-stack';
const navigator = createStackNavigator(
  {
    Giriş: ParameterEnter,
    Sonuç: ResultView,
  },
  {
    initialRouteName: "Giriş",
    
  }
);
export default createAppContainer(navigator);