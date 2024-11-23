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
 * The FileCreateEditDto model module.
 * @module model/FileCreateEditDto
 * @version v0
 */
export default class FileCreateEditDto {
  /**
   * Constructs a new <code>FileCreateEditDto</code>.
   * @alias module:model/FileCreateEditDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>FileCreateEditDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FileCreateEditDto} obj Optional instance to populate.
   * @return {module:model/FileCreateEditDto} The populated <code>FileCreateEditDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new FileCreateEditDto();
      if (data.hasOwnProperty('file'))
        obj.file = ApiClient.convertToType(data['file'], 'Blob');
      if (data.hasOwnProperty('accessType'))
        obj.accessType = ApiClient.convertToType(data['accessType'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Blob} file
 */
FileCreateEditDto.prototype.file = undefined;

/**
 * Allowed values for the <code>accessType</code> property.
 * @enum {String}
 * @readonly
 */
FileCreateEditDto.AccessTypeEnum = {
  /**
   * value: "RESTRICTED"
   * @const
   */
  RESTRICTED: "RESTRICTED",

  /**
   * value: "PUBLIC"
   * @const
   */
  PUBLIC: "PUBLIC"
};
/**
 * @member {module:model/FileCreateEditDto.AccessTypeEnum} accessType
 */
FileCreateEditDto.prototype.accessType = undefined;
