export interface TooltipsInstance {
    show(): void;
    hide(): void;
    dispose(): void;
    toggle(): void;
    updateTitleContent(title: string): void;
}
