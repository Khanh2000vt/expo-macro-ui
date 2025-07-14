import * as React from "react";
import { LoadingHandlerRef } from "../../types";

const globalLoadingRef = React.createRef<LoadingHandlerRef>();

function loading() {
  globalLoadingRef.current?.loading();
}

function overlay() {
  globalLoadingRef.current?.overlay();
}

function disable() {
  globalLoadingRef.current?.disable();
}

function hide() {
  globalLoadingRef.current?.hide();
}

export const GlobalService = {
  loading,
  overlay,
  disable,
  hide,
  globalLoadingRef,
};
