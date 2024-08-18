
"use client"

type SharerProps = {
    url: string
    title: string
    date: string
}

const Sharer = (props: SharerProps) => {
    const { url, title, date } = props


    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
            <h1 className="text-3xl">{title}</h1>
            <h2 className="text-2xl">{formatDate(date)}</h2>
            <a className="p-8 rounded-lg bg-primaryLight text-white shadow-md text-2xl font-bold hover:bg-primary" href={url} download={title}>Descargar Audio</a>
        </div>
    )
}


function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}

export default Sharer