import { cn } from '@/lib/utils';

export type TimeRange = '7d' | '30d' | '90d' | '1y';

interface TimeFilterProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const TimeFilter = ({ value, onChange }: TimeFilterProps) => {
  const ranges: TimeRange[] = ['7d', '30d', '90d', '1y'];

  return (
    <div className="flex items-center bg-card border border-border rounded-md overflow-hidden">
      {ranges.map(range => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium transition-all",
            value === range
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {range}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
