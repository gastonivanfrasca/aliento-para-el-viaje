
type AudioDescriptionProps = {
    title: string,
    date: string,
}

const AudioDescription = (props: AudioDescriptionProps) => {
    const { title, date } = props;
    return (
        <div className="flex flex-col h-full max-w-md m-auto md:justify-center">
            <div>
                <p className="mb-2 text-xl">Título</p>
                <h1 className="text-6xl font-bold text-primary">{title}</h1>
                <p className="text-2xl  text-primary mt-10">{convertGMTStringToDate(date)}</p>
            </div>
        </div>
    )
}


const convertGMTStringToDate = (gmtString: string): string => {
    try {
        const date = new Date(gmtString);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error('Error al convertir la fecha:', error);
        return '';
    }
}

export default AudioDescription;