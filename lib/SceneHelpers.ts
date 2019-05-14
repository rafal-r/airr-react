export function clearViewAnimationStyles(view: HTMLElement): void {
    view.style.display = "";
    view.style.opacity = "";
    view.style.transform = "";
    view.style.transition = "";
    view.style.webkitTransform = "";
    view.style.webkitTransition = "";
    view.style.zIndex = "";
    view.style.webkitBackfaceVisibility = "";
    view.style.backfaceVisibility = "";
}
