import { det, inv, multiply, add, subtract, transpose, matrix } from 'mathjs';

export const createEmptyMatrix = (rows, cols) => {
    return Array(rows).fill().map(() => Array(cols).fill(0));
};

export const matrixOperations = {
    add: (a, b) => {
        try {
            return add(matrix(a), matrix(b)).toArray();
        } catch (e) {
            throw new Error("Dimension mismatch");
        }
    },
    subtract: (a, b) => {
        try {
            return subtract(matrix(a), matrix(b)).toArray();
        } catch (e) {
            throw new Error("Dimension mismatch");
        }
    },
    multiply: (a, b) => {
        try {
            return multiply(matrix(a), matrix(b)).toArray();
        } catch (e) {
            throw new Error("Invalid dimensions for multiplication");
        }
    },
    determinant: (a) => {
        try {
            const d = det(matrix(a));
            return Number(d.toFixed(6)); // Avoid FP precision issues
        } catch (e) {
            throw new Error("Must be square matrix");
        }
    },
    inverse: (a) => {
        try {
            const i = inv(matrix(a));
            // Format to avoid super long decimals
            return i.toArray().map(row => row.map(val => Number(val.toFixed(6))));
        } catch (e) {
            if (e.message.includes('Determinant is zero')) {
                throw new Error("Determinant is 0, no inverse");
            }
            throw new Error("Singular matrix or non-square");
        }
    },
    transpose: (a) => {
        return transpose(matrix(a)).toArray();
    }
};
