import { Switch } from '@/components/ui/switch';

type SwitchWithIconsProps = {
    onCheckedChange: () => void;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    checked: boolean;
    text: string;
}

const SwitchWithIcons = ({ onCheckedChange, leftIcon, rightIcon, checked, text }: SwitchWithIconsProps) => {
    return (
        <div className='flex flex-row gap-2 items-center' >
            {leftIcon}
            <Switch onCheckedChange={() => onCheckedChange()} checked={checked} />
            {rightIcon}
            <p className='text-primary font-bold'>{text}</p>
        </div>
    )
}

export default SwitchWithIcons