import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Resume, ResumeState, ResumeUpload, ResumeUploadResponse } from "./resume.types";
import { rejectWithError } from "@/utils/errorHandling";
import { axiosMainInstance } from "@/utils/tokenGeneration";

export const uploadResume = createAsyncThunk<
    ResumeUploadResponse,
    ResumeUpload,
    { rejectValue: string }
>('resume/upload', async (data, thunkAPI) => {
    const formdata = new FormData();
    formdata.append("resume", data.file);
    try {
        const res = await axiosMainInstance.post("/resume/upload", formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Resume Upload Failed");
    }
});

export const getAllResumes = createAsyncThunk<
    Resume[],
    void,
    { rejectValue: string }
>('load/resumes', async (_, thunkAPI) => {
    try {
        const res = await axiosMainInstance.get('/resume/user');
        return res.data;
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Error loading resumes")
    }
})

const initialState: ResumeState = {
    resumes: [],
    loading: false,
    errorMessage: null,
    file: null,
    resumeText: '',
    uploadSuccess: false,
    showPreview: false,
    showJobRoleModal: false,
    resumeId: '',
}

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        setResumeId: (state, action) => {
            state.resumeId = action.payload;
        },
        setFile: (state, action: PayloadAction<File | null>) => {
            state.file = action.payload;
        },
        removeFile: (state) => {
            state.file = null;
        },
        setResumeText: (state, action: PayloadAction<string>) => {
            state.resumeText = action.payload;
        },
        setUploadSuccess: (state, action: PayloadAction<boolean>) => {
            state.uploadSuccess = action.payload;
        },
        setShowPreview: (state, action: PayloadAction<boolean>) => {
            state.showPreview = action.payload;
        },
        setShowJobRoleModal: (state, action: PayloadAction<boolean>) => {
            state.showJobRoleModal = action.payload;
        },
        resetResumeState: (state) => {
            const preservedResumes = state.resumes;
            return {
                ...initialState,
                resumes: preservedResumes,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            //upload resume code
            .addCase(uploadResume.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(uploadResume.fulfilled, (state, action) => {
                const { resume, resumeId, extractedText } = action.payload;

                state.loading = false;
                state.uploadSuccess = true;
                state.resumeText = extractedText;
                state.resumeId = resumeId;
                state.resumes.push(resume); // ✅ push into array
            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
            //get uploaded resumes
            .addCase(getAllResumes.pending, (state) => {
                state.loading = true;
                state.errorMessage = null;
            })
            .addCase(getAllResumes.fulfilled, (state, action) => {
                state.loading = false;
                state.resumes = action.payload; // ✅ Replace existing resumes with fetched ones
            })
            .addCase(getAllResumes.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload ?? "Failed to fetch resumes";
            });
    }
})

export const { setFile, removeFile, setResumeText, setUploadSuccess, setShowPreview, setShowJobRoleModal, setResumeId, resetResumeState } = resumeSlice.actions;
export default resumeSlice.reducer;