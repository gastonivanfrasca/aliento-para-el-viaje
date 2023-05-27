"use client"

type TimeIndicatorProps = {
    value: string
}


const TimeIndicator = ({ value }: TimeIndicatorProps) => { 
    return (
        <p>{value}</p>
    )
}

export default TimeIndicator