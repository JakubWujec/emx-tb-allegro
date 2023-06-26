export const MinMaxDescription = ({
  minValue,
  maxValue,
}: {
  minValue: number;
  maxValue: number;
}) => {
  return (
    <div className="flex flex-column justify-between">
      <span className="text-slate-400 text-xs">
        Minimalna wartość: {minValue}
      </span>
      <span className="text-slate-400 text-xs">
        Maksymalna wartość: {maxValue}
      </span>
    </div>
  );
};
