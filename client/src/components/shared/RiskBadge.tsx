import { cn } from '@/lib/utils';
import { getRiskLevel } from '@/data/cities';

interface RiskBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const RiskBadge = ({ score, size = 'md', showLabel = true }: RiskBadgeProps) => {
  const level = getRiskLevel(score);
  
  const labels: Record<string, string> = {
    critical: 'CRITICAL',
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-bold border",
        `risk-${level}`,
        sizeClasses[size]
      )}
    >
      {score}
      {showLabel && <span>/{labels[level]}</span>}
    </span>
  );
};

export default RiskBadge;
