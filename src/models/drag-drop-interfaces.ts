// Drag and Drop Interfaces
export interface Draggable {
    // Listener for the start of the drag event
    dragStartHandler(event : DragEvent) : void
    // Listener for the end of the drag event
    dragEndHandler(event : DragEvent) : void
}
// Box in which we can drop sth
export interface DragTarget {
    // Signal JS and browser to indicate a valid target
    dragOverHandler(event : DragEvent) : void
    // React to he drop produced and update data
    dropHandler(event : DragEvent) : void
    // User Visual feedback when dragOver finishes
    dragLeaveHandler(event : DragEvent) : void
}
