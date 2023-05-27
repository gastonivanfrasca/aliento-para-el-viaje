const numToMinSec = (num: number): string => {
    const minutes = Math.floor(num / 60);
    const seconds = Math.floor(num % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
}

export default numToMinSec;