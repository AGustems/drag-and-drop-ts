namespace App {
    // Autobind decorator ("experimentalDecorators": true --> tsconfig)
    export function Autobind(_ : any, _2 : string | Symbol, descriptor : PropertyDescriptor) {
        // Accessing the original method (store)
        const originalMethod = descriptor.value;

        // Descriptor configuration
        const adjDescriptor : PropertyDescriptor = {
            configurable: true,
            // Calling the bind function on the method
            get() {
                const boundFn = originalMethod.bind(this)
                return boundFn
            }
        }
        return adjDescriptor
    }
}