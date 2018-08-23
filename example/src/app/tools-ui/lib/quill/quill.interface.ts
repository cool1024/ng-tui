export interface QuillOptions {
    theme?: string;
    placeholder?: string;
    modules?: QuillMOdules;
}
export interface QuillMOdules {
    toolbar?: string | Array<any>;
    keyboard?: any;
    history?: {
        delay: number,
        maxStack: number,
        userOnly: boolean,
        clipboard: any
    };
    formula?: boolean;
    syntax?: boolean;
}
