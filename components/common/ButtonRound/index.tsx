
import { RoundedButtonSize } from '@/types/button';
import { MdShare, MdPlayArrow, MdPause, MdStop } from 'react-icons/md';

type ButtonRoundProps = {
    icon: string,
    onClick: () => void,
    className?: string,
    type: RoundedButtonSize,
    dark: boolean,
}

const ButtonRound = (props: ButtonRoundProps) => {
    const { icon, onClick, className, type, dark } = props;

    const styles = {
        small: 'w-8 h-8',
        medium: 'w-16 h-16',
        large: 'w-24 h-24',
    }

    const darkStyles = {
        dark: 'bg-primary text-white',
        light: 'bg-white text-gray-800',
    }

    const iconSize = {
        large: 40,
        medium: 20,
        small: 10,
    }

    return (
        <button
            className={`rounded-full flex items-center justify-center ${styles[type]} ${dark ? darkStyles.dark : darkStyles.light} ${className}`}
            onClick={onClick}
        >
            {getIcon(icon, iconSize[type])}
        </button>
    )

}

const getIcon = (type: string, size: number ) => {
    switch (type) {
        case 'share':
            return <MdShare size={size} />
        case 'play':
            return <MdPlayArrow size={size} />
        case 'pause':
            return <MdPause size={size} />
        case 'stop':
            return <MdStop size={size} />
        default:
            return null;
    }

}

export default ButtonRound;