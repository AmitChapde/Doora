import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
} from "../ui/sidebar";
import { useSidebar } from "../ui/sidebar";
import WorkspaceSwitcher from "../WorkspaceSwitcher/WorkspaceSwitcher";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/store";


function SideBar() {
  const { workspaces, activeWorkspaceId } = useAppSelector(
    (state: RootState) => state.workspace,
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <WorkspaceSwitcher
          selectedWorkspace={activeWorkspaceId}
          workspaces={workspaces}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default SideBar;
