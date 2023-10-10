
import { createSlice } from "@reduxjs/toolkit";
import { turfs } from './turfThunk';

const initialState = {
    turfs: [],
    loading: false,
    error: null
}

const vendorTurfsSlice = createSlice({
    name: 'vendorTurfs',
    initialState,
    reducers: {
        updateTurfIsBlocked: (state, action) => {
            const { id } = action.payload;
            const turfToUpdate = state.turfs.find(turf => turf._id === id);
            if (turfToUpdate) {
                console.log(turfToUpdate+"updateddddd");
                turfToUpdate.vendorIsBlocked = !turfToUpdate.vendorIsBlocked;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(turfs.pending, (state) => {
            console.log('Fetching turfs...');
            state.loading = true;
            state.error = null;
        });
        builder.addCase(turfs.fulfilled, (state, action) => {
            console.log('Fetched turfs:', action.payload);
            state.loading = false;
            state.turfs = action.payload;
        });
        builder.addCase(turfs.rejected, (state, action) => {
            console.log('Fetch turfs error:', action.error);
            state.loading = false;
            state.error = action.error.message;
        });

    }
})

export const { updateTurfIsBlocked } = vendorTurfsSlice.actions;

export default vendorTurfsSlice.reducer;