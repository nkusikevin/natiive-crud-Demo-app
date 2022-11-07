import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotes = createAsyncThunk("users/fetchNote", async () => {
	const response = await axios.get("http://localhost:8000/notes");
	return response;
});
//createNote
export const createNote = createAsyncThunk("notes/createNote", async (note) => {
	const response = await axios.post("http://localhost:8000/notes", note);
	return response;
});

//updateNote
export const updateNote = createAsyncThunk("notes/updateNote", async (note) => {
	const response = await fetch(`http://localhost:8000/notes/${note.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(note),
	});
	return (await response.json()).data;
});

//deleteNote
export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
	const response = await fetch(`http://localhost:8000/notes/${id}`, {
		method: "DELETE",
	});
	return (await response.json()).data;
});

export const noteSlice = createSlice({
	name: "notes",
	initialState: {
		notes_list: [],
		loading: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchNotes.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchNotes.fulfilled, (state, action) => {
			state.notes_list = action.payload;
			state.loading = false;
		});
		builder.addCase(fetchNotes.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(createNote.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(createNote.fulfilled, (state, action) => {
			state.notes_list = [...state.notes_list, action.payload];
			state.loading = false;
		});
		builder.addCase(createNote.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(updateNote.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateNote.fulfilled, (state, action) => {
			const index = state.notes_list.findIndex(
				(note) => note.id === action.payload.id
			);
			state.notes_list[index] = action.payload;
			state.loading = false;
		});
		builder.addCase(updateNote.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(deleteNote.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteNote.fulfilled, (state, action) => {
			state.notes_list = state.notes_list.filter(
				(note) => note.id !== action.payload.id
			);
			state.loading = false;
		});
		builder.addCase(deleteNote.rejected, (state) => {
			state.loading = false;
		});
	},
});

export const selectNotes = (state) => state.notes_list;

export default noteSlice.reducer;
