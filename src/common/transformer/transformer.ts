import * as jsonata from 'jsonata';
import { TransformationException } from "../../exceptions/transformation.exception";

/**
 * Common transformer function using JSONata.
 * @param data - The API response data.
 * @param expression - The JSONata expression to transform the data.
 * @returns The transformed data.
 */
export function transformResponse(data: any, expression: string): any {
    try {
        const expr = jsonata(expression);
        return expr.evaluate(data);
    } catch (error) {
        console.error('Error during JSONata transformation:', error);
        throw new TransformationException('JSONata Transformation Failed', error);
    }
}
