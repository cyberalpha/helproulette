
interface PredictionStatisticsProps {
  statistics: {
    zeroCount: number;
    plays: number;
    numberOccurrences: number[];
  };
  lastNumber: number | null;
}

const PredictionStatistics = ({ statistics, lastNumber }: PredictionStatisticsProps) => {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-300">Total de jugadas: {statistics.plays}</p>
      {lastNumber !== null && (
        <p className="text-sm text-gray-300">
          Último número: <span className="font-bold">{lastNumber}</span>
        </p>
      )}
    </div>
  );
};

export default PredictionStatistics;
