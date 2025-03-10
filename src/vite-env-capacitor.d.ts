
/// <reference types="@capacitor/core" />

interface Window {
  Capacitor?: {
    isNativePlatform: () => boolean;
    getPlatform: () => string;
  };
}
