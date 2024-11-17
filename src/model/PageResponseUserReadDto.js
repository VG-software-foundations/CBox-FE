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
import Metadata from './Metadata';
import UserReadDto from './UserReadDto';

/**
 * The PageResponseUserReadDto model module.
 * @module model/PageResponseUserReadDto
 * @version v0
 */
export default class PageResponseUserReadDto {
  /**
   * Constructs a new <code>PageResponseUserReadDto</code>.
   * @alias module:model/PageResponseUserReadDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>PageResponseUserReadDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PageResponseUserReadDto} obj Optional instance to populate.
   * @return {module:model/PageResponseUserReadDto} The populated <code>PageResponseUserReadDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PageResponseUserReadDto();
      if (data.hasOwnProperty('content'))
        obj.content = ApiClient.convertToType(data['content'], [UserReadDto]);
      if (data.hasOwnProperty('metadata'))
        obj.metadata = Metadata.constructFromObject(data['metadata']);
    }
    return obj;
  }
}

/**
 * @member {Array.<module:model/UserReadDto>} content
 */
PageResponseUserReadDto.prototype.content = undefined;

/**
 * @member {module:model/Metadata} metadata
 */
PageResponseUserReadDto.prototype.metadata = undefined;
