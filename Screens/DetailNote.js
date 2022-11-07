import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import Delete from "react-native-vector-icons/AntDesign";
// import { deleteNote } from "../db/db";

const DetailNote = ({ route, navigation }) => {
	const note = route.params;
	const deleteNoteHandler = async () => {
		// const noteResult = await deleteNote(note.id);
		// if (noteResult.rowsAffected > 0) {
		// 	Toast.show({
		// 		type: "success",
		// 		text1: "Note has been deleted",
		// 	});
		// 	setTimeout(() => {
		// 		navigation.goBack();
		// 	}, 2000);
		// }
	};
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Pressable onPress={() => navigation.navigate("Home")}>
					<View style={styles.iconContainer}>
						<Icon name='arrow-back' size={24} color={"#fff"} />
					</View>
				</Pressable>
				<Pressable onPress={deleteNoteHandler}>
					<View style={{ ...styles.iconContainer, backgroundColor: "#fff" }}>
						<Delete name='delete' size={24} color={"red"} />
					</View>
				</Pressable>
			</View>
			<View style={{ marginTop: 20 }}>
				<View>
					<Text style={{ fontFamily: "Semibold", fontSize: 12 }}>
						Note Title
					</Text>
					<Text style={{ fontSize: 20, fontFamily: "Poppins" }}>
						{note.title}
					</Text>
				</View>
				<View style={{ marginVertical: 20 }}>
					<Text style={{ fontFamily: "Semibold", fontSize: 12 }}>
						Note Description
					</Text>
					<Text style={{ fontSize: 16, fontFamily: "Poppins" }}>
						{note.description}
					</Text>
				</View>
				<View>
					<Text style={{ fontFamily: "Semibold", fontSize: 12 }}>
						Note Background Color
					</Text>
					<View
						style={{ ...styles.noteBackground, backgroundColor: note.color }}
					/>
				</View>
			</View>
			<Toast />
		</View>
	);
};

export default DetailNote;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
	},
	iconContainer: {
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 5,
		elevation: 4,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
		overflow: "hidden",
	},

	noteBackground: {
		backgroundColor: "#FDA3B8",

		height: 120,

		elevation: 6,
		borderRadius: 5,

		overflow: "hidden",
	},
});
