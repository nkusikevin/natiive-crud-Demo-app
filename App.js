import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Detail from "./Screens/DetailNote";
import AddNote from "./Screens/AddNote";
// redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";

const store = configureStore({
	reducer: rootReducer,
});

export default function App() {
	const Stack = createNativeStackNavigator();
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={Home}
						options={{ title: "Welcome to Notes App" }}
					/>
					<Stack.Screen name='AddNote' component={AddNote} />
					<Stack.Screen name='DetailNote' component={Detail} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
