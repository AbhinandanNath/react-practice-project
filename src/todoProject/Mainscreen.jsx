import { useSelector } from "react-redux";
import ContentPanel from "./ContentPanel";
import Header from "./Header";
import SideBar from "./Sidebar";
import "./todo.css";
import AddProjectDetails from "./AddProjectDetails";

export default function Mainscreen() {

  const isModalOpen = useSelector((state) => state.uiState.showModal);
  const isEditMode = useSelector((state) => state.uiState.isEditMode);
  return (
    <div id="mainScreenContainer">
      <Header />
      <div id="dataContainer">
        <SideBar isModalOpen={isModalOpen} isEditMode={isEditMode}/>
        {
          isModalOpen ? <AddProjectDetails isEditMode={isEditMode} /> : <ContentPanel />
        }
      </div>
    </div>
  );
}
