import type { INestApplication } from "@nestjs/common";

import type { INormalizedInput } from "./structures/INormalizedInput";
import type { ISwagger } from "./structures/ISwagger";
import type { ISwaggerInfo } from "./structures/ISwaggerInfo";
import type { ISwaggerSecurityScheme } from "./structures/ISwaggerSecurityScheme";

/**
 * Definition for the `nestia.config.ts` file.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface INestiaConfig {
    /**
     * Building `swagger.json` is also possible.
     *
     * If not specified, you can't build the `swagger.json`.
     */
    swagger?: INestiaConfig.ISwaggerConfig;

    /**
     * Accessor of controller classes.
     *
     * You can specify it within two ways
     *
     *   - Asynchronous function returning `INestApplication` instance
     *   - Specify the path or directory of controller class files
     */
    input:
        | string
        | string[]
        | INestiaConfig.IInput
        | (() => Promise<INestApplication>);

    /**
     * Output directory that SDK would be placed in.
     *
     * If not configured, you can't build the SDK library.
     */
    output?: string;

    /**
     * Target directory that SDK distribution files would be placed in.
     *
     * If you configure this property and runs `npx nestia sdk` command,
     * distribution environments for the SDK library would be generated.
     *
     * After the SDK library generation, move to the `distribute` directory,
     * and runs `npm publish` command, then you can share SDK library with
     * other client (frontend) developers.
     *
     * Recommend to use `"packages/api"` value.
     */
    distribute?: string;

    /**
     * Allow simulation mode.
     *
     * If you configure this property to be `true`, the SDK library would be contain
     * simulation mode. In the simulation mode, the SDK library would not communicate
     * with the real backend server, but just returns random mock-up data
     * with requestion data validation.
     *
     * For reference, random mock-up data would be generated by `typia.random<T>()`
     * function.
     *
     * @default false
     */
    simulate?: boolean;

    /**
     * Target directory that e2e test functions would be placed in.
     *
     * If you configure this property and runs `npx nestia e2e` command,
     * `@nestia/sdk` will analyze your NestJS backend server code, and
     * generates e2e test functions for every API endpoints.
     *
     * If not configured, you can't run `npx nestia e2e` command.
     */
    e2e?: string;

    /**
     * Whether to use propagation mode or not.
     *
     * If being configured, interaction functions of the SDK library would
     * perform the propagation mode. The propagation mode means that never
     * throwing exception even when status code is not 200 (or 201), but just
     * returning the {@link IPropagation} typed instance, which can specify its body
     * type through discriminated union determined by status code.
     *
     * @default false
     */
    propagate?: boolean;

    /**
     * Whether to clone DTO structures or not.
     *
     * If being configured, all of DTOs used in the backend server would be cloned
     * into the `structures` directory, and the SDK library would be refer to the
     * cloned DTOs instead of the original.
     *
     * @default false
     */
    clone?: boolean;

    /**
     * Whether to wrap DTO by primitive type.
     *
     * If you don't configure this property as `false`, all of DTOs in the
     * SDK library would be automatically wrapped by {@link Primitive} type.
     *
     * For refenrece, if a DTO type be capsuled by the {@link Primitive} type,
     * all of methods in the DTO type would be automatically erased. Also, if
     * the DTO has a `toJSON()` method, the DTO type would be automatically
     * converted to return type of the `toJSON()` method.
     *
     * @default true
     */
    primitive?: boolean;

    /**
     * Location of `tsconfig.json` file.
     *
     * If be configured, target file will replace the `tsconfig.json` file.
     *
     * @default tsconfig.json
     */
    project?: string;

    /**
     * Whether to assert parameter types or not.
     *
     * If you configure this property to be `true`, all of the function
     * parameters of SDK library would be checked through
     * [`typia.assert<T>()` function](https://typia.io/docs/validators/assert/).
     *
     * This option would make your SDK library compilation time a little bit slower,
     * but would enahcne the type safety even in the runtime level.
     *
     * @default false
     */
    assert?: boolean;

    /**
     * Whether to optimize JSON string conversion 10x faster or not.
     *
     * If you configure this property to be `true`, the SDK library would utilize the
     * [`typia.assertStringify<T>() function`](https://github.com/samchon/typia#enhanced-json)
     * to boost up JSON serialization speed and ensure type safety.
     *
     * This option would make your SDK library compilation time a little bit slower,
     * but would enhance JSON serialization speed 10x faster. Also, it can ensure type
     * safety even in the rumtime level.
     *
     * @default false
     */
    json?: boolean;

    /**
     * @internal
     */
    normalized?: INormalizedInput;
}
export namespace INestiaConfig {
    /**
     * List of files or directories to include or exclude to specifying the NestJS
     * controllers.
     */
    export interface IInput {
        /**
         * List of files or directories containing the NestJS controller classes.
         */
        include: string[];

        /**
         * List of files or directories to be excluded.
         */
        exclude?: string[];
    }

    /**
     * Building `swagger.json` is also possible.
     */
    export interface ISwaggerConfig {
        /**
         * Output path of the `swagger.json`.
         *
         * If you've configured only directory, the file name would be the `swagger.json`.
         * Otherwise you've configured the full path with file name and extension, the
         * `swagger.json` file would be renamed to it.
         */
        output: string;

        /**
         * API information.
         *
         * If omitted, `package.json` content would be used instead.
         */
        info?: Partial<ISwaggerInfo>;

        /**
         * List of server addresses.
         */
        servers?: ISwagger.IServer[];

        /**
         * Security schemes.
         *
         * When generating `swagger.json` file through `nestia`, if your controllers or
         * theirs methods have a security key which is not enrolled in here property,
         * it would be an error.
         */
        security?: Record<string, ISwaggerSecurityScheme>;

        /**
         * Decompose query DTO.
         *
         * If you configure this property to be `true`, the query DTO would be decomposed
         * into individual query parameters per each property.
         *
         * @default false
         */
        decompose?: boolean;

        operationId?(props: {
            class: string;
            function: string;
            method: "HEAD" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
            path: string;
        }): string;
    }
}
