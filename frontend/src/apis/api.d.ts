/// <reference path="../../typescript-fetch-client/custom.d.ts" />
import { Configuration } from "./configuration";
/**
 *
 * @export
 */
export declare const COLLECTION_FORMATS: {
    csv: string;
    ssv: string;
    tsv: string;
    pipes: string;
};
/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}
/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}
/**
 *
 * @export
 * @class BaseAPI
 */
export declare class BaseAPI {
    protected basePath: string;
    protected fetch: FetchAPI;
    protected configuration: Configuration;
    constructor(configuration?: Configuration, basePath?: string, fetch?: FetchAPI);
}
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export declare class RequiredError extends Error {
    field: string;
    name: "RequiredError";
    constructor(field: string, msg?: string);
}
/**
 * Login body model
 * @export
 * @interface LoginBody
 */
export interface LoginBody {
    /**
     *
     * @type {string}
     * @memberof LoginBody
     */
    email: string;
    /**
     *
     * @type {string}
     * @memberof LoginBody
     */
    password: string;
}
/**
 *
 * @export
 * @interface ModelError
 */
export interface ModelError {
    /**
     * error code
     * @type {string}
     * @memberof ModelError
     */
    code: string;
    /**
     * error description
     * @type {string}
     * @memberof ModelError
     */
    message: string;
}
/**
 * Register body model
 * @export
 * @interface RegisterBody
 */
export interface RegisterBody {
    /**
     *
     * @type {string}
     * @memberof RegisterBody
     */
    firstname: string;
    /**
     *
     * @type {string}
     * @memberof RegisterBody
     */
    lastname: string;
    /**
     *
     * @type {string}
     * @memberof RegisterBody
     */
    email: string;
    /**
     *
     * @type {string}
     * @memberof RegisterBody
     */
    password: string;
}
/**
 *
 * @export
 * @interface Todo
 */
export interface Todo extends TodoBody {
    /**
     *
     * @type {number}
     * @memberof Todo
     */
    id?: number;
}
/**
 *
 * @export
 * @interface TodoBody
 */
export interface TodoBody {
    /**
     *
     * @type {string}
     * @memberof TodoBody
     */
    title: string;
    /**
     *
     * @type {boolean}
     * @memberof TodoBody
     */
    complete?: boolean;
}
/**
 * Access Token model
 * @export
 * @interface Token
 */
export interface Token {
    /**
     *
     * @type {number}
     * @memberof Token
     */
    id?: number;
    /**
     *
     * @type {string}
     * @memberof Token
     */
    token?: string;
    /**
     *
     * @type {string}
     * @memberof Token
     */
    expired?: string;
}
/**
 * User info model
 * @export
 * @interface UserInfo
 */
export interface UserInfo {
    /**
     *
     * @type {number}
     * @memberof UserInfo
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof UserInfo
     */
    firstname: string;
    /**
     *
     * @type {string}
     * @memberof UserInfo
     */
    lastname: string;
    /**
     *
     * @type {string}
     * @memberof UserInfo
     */
    email: string;
}
/**
 * AuthApi - fetch parameter creator
 * @export
 */
export declare const AuthApiFetchParamCreator: (configuration?: Configuration) => {
    authInfo(options?: any): FetchArgs;
    authLogin(body: LoginBody, options?: any): FetchArgs;
    authRegister(body: RegisterBody, options?: any): FetchArgs;
};
/**
 * AuthApi - functional programming interface
 * @export
 */
export declare const AuthApiFp: (configuration?: Configuration) => {
    authInfo(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserInfo>;
    authLogin(body: LoginBody, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Token>;
    authRegister(body: RegisterBody, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<UserInfo>;
};
/**
 * AuthApi - factory interface
 * @export
 */
export declare const AuthApiFactory: (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) => {
    authInfo(options?: any): Promise<UserInfo>;
    authLogin(body: LoginBody, options?: any): Promise<Token>;
    authRegister(body: RegisterBody, options?: any): Promise<UserInfo>;
};
/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export declare class AuthApi extends BaseAPI {
    /**
     *
     * @summary Exchange token to UserInfo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    authInfo(options?: any): Promise<UserInfo>;
    /**
     *
     * @summary User login
     * @param {} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    authLogin(body: LoginBody, options?: any): Promise<Token>;
    /**
     *
     * @summary User register
     * @param {} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    authRegister(body: RegisterBody, options?: any): Promise<UserInfo>;
}
/**
 * TodoApi - fetch parameter creator
 * @export
 */
export declare const TodoApiFetchParamCreator: (configuration?: Configuration) => {
    todoDelete(id: number, options?: any): FetchArgs;
    todoList(options?: any): FetchArgs;
    todoNew(body: TodoBody, options?: any): FetchArgs;
    todoUpdate(id: number, body: TodoBody, options?: any): FetchArgs;
};
/**
 * TodoApi - functional programming interface
 * @export
 */
export declare const TodoApiFp: (configuration?: Configuration) => {
    todoDelete(id: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response>;
    todoList(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Todo[]>;
    todoNew(body: TodoBody, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Todo>;
    todoUpdate(id: number, body: TodoBody, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Todo[]>;
};
/**
 * TodoApi - factory interface
 * @export
 */
export declare const TodoApiFactory: (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) => {
    todoDelete(id: number, options?: any): Promise<Response>;
    todoList(options?: any): Promise<Todo[]>;
    todoNew(body: TodoBody, options?: any): Promise<Todo>;
    todoUpdate(id: number, body: TodoBody, options?: any): Promise<Todo[]>;
};
/**
 * TodoApi - object-oriented interface
 * @export
 * @class TodoApi
 * @extends {BaseAPI}
 */
export declare class TodoApi extends BaseAPI {
    /**
     *
     * @summary Delete todo
     * @param {} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    todoDelete(id: number, options?: any): Promise<Response>;
    /**
     *
     * @summary List all todo
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    todoList(options?: any): Promise<Todo[]>;
    /**
     *
     * @summary Create new Todo
     * @param {} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    todoNew(body: TodoBody, options?: any): Promise<Todo>;
    /**
     *
     * @summary Update todo
     * @param {} id
     * @param {} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TodoApi
     */
    todoUpdate(id: number, body: TodoBody, options?: any): Promise<Todo[]>;
}
