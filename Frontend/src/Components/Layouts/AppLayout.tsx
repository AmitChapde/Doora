import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import { useEffect } from "react";
import { fetchAllWorkspaces } from "../../store/features/workspace/workspaceSlice";
import { useAppDispatch } from "../../store/hooks";

function AppLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllWorkspaces());
  }, []);
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
