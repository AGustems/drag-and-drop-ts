namespace App {
    // Component Base Class
    export abstract class Component < T extends HTMLElement,
    U extends HTMLElement > {
        templateElement : HTMLTemplateElement;
        hostElement : T;
        element : U;

        constructor(templateId : string, hostElementId : string, insertAtStart : boolean, newElementId?: string) {
            this.templateElement = document.getElementById(templateId)!as HTMLTemplateElement;
            // Reference to the template content
            this.hostElement = document.getElementById(hostElementId)!as T;
            // Importing the content of the template of this class
            const importedHTMLContent = document.importNode(this.templateElement.content, true);
            // element to insert (content)
            this.element = importedHTMLContent.firstElementChild as U;
            // Adding a dynamic ID to the project
            if (newElementId) {
                this.element.id = newElementId
            }
            this.attach(insertAtStart);
        }

        // Attach the rendered content after the form
        private attach(insertAtBeginning : boolean) {
            this
                .hostElement
                .insertAdjacentElement(insertAtBeginning
                    ? 'afterbegin'
                    : 'beforeend', this.element)
        }

        // Abstract methods that have be implemented depending on the class
        // implementation
        abstract configure() : void;
        abstract renderContent() : void;
    }
}