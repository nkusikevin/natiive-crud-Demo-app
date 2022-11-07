import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Note = ({ note, navigation }) => {
	return (
		<TouchableOpacity
			style={styles.note}
			onPress={() => navigation.navigate("DetailNote", { id: note._id })}>
			<View
				style={{
					flex: 1,
					paddingHorizontal: "10",
					paddingVertical: "5",
					height: "100%",
				}}>
				<Text
					style={{
						color: "black",
						fontSize: 16,
						fontFamily: "Semibold",
						fontWeight: "bold",
					}}
					numberOfLines={1}>
					{note.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Note;

const styles = StyleSheet.create({
	note: {
		backgroundColor: "#a79ea0b3",
		margin: 5,
		height: 110,
		paddingHorizontal: 4,
		paddingVertical: 2,
		elevation: 6,
		borderRadius: 5,
		flex: 1,
		overflow: "hidden",
	},
});
