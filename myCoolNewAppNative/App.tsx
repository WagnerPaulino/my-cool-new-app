import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import customMiddleware from './src/commons/custom-middleware';
import Firebase, { FirebaseContext } from './src/environment/context';
import { ListaDesejos } from './src/models/ListaDesejos';
import { DesejosEdit } from './src/pages/desejos-edit';
import { DesejosList } from './src/pages/desejos-list';
import { LoginComponent } from './src/pages/login.component';
import { listaDesejosEdit, listaDesejosList } from './src/reducers/desejos-reducers';
import { authReducer } from './src/reducers/usuarios-reducers';
import { useDispatch } from "react-redux";
import { logout } from './src/actions/usuario-actions';

class Auth {
  user?: User;
}

class User {
  name?: String
}

const rootReducer = combineReducers({
  listaDesejos: listaDesejosList,
  desejo: listaDesejosEdit,
  auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(customMiddleware))

const navigationRef = React.createRef<NavigationContainerRef>();

const RouterDefinition = () => {

  const Stack = createStackNavigator();
  const [user, setUser] = useState<Auth>(new Auth());
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      let userInfo = await AsyncStorage.getItem('@userInfo');
      if (userInfo !== null || userInfo !== undefined) {
        setUser(JSON.parse(userInfo));
      }
    }
    getUser();
  }, []);

  const ButtomBarRight = () => {
    return (
      <Button onPress={() => { navigationRef.current.navigate("desejo-edit", { listaDesejo: new ListaDesejos() }) }} title="Novo" ></Button>
    );
  }

  const ButtomBarLeft = () => {
    return (
      <Button type="outline" onPress={() => {
        dispatch(logout(() => navigationRef.current?.resetRoot({
          index: 0,
          routes: [{ name: 'login' }],
        })))
      }} icon={
        <Icon
          name="exit-to-app"
          size={20}
        />
      }></Button>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginComponent} options={{ title: 'Login' }} />
        <Stack.Screen name="desejos" component={DesejosList} options={{ title: 'Lista de Desejos', headerRight: ButtomBarRight, headerLeft: ButtomBarLeft }} />
        <Stack.Screen name="desejo-edit" component={DesejosEdit} options={{ title: 'Desejo' }} initialParams={{ listaDesejo: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <RouterDefinition />
      </Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
