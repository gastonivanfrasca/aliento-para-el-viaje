const LinkButtonType = "link";
const DefaultButtonType = "default";
const DestructiveButtonType = "destructive";
const OutlineButtonType = "outline";
const SecondaryButtonType = "secondary";
const GhostButtonType = "ghost";
const NullButtonType = null;
const UndefinedButtonType = undefined;

export type ShadButtonType = typeof LinkButtonType | typeof DefaultButtonType | typeof DestructiveButtonType | typeof OutlineButtonType | typeof SecondaryButtonType | typeof GhostButtonType | typeof NullButtonType | typeof UndefinedButtonType;
export enum ShadButtonTypes {
    link = LinkButtonType,
    default = DefaultButtonType,
    destructive = DestructiveButtonType,
    outline = OutlineButtonType,
    secondary = SecondaryButtonType,
    ghost = GhostButtonType,
}

export type RoundedButtonSize = "small" | "medium" | "large";
export enum RoundedButtonSizes {
    small = "small",
    medium = "medium",
    large = "large",
}