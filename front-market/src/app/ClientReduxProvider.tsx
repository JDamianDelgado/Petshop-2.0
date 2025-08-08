"use client";

import { Provider } from "react-redux";
import { store } from "../app/store";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
