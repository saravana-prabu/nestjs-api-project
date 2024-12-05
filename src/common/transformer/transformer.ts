import * as jsonata from 'jsonata';
import { TransformationException } from "../../exceptions/transformation.exception";

/**
 * Common transformer function using JSONata.
 * @param data - The API response data.
 * @param expression - The JSONata expression to transform the data.
 * @returns The transformed data.
 */
export async function transformResponse(data: any, expression: string): Promise<any> {
    try {
        const expr = jsonata(expression);
        const result = await expr.evaluate(data); // Await the result if the expression is asynchronous

        if (result === undefined) {
            console.error('JSONata transformation returned undefined. Expression did not match any data.');
            // Throw the custom transformation exception
            throw new TransformationException(
                'Transformation resulted in undefined. Please check the transformation expression.',
                data, // Return the original data for reference
            );
        }

        return result;  // Return the transformed data
    } catch (error) {
        console.error('Error during JSONata transformation:', error);
        throw new TransformationException('JSONata Transformation Failed', error);
    }
}
