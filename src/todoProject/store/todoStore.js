import { createSlice,configureStore } from "@reduxjs/toolkit"; 


const projectDataInitialState = {
    editProjectData :{},
    projectData: [],
}

   

const uiSlice = createSlice({
    name: "uiSlice",
    initialState: { showModal: false, isEditMode : false},
    reducers: {
        toggleModal(state) {
            state.showModal = !state.showModal;
        },
        toggleEditMode(state) {
            state.isEditMode = !state.isEditMode;
        },
    },
})

const projectSlice = createSlice({
    name: 'projectDetails',
    initialState: projectDataInitialState,
    reducers: {
        addProject(state, action) {
            state.projectData.push(action.payload);
        },
        setEditProjectdata(state, action) {
            state.editProjectData = action.payload;
        },
        removeProject(state, action) {
            const projectId = action.payload;
            if (projectId !== undefined && projectId !== null) {
                state.projectData = state.projectData.filter(
                    (project) => project.id !== projectId
                );
            }
        },
        updateProject(state,action) {
            const { id, projectName, projectDescription } = action.payload;
            const existingProject = state.projectData.find(
                (project) => project.id === id
            );
            if (existingProject) {
                existingProject.projectDescription = projectDescription;
                existingProject.projectName = projectName;
            }
            
            state.editProjectData = {}; // Clear editProjectData after updating
        }
    }
})

export const uiActions = uiSlice.actions;
export const projectActions = projectSlice.actions;

const todoStore = configureStore({
    reducer: { uiState: uiSlice.reducer, projectState : projectSlice.reducer },
})
export default todoStore;