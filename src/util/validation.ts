namespace App {
    // Validation logic
    export interface Validatable {
        value : string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    export function validate(validatableInput : Validatable) {
        let isValid = true;
        // Check if the value is required
        if (validatableInput.required) {
            isValid = isValid && validatableInput
                .value
                .toString()
                .trim()
                .length !== 0;
        }

        // Check the minimum length in the strings values
        if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }

        // Check the maximum length in the string values
        if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }

        // Check the minimum value in the number values
        if (validatableInput.min != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }

        // Check the maximum value in the number values
        if (validatableInput.max != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }

        return isValid
    }
}