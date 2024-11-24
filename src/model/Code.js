/*
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.64
 *
 * Do not edit the class manually.
 *
 */
import ApiClient from '../ApiClient';

/**
 * The Code model module.
 * @module model/Code
 * @version v0
 */
export default class Code {
  /**
   * Constructs a new <code>Code</code>.
   * @alias module:model/Code
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Code</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Code} obj Optional instance to populate.
   * @return {module:model/Code} The populated <code>Code</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Code();
      if (data.hasOwnProperty('code'))
        obj.code = ApiClient.convertToType(data['code'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} code
 */
Code.prototype.code = undefined;

