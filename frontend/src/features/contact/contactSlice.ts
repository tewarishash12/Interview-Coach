import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ContactRequest, InitialContactState } from "./contact.types";
import { axiosMainInstance } from "@/utils/tokenGeneration";
import { rejectWithError } from "@/utils/errorHandling";

export const sendFeedback = createAsyncThunk<
    void,
    ContactRequest,
    { rejectValue: string }
>("contact/sendFeedback", async ({ subject, content, attachments }, thunkAPI) => {
    try {
        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("content", content);

        if (attachments) {
            Array.from(attachments).forEach((file) => {
                formData.append("attachments", file);
            });
        }

        await axiosMainInstance.post("/contact/feedback", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Failed to send Feedback")
    }
});

const initialState: InitialContactState = {
    isSendingResponse: false,
    errorMessage: null,
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendFeedback.pending, (state) => {
                state.isSendingResponse = true;
                state.errorMessage = null;
            })
            .addCase(sendFeedback.fulfilled, (state) => {
                state.isSendingResponse = false;
                state.errorMessage = null;
            })
            .addCase(sendFeedback.rejected, (state, action) => {
                state.isSendingResponse = true;
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
    },
})

export default contactSlice.reducer;