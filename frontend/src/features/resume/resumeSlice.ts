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

export const reuseExistingResume = createAsyncThunk<
    { resumeId: string; interviewId: string },
    string,
    { rejectValue: string }
>('resume/useExisting', async (resumeId, thunkAPI) => {
    try {
        const res = await axiosMainInstance.post('/resume/use-existing', { resumeId });
        const { resumeId: id, interviewId } = res.data;

        localStorage.setItem("resumeId", id);
        localStorage.setItem("interviewId", interviewId);

        return { resumeId: id, interviewId };
    } catch (error) {
        return rejectWithError(error, thunkAPI, "Failed to use existing resume");
    }
});


const initialState: ResumeState = {
    resumes: [],
    isUploadingResume: false,
    isLoadingResumes: false,
    errorMessage: null,
    file: null,
    selectedResumeId: null,
    uploadSuccess: false,
    showPreview: false,
    showJobRoleModal: false,
}

const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<File | null>) => {
            state.file = action.payload;
        },
        removeFile: (state) => {
            state.file = null;
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
        setSelectedResumeId: (state, action: PayloadAction<string | null>) => {
            state.selectedResumeId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //upload resume code
            .addCase(uploadResume.pending, (state) => {
                state.isUploadingResume = true;
                state.errorMessage = null;
            })
            .addCase(uploadResume.fulfilled, (state, action) => {
                const { resume, resumeId, interviewId } = action.payload;

                state.isUploadingResume = false;
                state.uploadSuccess = true;

                const alreadyExists = state.resumes.find(r => r._id === resume._id);
                if (!alreadyExists) {
                    state.resumes.push(resume);
                }

                localStorage.setItem("resumeId", resumeId);
                localStorage.setItem("interviewId", interviewId);
            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.isUploadingResume = false;
                state.errorMessage = action.payload ?? "Something unexpected happened";
            })
            //get uploaded resumes
            .addCase(getAllResumes.pending, (state) => {
                state.isLoadingResumes = true;
                state.errorMessage = null;
            })
            .addCase(getAllResumes.fulfilled, (state, action) => {
                state.isLoadingResumes = false;
                state.resumes = action.payload; // ✅ Replace existing resumes with fetched ones
            })
            .addCase(getAllResumes.rejected, (state, action) => {
                state.isLoadingResumes = false;
                state.errorMessage = action.payload ?? "Failed to fetch resumes";
            })
            .addCase(reuseExistingResume.pending, (state) => {
                state.isUploadingResume = true;
                state.errorMessage = null;
            })
            .addCase(reuseExistingResume.fulfilled, (state) => {
                state.isUploadingResume = false;
                state.uploadSuccess = true;
                state.showJobRoleModal = true;
            })
            .addCase(reuseExistingResume.rejected, (state, action) => {
                state.isUploadingResume = false;
                state.errorMessage = action.payload ?? "Failed to use existing resume";
            })
    }
})

export const { setFile, removeFile, setUploadSuccess, setShowPreview, setShowJobRoleModal, resetResumeState, setSelectedResumeId } = resumeSlice.actions;
export default resumeSlice.reducer;