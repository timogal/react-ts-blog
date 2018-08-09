import * as React from "react";
import { Store } from "redux";
import { match as matchType } from "react-router";

interface StoreExt {
  runSaga: (...args: any[]) => any
}

export type EnhancedStore = Store & StoreExt;

export type LoadData = (store: EnhancedStore, match: matchType<any>) => Promise<any>;

export interface SsrRoute {
  path: string
  component: React.ComponentType<any>
  loadData?: LoadData,
  exact?: boolean
}




