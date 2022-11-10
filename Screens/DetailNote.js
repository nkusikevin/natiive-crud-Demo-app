import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TextInput,
	TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import Delete from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { getSingleNote, deleteNote, updateNote } from "../redux/noteSlice";

const DetailNote = ({ route, navigation }) => {
	const id = route.params.id;
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [textValidated, setTextValidated] = useState(false);
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const not = useSelector((state) => state.notes.note);

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
		async function updateData(title, content) {
			await dispatch(updateNote({ id, title, content }));
		}

		if (Object.keys(error).length === 0 && textValidated) {
			updateData(title, content);
			Toast.show({
				type: "success",
				text1: "Your note has been updated 👋",
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

	useEffect(() => {
		async function fetchData(id) {
			await dispatch(getSingleNote(id));
		}
		fetchData(id);
		return () => {
			console.log("This will be logged on unmount");
		};
	}, []);

	useEffect(() => {
		setTitle(not.title);
		setContent(not.content);
		return () => {
			console.log("This will be logged on unmount");
		};
	}, [not]);

	const handleUpdate = () => {
		uploadNotes();
	};

	const deleteNoteHandler = async () => {
		dispatch(deleteNote(id));
		Toast.show({
			type: "success",
			text1: "Your note has been deleted 👋",
		});
		setTimeout(() => {
			navigation.goBack();
		}, 2000);
	};
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}></View>
			<View style={{ marginTop: 20 }}>
				<View style={styles.formContainer}>
					<View style={{ marginBottom: 20 }}>
						<View
							style={{
								...styles.inputContainer,
								borderWidth: error.title ? 1 : 0,
							}}>
							<Text style={styles.label}>Title</Text>
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
							<Text style={styles.label}>Content</Text>
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

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Pressable
						onPress={() => {
							handleUpdate();
						}}>
						<View style={styles.iconContainer}>
							<Icon name='create' size={24} color={"#fff"} />

							<Text style={{ color: "#fff" }}>Update</Text>
						</View>
					</Pressable>
					<Pressable onPress={deleteNoteHandler}>
						<View style={styles.iconContainer}>
							<Delete name='delete' size={24} color={"#fff"} />
							<Text style={{ color: "#fff" }}>Delete</Text>
						</View>
					</Pressable>
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
	label: {
		fontSize: 16,

		color: "#000",
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
});
