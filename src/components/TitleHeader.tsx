export const TitleHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center font-bold text-2xl mb-4 text-primary">
      {title}
    </div>
  );
};
