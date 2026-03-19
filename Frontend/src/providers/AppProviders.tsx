import { Provider } from "react-redux";
import { store } from "../store/store";
import { SidebarProvider } from "../Components/ui/sidebar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "../context/AuthContext";
import type { ReactNode } from "react";

type AppProviderProps={
    children:ReactNode
}

export function AppProviders({children}:AppProviderProps){
    return (
        <Provider store={store}>
            <SidebarProvider>
                <TooltipProvider>
                    <BrowserRouter>
                        <AuthProvider>
                            {children}
                        </AuthProvider>
                    </BrowserRouter>
                </TooltipProvider>
            </SidebarProvider>
        </Provider>
    )
}



