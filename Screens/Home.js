import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TextInput,
	FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Note from "../components/Note";

export default function Home() {
	// const [notes, setNotes] = useState([]);
	const [text, setText] = useState("");
	const notes = [
		{ id: 1, title: "Note 1", content: "Content 1", color: "blue" },
		{ id: 2, title: "Note 2", content: "Content 2", color: "green" },
		{ id: 3, title: "Note 3", content: "Content 3", color: "#FDA3B8" },
		{ id: 4, title: "Note 4", content: "Content 4", color: "yellow" },
		{ id: 5, title: "Note 5", content: "Content 5", color: "red" },
	];
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Text style={{ fontSize: 24, color: "#000", fontFamily: "Semibold" }}>
					Notes
				</Text>
				<Pressable onPress={() => navigation.navigate("AddNote")}>
					<View style={styles.iconContainer}>
						<Icon name='add' size={28} color={"#fff"} />
					</View>
				</Pressable>
			</View>
			<View style={styles.inputContainer}>
				<Icon name='search-outline' size={25} color={"grey"} />
				<TextInput
					value={text}
					onChangeText={(e) => setText(e)}
					style={styles.input}
					placeholder='Search Your Notes'
				/>
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
		backgroundColor: "#fff",
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
