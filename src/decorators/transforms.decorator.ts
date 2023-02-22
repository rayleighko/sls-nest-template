import { Transform } from "class-transformer";
import _ from "lodash";

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @apiProperty()
 * @isString()
 * @trim()
 * name: string;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export const trim = (): PropertyDecorator =>
  Transform(({ value }) => {
    if (_.isArray(value)) {
      return value.map(v => _.trim(v as string).replace(/\s\s+/g, " "));
    }
    return _.trim(value as string).replace(/\s\s+/g, " ");
  });

/**
 * @description convert string or number to integer
 * @example
 * @isNumber()
 * @toInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export const toInt = (): PropertyDecorator =>
  Transform(({ value }) => parseInt(value as string, 10), {
    toClassOnly: true
  });

/**
 * @description transforms to array, specially for query params
 * @example
 * @isNumber()
 * @toArray()
 * name: number;
 * @constructor
 */
export const toArray = (): ((target: any, key: string) => void) =>
  Transform(
    ({ value }) => {
      if (_.isNil(value)) {
        return [];
      }
      return _.castArray(value);
    },
    { toClassOnly: true }
  );
