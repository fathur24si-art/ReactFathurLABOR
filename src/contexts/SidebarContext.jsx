import { createContext, useEffect } from "react";

export const SidebarContext = createContext();

export function SidebarProvider({ value, children }) {
  useEffect(() => {
    console.log("SidebarProvider mounted", value);
  }, [value]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}
