export interface ScriptProps {
    src: HTMLScriptElement['src'] | null;
    checkForExisting?: boolean;
    [key: string]: any;
}
declare type ErrorState = ErrorEvent | null;
declare type ScriptStatus = {
    loading: boolean;
    error: ErrorState;
    scriptEl: HTMLScriptElement;
};
declare type ScriptStatusMap = {
    [key: string]: ScriptStatus;
};
export declare const scripts: ScriptStatusMap;
export default function useScript({ src, checkForExisting, ...attributes }: ScriptProps): [boolean, ErrorState];
export {};
