import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//get single note
const url = "http://192.168.1.73:8000/notes";

export const getSingleNote = createAsyncThunk(
	"notes/getSingleNote",
	async (id) => {
		const response = await axios.get(`${url}/${id}`);
		return response.data;
	}
);

export const fetchNotes = createAsyncThunk("users/fetchNote", async () => {
	const response = await axios.get(`${url}`);
	return response.data;
});
//createNote
export const createNote = createAsyncThunk("notes/createNote", async (note) => {
	const response = await axios.post(`${url}`, note);
	return response.data;
});

//updateNote
export const updateNote = createAsyncThunk("notes/updateNote", async (note) => {
	const response = await axios.put(`${url}/${note.id}`, note);
	return response.data;
});

//deleteNote
export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
	const response = await axios.delete(`${url}/${id}`);
	return response.data;
});

export const noteSlice = createSlice({
	name: "noteSlice",
	initialState: {
		notes_list: [],
		note: {},
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

		builder.addCase(getSingleNote.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getSingleNote.fulfilled, (state, action) => {
			state.note = action.payload;
			state.loading = false;
		});
		builder.addCase(getSingleNote.rejected, (state) => {
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
		builder.addCase(updateNote.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(updateNote.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(deleteNote.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteNote.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(deleteNote.rejected, (state) => {
			state.loading = false;
		});
	},
});

// export const selectNotes = (state) => state.notes_list;

export default noteSlice.reducer;
