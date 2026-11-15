// Lets other sections open a project's detail dialog, which the Projects
// section owns. Projects listens for this event.
export const OPEN_PROJECT = "portfolio:open-project";

export const openProject = (title) =>
    window.dispatchEvent(new CustomEvent(OPEN_PROJECT, { detail: title }));
