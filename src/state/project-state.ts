namespace App {
    // Base State class
    type Listener < T > = (items : T[]) => void;

    class State < T > {
        protected listeners : Listener < T > [] = [];

        // Method (public) to add listeners to the state
        addListener(listenerFn : Listener < T >) {
            this
                .listeners
                .push(listenerFn)
        }
    }

    // Project State Management
    export class ProjectState extends State < Project > {
        private projects : Project[] = [];
        private static instance : ProjectState;

        private constructor() {
            super();
        }

        static getInstance() {
            if (this.instance) {
                return this.instance
            }
            this.instance = new ProjectState();
            return this.instance
        }

        // Method (public) to add projects to the state
        addProject(title : string, description : string, people : number) {
            const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);

            this
                .projects
                .push(newProject)
            this.updateListeners()
        }

        // Method (public) to switch the status of a project
        moveProject(projectId : string, newStatus : ProjectStatus) {
            const project = this
                .projects
                .find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }

        // Call for all listeners
        private updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }

    // Global constant that manages the "state" of the project
    export const projectState = ProjectState.getInstance();
}