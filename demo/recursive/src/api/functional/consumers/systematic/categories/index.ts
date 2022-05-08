/**
 * @packageDocumentation
 * @module api.functional.consumers.systematic.categories
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher, Primitive } from "nestia-fetcher";
import type { IConnection } from "nestia-fetcher";

import type { ICategory } from "./../../../../../../api/structures/ICategory";

/**
 * @controller ConsumerCategoriesController.top()
 * @path GET /consumers/systematic/categories
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function top
    (
        connection: IConnection
    ): Promise<top.Output>
{
    return Fetcher.fetch
    (
        connection,
        top.ENCRYPTED,
        top.METHOD,
        top.path()
    );
}
export namespace top
{
    export type Output = Primitive<Array<ICategory>>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/consumers/systematic/categories";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/consumers/systematic/categories`;
    }
}

/**
 * @controller ConsumerCategoriesController.at()
 * @path GET /consumers/systematic/categories/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function at
    (
        connection: IConnection,
        id: string
    ): Promise<at.Output>
{
    return Fetcher.fetch
    (
        connection,
        at.ENCRYPTED,
        at.METHOD,
        at.path(id)
    );
}
export namespace at
{
    export type Output = Primitive<ICategory>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/consumers/systematic/categories/:id";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(id: string): string
    {
        return `/consumers/systematic/categories/${id}`;
    }
}

/**
 * @controller ConsumerCategoriesController.invert()
 * @path GET /consumers/systematic/categories/:id/invert
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function invert
    (
        connection: IConnection,
        id: string
    ): Promise<invert.Output>
{
    return Fetcher.fetch
    (
        connection,
        invert.ENCRYPTED,
        invert.METHOD,
        invert.path(id)
    );
}
export namespace invert
{
    export type Output = Primitive<ICategory.IInvert>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/consumers/systematic/categories/:id/invert";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(id: string): string
    {
        return `/consumers/systematic/categories/${id}/invert`;
    }
}