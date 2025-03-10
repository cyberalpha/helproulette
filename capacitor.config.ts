
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f177f8a00045476dbad6ffe320ee0786',
  appName: 'roulette-lightshow',
  webDir: 'dist',
  server: {
    url: 'https://f177f8a0-0045-476d-bad6-ffe320ee0786.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
    CapacitorHttp: {
      enabled: true
    }
  },
  android: {
    backgroundColor: "#121212",
    screenOrientation: "landscape"
  }
};

export default config;
