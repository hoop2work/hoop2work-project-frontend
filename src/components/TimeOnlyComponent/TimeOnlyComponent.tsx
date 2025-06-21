type TimeOnlyProps = {
  isoDateTime: string;
};

export default function TimeOnly({ isoDateTime }: TimeOnlyProps) {
  const formatTime = (iso: string): string => {
    const date = new Date(iso);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return <>{formatTime(isoDateTime)}</>;
}
