
import { Camera } from '@capacitor/camera';
import { LocalNotifications } from '@capacitor/local-notifications';

// Función para comprobar si se está ejecutando en una plataforma nativa
export const isNativePlatform = (): boolean => {
  return window.Capacitor && window.Capacitor.isNativePlatform();
};

// Solicitar permisos de cámara
export const requestCameraPermissions = async (): Promise<boolean> => {
  if (!isNativePlatform()) return true;
  
  try {
    const permissionStatus = await Camera.checkPermissions();
    
    if (permissionStatus.camera !== 'granted') {
      const requestResult = await Camera.requestPermissions();
      return requestResult.camera === 'granted';
    }
    
    return true;
  } catch {
    // Permission denied or error - return false silently
    return false;
  }
};

// Solicitar permisos de notificaciones
export const requestNotificationPermissions = async (): Promise<boolean> => {
  if (!isNativePlatform()) return true;
  
  try {
    const permissionStatus = await LocalNotifications.checkPermissions();
    
    if (permissionStatus.display !== 'granted') {
      const requestResult = await LocalNotifications.requestPermissions();
      return requestResult.display === 'granted';
    }
    
    return true;
  } catch {
    // Permission denied or error - return false silently
    return false;
  }
};

// Solicitar todos los permisos necesarios
export const requestAllPermissions = async (): Promise<void> => {
  if (!isNativePlatform()) return;
  
  await Promise.all([
    requestCameraPermissions(),
    requestNotificationPermissions()
  ]);
};
