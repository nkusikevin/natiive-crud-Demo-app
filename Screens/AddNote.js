import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { createNote } from "../redux/noteSlice";

const AddNote = ({ navigation }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [textValidated, setTextValidated] = useState(false);
	const [error, setError] = useState("");
	const uploadNotes = async () => {
		const textError = checkValidation(title, content);
		setError(textError);
		setTextValidated(true);
	};
	const checkValidation = (title, content) => {
		const error = {};
		if (title === "") {
			error.title = "Please  enter title";
		}
		if (content === "") {
			error.content = "Please  enter content";
		} else if (content.length < 10) {
			error.content = "content sholud be greater then 10 words lettters";
		}

		return error;
	};

	useEffect(() => {
		async function createData(title, content) {
			await dispatch(createNote({ title, content }));
		}

		if (Object.keys(error).length === 0 && textValidated) {
			createData(title, content);
			Toast.show({
				type: "success",
				text1: "Your note has been created 👋",
			});
			setTimeout(() => {
				navigation.goBack();
			}, 2000);
		}
		return () => {
			clearTimeout();
			console.log("add This will be logged on unmount");
		};
	}, [error, textValidated]);

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Text
					style={{
						textAlign: "center",

						fontSize: 18,
						flex: 1,
					}}>
					Add A New Note
				</Text>
			</View>

			<View style={styles.formContainer}>
				<View style={{ marginBottom: 20 }}>
					<View
						style={{
							...styles.inputContainer,
							borderWidth: error.title ? 1 : 0,
						}}>
						<TextInput
							value={title}
							onChangeText={(e) => setTitle(e)}
							multiline={true}
							onKeyPress={() => setError({ ...error, title: null })}
							placeholder='Enter Your Note Title'
							style={styles.input}
						/>
					</View>
					{error.title && <Text style={styles.error}>{error.title}</Text>}
				</View>
				<View style={{ marginBottom: 20 }}>
					<View
						style={{
							...styles.inputContainer,
							borderWidth: error.content ? 1 : 0,
						}}>
						<TextInput
							value={content}
							onChangeText={(e) => setContent(e)}
							on
							multiline={true}
							onKeyPress={() => setError({ ...error, content: null })}
							placeholder='Enter Your Note content'
							style={styles.input}
						/>
					</View>
					{error.content && <Text style={styles.error}>{error.content}</Text>}
				</View>
				<TouchableOpacity style={styles.btn} onPress={uploadNotes}>
					<Text style={{ color: "#fff", fontSize: 16 }}>Upload</Text>
				</TouchableOpacity>
			</View>
			<Toast />
		</View>
	);
};

export default AddNote;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
		backgroundColor: "#fff",
		paddingHorizontal: 20,
	},
	formContainer: {
		width: "100%",
		marginVertical: 40,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 8,
		borderRadius: 8,
		elevation: 4,
		backgroundColor: "#fff",
		overflow: "hidden",
		// marginBottom: 20,
		borderColor: "red",
	},
	input: {
		width: "100%",
		fontSize: 14,
		marginHorizontal: 6,
		color: "grey",
		paddingHorizontal: 10,
		paddingVertical: 7,
		backgroundColor: "#e5e2e2",
		borderRadius: 6,
		outline: "none",
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

	btn: {
		backgroundColor: "#00887e",
		paddingVertical: 15,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
	},
	colorBox: {
		height: 50,
		width: 50,
		marginHorizontal: 5,
		borderRadius: 4,
		overflow: "hidden",
		borderColor: "grey",
	},
	error: {
		fontSize: 12,
		color: "red",
	},
});
