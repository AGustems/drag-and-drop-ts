import {Component} from './base-component.js'
import {Validatable, validate} from '../util/validation.js'
import {Autobind} from '../decorators/autobind-decorator.js'
import {projectState} from '../state/project-state.js'

export class ProjectInput extends Component < HTMLDivElement,
HTMLFormElement > {
    // tsconfig lib (dom)
    titleInput : HTMLInputElement;
    descriptionInput : HTMLInputElement
    peopleInput : HTMLInputElement

    constructor() {
        super('project-input', 'app', true, 'user-input');

        // Accessing the diferent inputs
        this.titleInput = this
            .element
            .querySelector('#title')as HTMLInputElement
        this.descriptionInput = this
            .element
            .querySelector('#description')as HTMLInputElement
        this.peopleInput = this
            .element
            .querySelector('#people')as HTMLInputElement

        // Rendering the content when instanciating it and configuring the event
        // listener
        this.configure()
    }

    // Abstract Method of compulsary implementation from the base class (not used in
    // this one)
    renderContent() {}

    // Configuration of the event listener
    configure() {
        this
            .element
            .addEventListener('submit', this.handleSubmit)
    }

    // Gather all the form information from the inputs and validate it
    private getFormInfo() : [string, string, number] | void {
        const enteredTitle = this.titleInput.value 
        const enteredDescription = this.descriptionInput.value 
        const enteredPeople = this.peopleInput.value

        // Validation objects
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validatable = {
            value: + enteredPeople,
            required: true,
            min: 1,
            max: 10
        }

        // Validation functions
        if (validate(titleValidatable) && validate(descriptionValidatable) && validate(peopleValidatable)) {
            // Return Tuple if the validation is passed
            return [
                enteredTitle, enteredDescription, + enteredPeople
            ]
        } else {
            alert('Invalid input, please try again!')
        }
    }

    // Clearing the inputs from the form
    private clearInputs() {
        this.titleInput.value = ''
        this.descriptionInput.value = ''
        this.peopleInput.value = ''
    }

    // Submit Method
    @Autobind
    private handleSubmit(event : Event) {
        event.preventDefault();
        const userInput = this.getFormInfo();

        // Checking if the user input is valid (validation 2n part)
        if (Array.isArray(userInput)) {
            // Destructuring the userInput object
            const [title,
                description,
                people] = userInput
            projectState.addProject(title, description, people)
            this.clearInputs()
        }
    }
}
