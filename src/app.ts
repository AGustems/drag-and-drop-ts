/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App {
    // Instanciate the classes
    new ProjectInput();
    new ProjectList('active')
    new ProjectList('finished')
}