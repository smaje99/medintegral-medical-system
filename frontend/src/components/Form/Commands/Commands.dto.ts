type CommandAttribute = {
    readonly label: string;
    readonly className?: string;
    readonly disabled?: boolean;
}

export type CommandAttributes = {
    readonly submit: CommandAttribute;
    readonly reset: CommandAttribute;
}

export type CommandsProps = {
    readonly data: CommandAttributes;
}