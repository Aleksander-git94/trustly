"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ManualInput } from "../lib/types";
import { demoCompanies } from "../lib/demo-data";

export type AppState = {
  manualInput: ManualInput | null;
  selectedCompanyId: string | null;
};

const defaultState: AppState = {
  manualInput: null,
  selectedCompanyId: null
};

type AppStoreContextValue = {
  state: AppState;
  setManualInput: (input: ManualInput | null) => void;
  setSelectedCompanyId: (id: string | null) => void;
  reset: () => void;
};

const AppStoreContext = createContext<AppStoreContextValue | undefined>(undefined);

const STORAGE_KEY = "selskaps-sjekk-state";

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  useEffect(() => {
    const stored = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as AppState;
      setState(parsed);
    } catch (error) {
      console.error("Kunne ikke lese lokal lagring", error);
    }
  }, []);

  useEffect(() => {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AppStoreContextValue>(
    () => ({
      state,
      setManualInput: (input) => setState((prev) => ({ ...prev, manualInput: input })),
      setSelectedCompanyId: (id) =>
        setState((prev) => ({ ...prev, selectedCompanyId: id })),
      reset: () => setState(defaultState)
    }),
    [state]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore må brukes innenfor AppStoreProvider");
  }
  return context;
}

export function useSelectedCompany() {
  const { state } = useAppStore();
  return demoCompanies.find((company) => company.id === state.selectedCompanyId) ?? null;
}
