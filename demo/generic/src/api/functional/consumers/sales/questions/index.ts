/**
 * @packageDocumentation
 * @module api.functional.consumers.sales.questions
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher, Primitive } from "nestia-fetcher";
import type { IConnection } from "nestia-fetcher";

import type { ISaleArticle } from "./../../../../structures/ISaleArticle";
import type { ISaleInquiry } from "./../../../../structures/ISaleInquiry";

/**
 * Store a new inquiry.
 * 
 * Write a new article inquirying about a sale.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param request Instance of the Express.Request
 * @param section Code of the target section
 * @param saleId ID of the target sale
 * @param input Content to archive
 * @return Newly archived inquiry
 * @throw 400 bad request error when type of the input data is not valid
 * @throw 401 unauthorized error when you've not logged in yet
 * 
 * @controller ConsumerSaleQuestionsController.store()
 * @path POST /consumers/:section/sales/:saleId/questions
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function store
    (
        connection: IConnection,
        section: string,
        saleId: string,
        input: Primitive<store.Input>
    ): Promise<store.Output>
{
    return Fetcher.fetch
    (
        connection,
        store.ENCRYPTED,
        store.METHOD,
        store.path(section, saleId),
        input
    );
}
export namespace store
{
    export type Input = Primitive<ISaleArticle.IStore>;
    export type Output = Primitive<ISaleInquiry<ISaleArticle.IContent>>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/consumers/:section/sales/:saleId/questions";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(section: string, saleId: string): string
    {
        return `/consumers/${section}/sales/${saleId}/questions`;
    }
}

/**
 * Update an inquiry.
 * 
 * Update ordinary inquiry article. However, it would not modify the content reocrd
 * {@link ISaleInquiry.IContent}, but be accumulated into the {@link ISaleInquiry.contents}. 
 * Therefore, all of the poeple can read how the content has been changed.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param request Instance of the Express.Request
 * @param section Code of the target section
 * @param saleId ID of the target sale
 * @param id ID of the target article to be updated
 * @param input New content to be overwritten
 * @return The newly created content record
 * @throw 400 bad request error when type of the input data is not valid
 * @throw 401 unauthorized error when you've not logged in yet
 * @throw 403 forbidden error when the article is not yours
 * 
 * @controller ConsumerSaleQuestionsController.update()
 * @path PUT /consumers/:section/sales/:saleId/questions/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function update
    (
        connection: IConnection,
        section: string,
        saleId: string,
        id: number,
        input: Primitive<update.Input>
    ): Promise<update.Output>
{
    return Fetcher.fetch
    (
        connection,
        update.ENCRYPTED,
        update.METHOD,
        update.path(section, saleId, id),
        input
    );
}
export namespace update
{
    export type Input = Primitive<ISaleArticle.IStore>;
    export type Output = Primitive<ISaleInquiry<ISaleArticle.IContent>>;

    export const METHOD = "PUT" as const;
    export const PATH: string = "/consumers/:section/sales/:saleId/questions/:id";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(section: string, saleId: string, id: number): string
    {
        return `/consumers/${section}/sales/${saleId}/questions/${id}`;
    }
}