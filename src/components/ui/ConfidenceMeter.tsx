interface ConfidenceMeterProps {
  score: number;
  showLabel?: boolean;
}

export const ConfidenceMeter = ({ score, showLabel = true }: ConfidenceMeterProps) => {
  const color = score >= 90 ? 'bg-green-500' : score >= 75 ? 'bg-orange-400' : 'bg-red-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
      {showLabel && <span className="text-xs font-semibold text-gray-600 w-10 text-right">{score}%</span>}
    </div>
  );
};
