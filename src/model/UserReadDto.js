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
 * The UserReadDto model module.
 * @module model/UserReadDto
 * @version v0
 */
export default class UserReadDto {
  /**
   * Constructs a new <code>UserReadDto</code>.
   * @alias module:model/UserReadDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>UserReadDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserReadDto} obj Optional instance to populate.
   * @return {module:model/UserReadDto} The populated <code>UserReadDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UserReadDto();
      if (data.hasOwnProperty('username'))
        obj.username = ApiClient.convertToType(data['username'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} username
 */
UserReadDto.prototype.username = undefined;

