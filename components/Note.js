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
					justifyContent: "center",
				}}>
				<Text
					style={{
						color: "black",
						fontSize: 16,
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
		position: "relative",
		marginTop: 10,
		paddingHorizontal: 4,
		paddingVertical: 10,
		elevation: 6,
		borderRadius: 5,
		flex: 1,
		overflow: "hidden",
		height: 100,
		"&::before": {
			content: `''`,
			position: "absolute",
			left: "-50px",
			top: "50px",
			width: "0",
			height: "0",
			border: "50px solid green",
			borderTopColor: "red",
		},
	},
});
