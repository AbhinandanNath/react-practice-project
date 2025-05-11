import { useDispatch, useSelector } from "react-redux";
import { uiActions, projectActions } from "./store/todoStore";
import { useState } from "react";
import { debounce } from "../hooks/Debounce";

export default function AddProjectDetails({isEditMode}) {
  const dispatch = useDispatch();

  const editProjectData = useSelector(
    (state) => state.projectState.editProjectData
  );
  
  const [projectName, setProjectName] = useState(
    editProjectData.projectName || ""
  );
  const [projectDescription, setProjectDescription] = useState(
    editProjectData.projectDescription || ""
  );
  const [, setErrors] = useState({}); // State for validation errors
  // Close the modal
  const closeProject = () => {
    dispatch(uiActions.toggleModal());
    isEditMode && dispatch(uiActions.toggleEditMode());
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!projectName.trim())
      newErrors.projectName = "Project name is required.";
    if (!projectDescription.trim())
      newErrors.projectDescription = "Project description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const projectData = {
      id: Math.random().toString(6).substr(2, 4), // Generate a random ID
      projectName,
      projectDescription,
    };

    if (isEditMode) {
      projectData.id = editProjectData.id; // Preserve the ID for editing
      dispatch(projectActions.updateProject(projectData)); // Dispatch edit action
    } else {
      dispatch(projectActions.addProject(projectData)); // Dispatch add action
    }

    closeProject();
  };

  // Debounced state update for project name
  const debounceSetProjectData = debounce((value, type) => {
    type == "name" ? setProjectName(value) : setProjectDescription(value), 500;
  });

  return (
    <div id="addProjectContainer">
      <h2>{isEditMode ? "Edit Project" : "Add Project"}</h2>
      <form id="addProjectForm" onSubmit={handleFormSubmit}>
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          placeholder="Enter Project Name .."
          defaultValue={projectName} // Use defaultValue for debounced inputs
          onChange={(e) => debounceSetProjectData(e.target.value, "name")}
        />
        <label htmlFor="projectDescription">Project Description</label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          placeholder="Add Project Description.."
          value={projectDescription} // Controlled input
          onChange={(e) =>
            debounceSetProjectData(e.target.value, "description")
          }
        ></textarea>

        <div id="formButtonContainer">
          <button type="button" onClick={closeProject}>
            Close
          </button>
          <button type="submit">
            {isEditMode ? "Update" : "Add"} Project
          </button>
        </div>
      </form>
    </div>
  );
}
