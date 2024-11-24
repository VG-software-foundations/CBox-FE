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
import FileReadDto from './FileReadDto';
import Metadata from './Metadata';

/**
 * The PageResponseFileReadDto model module.
 * @module model/PageResponseFileReadDto
 * @version v0
 */
export default class PageResponseFileReadDto {
  /**
   * Constructs a new <code>PageResponseFileReadDto</code>.
   * @alias module:model/PageResponseFileReadDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>PageResponseFileReadDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PageResponseFileReadDto} obj Optional instance to populate.
   * @return {module:model/PageResponseFileReadDto} The populated <code>PageResponseFileReadDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PageResponseFileReadDto();
      if (data.hasOwnProperty('content'))
        obj.content = ApiClient.convertToType(data['content'], [FileReadDto]);
      if (data.hasOwnProperty('metadata'))
        obj.metadata = Metadata.constructFromObject(data['metadata']);
    }
    return obj;
  }
}

/**
 * @member {Array.<module:model/FileReadDto>} content
 */
PageResponseFileReadDto.prototype.content = undefined;

/**
 * @member {module:model/Metadata} metadata
 */
PageResponseFileReadDto.prototype.metadata = undefined;

