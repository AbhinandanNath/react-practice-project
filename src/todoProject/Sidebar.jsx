import { useDispatch, useSelector } from "react-redux";
import { uiActions,projectActions } from "./store/todoStore";
import { useId, useState } from "react";

export default function SideBar({ isModalOpen ,isEditMode }) {
  const dispatch = useDispatch();

  const projectData = useSelector((state) => state.projectState.projectData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = Object.values(projectData).filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredProjects);

  function addProject() {
    dispatch(uiActions.toggleModal());
  }

  function editProjectDetails(project) {
    dispatch(uiActions.toggleModal());
    dispatch(uiActions.toggleEditMode());
    dispatch(projectActions.setEditProjectdata(project));

  }

  function removeProject (project) {
    dispatch(projectActions.removeProject(project.id));
  }
  return (
    <div id="sideBar">
      <p>Todo List</p>
      <div id="sidebarSearch">
        <button
          className={isModalOpen ? "disableField" : ""}
          onClick={addProject}
        >
          +
        </button>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery} // Controlled input
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>
      <ul id="sideBarTodo">
        {filteredProjects.map((project) => {
          return (
            <div key={project.projectName + useId} className="projectContainer">
             <li >{project.projectName}</li>
              <button className={`deleteButton ${isEditMode ? "disableField" : "" }`} onClick={() => removeProject(project)}>D</button>
              <button className={`deleteButton ${isEditMode ? "disableField" : "" }`} onClick={() => editProjectDetails(project)}>E</button>
            </div>
           
          );
        })}
      </ul>
    </div>
  );
}
