
interface PredictionSuggestionsProps {
  suggestions: string[];
}

const PredictionSuggestions = ({ suggestions }: PredictionSuggestionsProps) => {
  return (
    <div className="mb-6 p-3 bg-black/20 backdrop-blur-sm rounded-lg">
      <h3 className="text-sm font-medium text-gray-300 mb-2">Sugerencias</h3>
      <ul className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="text-sm text-white/80">{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default PredictionSuggestions;
