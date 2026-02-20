import { create, all } from 'mathjs';
import { SCIENTIFIC_CONSTANTS } from './constants';

const math = create(all, {
    number: 'BigNumber',
    precision: 64,
});

// Add our constants to mathjs scope
Object.values(SCIENTIFIC_CONSTANTS).forEach((constObj) => {
    // We import them as symbols like 'G', 'c', etc.
    // mathjs already has pi and e, but we can ensure consistency
});

export const evaluateExpression = (expression) => {
    try {
        // Basic sanitization
        let sanitized = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/π/g, 'pi')
            .replace(/√/g, 'sqrt');

        // Handle hidden multiplication (e.g. 2(3) -> 2*(3))
        // This is a naive regex, might need refinement for complex cases
        // sanitized = sanitized.replace(/(\d)(\()/g, '$1*$2');

        const result = math.evaluate(sanitized);

        // Format Result
        if (math.isBigNumber(result)) {
            // Check if it's too large or too small to be displayed simply
            const numParams = result.toJSON();
            // Simple string conversion for now, or toPrecision
            return math.format(result, { precision: 10, lowerExp: -9, upperExp: 9 });
        }

        return result.toString();
    } catch (error) {
        throw new Error('Invalid Expression');
    }
};
