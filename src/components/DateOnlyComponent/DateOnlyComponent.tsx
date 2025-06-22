type DateOnlyProps = {
    isoDateTime: string;
};

export default function DateOnly({ isoDateTime }: DateOnlyProps) {
    const formatDate = (iso: string): string => {
        const date = new Date(iso);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}.${month}.${year}`;
    };

    return <>{formatDate(isoDateTime)}</>;
}
