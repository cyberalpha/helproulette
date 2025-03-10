
import { PredictionResult, processNumber } from "@/lib/rouletteAlgorithm";
import { toast } from "@/components/ui/use-toast";
import { checkWinnings, SelectedOptions } from "./BettingHandler";
import { Camera, CameraResultType } from '@capacitor/camera';
import { LocalNotifications } from '@capacitor/local-notifications';

export interface GameState {
  lastNumber: number | null;
  prediction: PredictionResult | null;
  history: number[];
  animateBoard: boolean;
  selectedOptions: SelectedOptions;
  winnerPhotos: string[];
}

interface GameActions {
  setLastNumber: (num: number | null) => void;
  setPrediction: (pred: PredictionResult | null) => void;
  setHistory: React.Dispatch<React.SetStateAction<number[]>>;
  setAnimateBoard: (animate: boolean) => void;
  setSelectedOptions: (options: SelectedOptions) => void;
  setWinnerPhotos?: React.Dispatch<React.SetStateAction<string[]>>;
}

// Tomar foto del ganador
const takeWinnerPhoto = async (setWinnerPhotos?: React.Dispatch<React.SetStateAction<string[]>>) => {
  if (!setWinnerPhotos) return;
  
  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    
    if (photo.dataUrl) {
      setWinnerPhotos(prev => [...prev, photo.dataUrl]);
    }
  } catch (error) {
    console.error('Error al tomar la foto:', error);
    toast({
      title: "Error al tomar la foto",
      description: "No se pudo capturar la imagen del ganador",
      duration: 3000,
    });
  }
};

// Enviar notificación local
const sendWinNotification = async (winAmount: number) => {
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "¡Felicidades!",
          body: `Has ganado en ${winAmount} apuesta(s)`,
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 1000) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
};

// Procesar número ingresado
export const handleNumberClick = async (
  number: number,
  state: GameState,
  actions: GameActions
) => {
  const { setAnimateBoard, setLastNumber, setHistory, setPrediction, setSelectedOptions, setWinnerPhotos } = actions;
  
  // Animar el tablero
  setAnimateBoard(true);
  setTimeout(() => setAnimateBoard(false), 700);
  
  // Actualizar el estado
  setLastNumber(number);
  setHistory(prev => [...prev, number]);
  
  // Procesar el número con el algoritmo
  const newPrediction = processNumber(number);
  setPrediction(newPrediction);
  
  // Verificar ganancias y capturar foto si hay ganadores
  const winAmount = await checkWinnings(number, state.selectedOptions, setSelectedOptions);
  
  // Si hay ganadores, tomar foto y enviar notificación
  if (winAmount > 0) {
    sendWinNotification(winAmount);
    
    // Solo tomar foto si estamos en un dispositivo (Capacitor está disponible)
    if (window.Capacitor && window.Capacitor.isNativePlatform() && setWinnerPhotos) {
      // Preguntar si quiere tomar foto (usando toast como confirmación temporal)
      toast({
        title: "¡Ganador detectado!",
        description: "Tomando foto del ganador...",
        duration: 3000,
      });
      
      // Esperar un momento antes de tomar la foto
      setTimeout(() => takeWinnerPhoto(setWinnerPhotos), 1500);
    }
  }
  
  // Notificar
  toast({
    title: `Número ${number} ingresado`,
    description: "Predicciones actualizadas",
    duration: 2000,
  });
};
