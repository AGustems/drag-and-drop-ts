import {Draggable} from '../models/drag-drop-interfaces'
import {Project} from '../models/project-model'
import {Component} from './base-component'
import {Autobind} from '../decorators/autobind-decorator'

// ProjectItem Class
export class ProjectItem extends Component < HTMLUListElement,
HTMLLIElement > implements Draggable {
    private project : Project;

    // People or person depending on the quantity
    get persons() {
        if (this.project.people === 1) {
            return '1 person'
        }
        return `${this.project.people} people`
    }

    constructor(hostId : string, project : Project) {
        super('single-project', hostId, false, project.id)
        this.project = project;

        this.configure()
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event : DragEvent) {
        // Attaching data to the drag event (id of the project)
        event.dataTransfer !.setData('text/plain', this.project.id);
        // Change the appearance of the cursor
        event.dataTransfer !.effectAllowed = 'move';
    }

    @Autobind
    dragEndHandler(_ : DragEvent) {
        console.log('drag end')
    }

    // Listener for the drag event
    configure() {
        this
            .element
            .addEventListener('dragstart', this.dragStartHandler)
        this
            .element
            .addEventListener('dragend', this.dragEndHandler)
    }

    renderContent() {
        // Getting the HTML elements and rendering the form information
        this
            .element
            .querySelector('h2')!.textContent = this.project.title;
        this
            .element
            .querySelector('h3')!.textContent = this.persons + ' assigned';
        this
            .element
            .querySelector('p')!.textContent = this.project.description;
    }
}
