import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Note from "../components/Note";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../redux/noteSlice";

export default function Home({ navigation }) {
	let notes = [];
	const dispatch = useDispatch();

	const not = useSelector((state) => state.notes.notes_list);

	useEffect(() => {
		async function fetchData() {
			await dispatch(fetchNotes());
		}
		fetchData();
		//clean up function
		// return () => {
		// 	console.log("home This will be logged on unmount");
		// };
	}, [not]);

	if (not.length > 0) {
		notes = not;
	}
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 20,
				}}>
				<Text style={{ fontSize: 24, color: "#000" }}>Notes</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("AddNote");
					}}>
					<View style={styles.iconContainer}>
						<Icon name='add' size={28} color={"#fff"} />
					</View>
				</TouchableOpacity>
			</View>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={notes}
				renderItem={({ item }) => <Note note={item} navigation={navigation} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
		backgroundColor: "#98ab6c87",
		paddingHorizontal: 20,
	},
	iconContainer: {
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 7,
		elevation: 2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
		overflow: "hidden",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 20,
		padding: 10,
		borderRadius: 8,
		elevation: 2,
		backgroundColor: "#fff",
	},
	input: {
		width: "90%",
		fontSize: 14,
		marginHorizontal: 6,
		color: "grey",
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: "#e5e2e2",
		borderRadius: 6,
	},
});
