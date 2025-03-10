import { useEffect, useState } from "react";
import Roulette from "@/components/Roulette";
import { useEntranceAnimation } from "@/lib/animations";

const Index = () => {
  const headerVisible = useEntranceAnimation(300);
  const contentVisible = useEntranceAnimation(600);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center px-4 py-10 landscape:rotate-0 portrait:rotate-90 portrait:h-screen portrait:w-screen portrait:origin-top-left portrait:translate-y-full">
      {/* Efectos de gradiente y luz */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-indigo-900/10 pointer-events-none z-0"></div>
      
      {/* Efectos de luz */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-light pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl animate-pulse-light pointer-events-none"></div>
      
      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <header className={`text-center mb-12 transition-all duration-1000 ${headerVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Predictor de Ruleta</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Sistema avanzado de predicción basado en patrones estadísticos. Haga clic en los números para registrar los resultados y ver las predicciones.
          </p>
        </header>
        
        <main className={`transition-all duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0 transform translate-y-10'}`}>
          <Roulette />
        </main>
        
        <footer className="text-center mt-16 text-sm text-gray-400">
          <p>Diseñado con principios minimalistas | Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
