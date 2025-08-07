import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGamePerformance } from "@/hooks/useGamePerformance";
import { PredictionResult } from "@/lib/roulette/types";

interface GameStatsProps {
  history: number[];
  prediction: PredictionResult | null;
}

const GameStats = ({ history, prediction }: GameStatsProps) => {
  const { gameStats, hotNumbers, coldNumbers } = useGamePerformance({ history, prediction });

  if (!history.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Estadísticas del Juego</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Ingrese algunos números para ver las estadísticas</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Estadísticas del Juego</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Estadísticas básicas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-roulette-red">{gameStats.redCount}</div>
            <div className="text-sm text-muted-foreground">Rojos</div>
            <div className="text-xs">({gameStats.redPercentage.toFixed(1)}%)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-roulette-black">{gameStats.blackCount}</div>
            <div className="text-sm text-muted-foreground">Negros</div>
            <div className="text-xs">({gameStats.blackPercentage.toFixed(1)}%)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-roulette-green">{gameStats.greenCount}</div>
            <div className="text-sm text-muted-foreground">Ceros</div>
            <div className="text-xs">({gameStats.greenPercentage.toFixed(1)}%)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{gameStats.totalSpins}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
        </div>

        {/* Números calientes */}
        {hotNumbers.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Números Calientes</h4>
            <div className="flex flex-wrap gap-2">
              {hotNumbers.map(({ number, count }) => (
                <Badge key={number} variant="outline" className="bg-roulette-gold/10">
                  {number} ({count})
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Números fríos */}
        {coldNumbers.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Números Fríos</h4>
            <div className="flex flex-wrap gap-2">
              {coldNumbers.slice(0, 10).map(({ number }) => (
                <Badge key={number} variant="outline" className="bg-muted/50">
                  {number}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameStats;