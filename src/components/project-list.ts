/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind-decorator.ts" />
/// <reference path="../models/project-model.ts" />
/// <reference path="../models/drag-drop-interfaces.ts" />

namespace App {
    // Project List
    export class ProjectList extends Component < HTMLDivElement,
    HTMLElement > implements DragTarget {
        assignedProjects : Project[];

        constructor(private type : 'active' | 'finished') {
            // Passing the values needed for the parent class
            super('project-list', 'app', false, `${type}-projects`);
            // Initializing the assignedProjects field
            this.assignedProjects = [];

            // Adding a listener
            this.configure();
            // Rendering the DOM elements
            this.renderContent();
        }

        // Adding drag and drop listeners
        @Autobind
        dragOverHandler(event : DragEvent) {
            // Checking if the drag is allowed
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault(); // Default = not allow drop
                // Change the appearance of the box to signal the droppable area
                const listEl = this
                    .element
                    .querySelector('ul')!;
                listEl
                    .classList
                    .add('droppable');
            }
        };

        @Autobind
        dropHandler(event : DragEvent) {
            // Changing the project status
            const prjId = event.dataTransfer !.getData('text/plain');
            projectState.moveProject(prjId, this.type === 'active'
                ? ProjectStatus.Active
                : ProjectStatus.Finished)

            // Change the appearance of the box to signal the droppable area
            const listEl = this
                .element
                .querySelector('ul')!;
            listEl
                .classList
                .remove('droppable');
        };

        @Autobind
        dragLeaveHandler(_ : DragEvent) {
            // Change the appearance of the box to signal when we leave the element
            const listEl = this
                .element
                .querySelector('ul')!;
            listEl
                .classList
                .remove('droppable');
        };

        // Adding a listener creation function
        configure() {
            // Listener on the element (drag & drop)
            this
                .element
                .addEventListener('dragover', this.dragOverHandler)
            this
                .element
                .addEventListener('dragleave', this.dragLeaveHandler)
            this
                .element
                .addEventListener('drop', this.dropHandler)

            // Listener for state changes
            projectState.addListener((projects : Project[]) => {
                // Filtering the projects by active or finished
                const filteredProjects = projects.filter(prj => {
                    if (this.type === 'active') {
                        return prj.status === ProjectStatus.Active
                    }
                    return prj.status === ProjectStatus.Finished
                })
                this.assignedProjects = filteredProjects;
                this.renderProjects();
            });
        }

        // Render the content
        renderContent() {
            const listId = `${this.type}-projects-list`
            this
                .element
                .querySelector('ul')!.id = listId;
            this
                .element
                .querySelector('h2')!.textContent = this
                .type
                .toUpperCase() + ' PROJECTS'
        }

        // Render the projects of the list
        private renderProjects() {
            const listElement = document.getElementById(`${this.type}-projects-list`)!as HTMLUListElement;
            // Emptying the list element to avoid duplicates
            listElement.innerHTML = ''
            // Looping throw the assignedProjects to append them to the list element
            for (const prjItem of this.assignedProjects) {
                // Creating a new list item
                new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
            }
        }
    }
}