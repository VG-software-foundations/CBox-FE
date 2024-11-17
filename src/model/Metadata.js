/*
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.63
 *
 * Do not edit the class manually.
 *
 */
import ApiClient from '../ApiClient';

/**
 * The Metadata model module.
 * @module model/Metadata
 * @version v0
 */
export default class Metadata {
  /**
   * Constructs a new <code>Metadata</code>.
   * @alias module:model/Metadata
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Metadata</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Metadata} obj Optional instance to populate.
   * @return {module:model/Metadata} The populated <code>Metadata</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Metadata();
      if (data.hasOwnProperty('total_elements'))
        obj.totalElements = ApiClient.convertToType(data['total_elements'], 'Number');
      if (data.hasOwnProperty('has_next'))
        obj.hasNext = ApiClient.convertToType(data['has_next'], 'Boolean');
      if (data.hasOwnProperty('page'))
        obj.page = ApiClient.convertToType(data['page'], 'Number');
      if (data.hasOwnProperty('size'))
        obj.size = ApiClient.convertToType(data['size'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} totalElements
 */
Metadata.prototype.totalElements = undefined;

/**
 * @member {Boolean} hasNext
 */
Metadata.prototype.hasNext = undefined;

/**
 * @member {Number} page
 */
Metadata.prototype.page = undefined;

/**
 * @member {Number} size
 */
Metadata.prototype.size = undefined;
