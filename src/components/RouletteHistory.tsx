
interface RouletteHistoryProps {
  history: number[];
}

const RouletteHistory = ({ history }: RouletteHistoryProps) => {
  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl font-semibold mb-4 text-white/90">Historial</h2>
      <div className="flex flex-wrap gap-2">
        {history.length > 0 ? (
          history.map((num, index) => (
            <div 
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                num === 0 
                  ? 'bg-roulette-green' 
                  : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)
                    ? 'bg-roulette-red' 
                    : 'bg-roulette-black'
              }`}
            >
              {num}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Aún no hay números registrados</p>
        )}
      </div>
    </div>
  );
};

export default RouletteHistory;
