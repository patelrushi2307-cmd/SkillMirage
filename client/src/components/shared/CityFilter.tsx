import { cities } from '@/data/cities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/useLanguage';

interface CityFilterProps {
  value: string;
  onChange: (city: string) => void;
}

const CityFilter = ({ value, onChange }: CityFilterProps) => {
  const { t, lang } = useLanguage();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[160px] h-8 text-xs bg-card border-border">
        <SelectValue placeholder={t("All Cities", "सभी शहर")} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectItem value="all">{t("All Cities", "सभी शहर")}</SelectItem>
        {cities.map(city => (
          <SelectItem key={city.name} value={city.name}>
            {lang === 'hi' ? city.nameHi : city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CityFilter;
