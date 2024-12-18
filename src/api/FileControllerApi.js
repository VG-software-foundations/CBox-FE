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
import ApiClient from "../ApiClient";
import FileCreateEditDto from '../model/FileCreateEditDto';
import FileGetDto from '../model/FileGetDto';
import FileReadDto from '../model/FileReadDto';
import PageResponseFileReadDto from '../model/PageResponseFileReadDto';

/**
* FileController service.
* @module api/FileControllerApi
* @version v0
*/
export default class FileControllerApi {

    /**
    * Constructs a new FileControllerApi. 
    * @alias module:api/FileControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the delete1 operation.
     * @callback moduleapi/FileControllerApi~delete1Callback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/FileControllerApi~delete1Callback} callback The callback function, accepting three arguments: error, data, response
     */
    delete1(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling delete1");
      }

      let pathParams = {
        
      };
      let queryParams = {
        'id': id
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/files', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the findAll1 operation.
     * @callback moduleapi/FileControllerApi~findAll1Callback
     * @param {String} error Error message, if any.
     * @param {module:model/PageResponseFileReadDto{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page  (default to <.>)
     * @param {Number} opts.limit  (default to <.>)
     * @param {module:api/FileControllerApi~findAll1Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    findAll1(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'page': opts['page'],'limit': opts['limit']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = PageResponseFileReadDto;

      return this.apiClient.callApi(
        '/files', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the findById1 operation.
     * @callback moduleapi/FileControllerApi~findById1Callback
     * @param {String} error Error message, if any.
     * @param {module:model/FileGetDto{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/FileControllerApi~findById1Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    findById1(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling findById1");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = FileGetDto;

      return this.apiClient.callApi(
        '/files/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the get operation.
     * @callback moduleapi/FileControllerApi~getCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PageResponseFileReadDto{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page  (default to <.>)
     * @param {Number} opts.limit  (default to <.>)
     * @param {module:api/FileControllerApi~getCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    get(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'page': opts['page'],'limit': opts['limit']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = PageResponseFileReadDto;

      return this.apiClient.callApi(
        '/files/get', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the update1 operation.
     * @callback moduleapi/FileControllerApi~update1Callback
     * @param {String} error Error message, if any.
     * @param {module:model/FileReadDto{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:model/FileCreateEditDto} fileDto 
     * @param {module:api/FileControllerApi~update1Callback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    update1(fileDto, callback) {
      
      let postBody = null;
      // verify the required parameter 'fileDto' is set
      if (fileDto === undefined || fileDto === null) {
        throw new Error("Missing the required parameter 'fileDto' when calling update1");
      }

      let pathParams = {
        
      };
      let queryParams = {
        'fileDto': fileDto
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = ['*/*'];
      let returnType = FileReadDto;

      return this.apiClient.callApi(
        '/files', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the upload operation.
     * @callback moduleapi/FileControllerApi~uploadCallback
     * @param {String} error Error message, if any.
     * @param {module:model/FileReadDto{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/FileCreateEditDto} opts.body 
     * @param {module:api/FileControllerApi~uploadCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    upload(opts, callback) {
      opts = opts || {};
      let postBody = null;
      let formParams = new FormData();
      
      if (opts['body'] instanceof FormData) {
          postBody = opts['body'];
      } else if (opts['body']) {
          formParams.append('file', opts['body']); 
          postBody = formParams;
      }
      
      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        "Content-Type": "multipart/form-data",
      };

      let authNames = ['jwtAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = FileReadDto;

      return this.apiClient.callApi(
        '/files/upload', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}