import {
  SidebarMenuItem,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronsUpDown, Plus } from "lucide-react";
import type { Workspace } from "../../api/workspace/workspace.types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  generateWorkspace,
  setActiveWorkspace,
} from "../../store/features/workspace/workspaceSlice";
import { useState } from "react";

function WorkspaceSwitcher() {
  const [isClicked, setIsClicked] = useState<boolean>(true);
  const [workspaceName, setWorkspaceName] = useState<string>("");
  const { isMobile } = useSidebar();

  const dispatch = useAppDispatch();
  const workspaces = useAppSelector((state) => state.workspace.workspaces);
  const selectedWorkspace = useAppSelector(
    (state) => state.workspace.activeWorkspaceId,
  );

  const activeWorkspace = workspaces.find((w) => w._id === selectedWorkspace);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(e.target.value);
  };

  const addWorkspace = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (workspaceName.trim()) {
      dispatch(generateWorkspace({ name: workspaceName }));
      setWorkspaceName("");
    }
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"></div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeWorkspace?.name || "Select Workspace"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Workspaces
              </DropdownMenuLabel>
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace._id}
                  onClick={() => dispatch(setActiveWorkspace(workspace._id))}
                  className="gap-2 p-2"
                >
                  {workspace.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 p-2"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="font-medium text-muted-foreground">
                  {isClicked ? (
                    <Input
                      type="text"
                      placeholder="Enter Name"
                      value={workspaceName}
                      onChange={handleChange}
                    />
                  ) : (
                    "Create Workspace"
                  )}
                </div>
                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-full p-0"
                    onClick={addWorkspace}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}

export default WorkspaceSwitcher;
