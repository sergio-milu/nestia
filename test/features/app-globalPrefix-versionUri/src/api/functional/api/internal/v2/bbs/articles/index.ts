/**
 * @packageDocumentation
 * @module api.functional.api.internal.v2.bbs.articles
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Resolved, Primitive } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Format } from "typia/lib/tags/Format";

import type { IBbsArticle } from "../../../../../../structures/IBbsArticle";
import type { IPage } from "../../../../../../structures/IPage";

/**
 * @controller BbsArticlesController.index
 * @path GET /api/internal/v2/bbs/:section/articles
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function index(
  connection: IConnection,
  section: string,
  query: index.Query,
): Promise<index.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...index.METADATA,
      template: index.METADATA.path,
      path: index.path(section, query),
    },
  );
}
export namespace index {
  export type Query = Resolved<IPage.IRequest>;
  export type Output = Primitive<IPage<IBbsArticle.ISummary>>;

  export const METADATA = {
    method: "GET",
    path: "/api/internal/v2/bbs/:section/articles",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (section: string, query: index.Query) => {
    const variables: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query as any))
      if (undefined === value) continue;
      else if (Array.isArray(value))
        value.forEach((elem: any) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location: string = `/api/internal/v2/bbs/${encodeURIComponent(section ?? "null")}/articles`;
    return 0 === variables.size
      ? location
      : `${location}?${variables.toString()}`;
  };
}

/**
 * Update an article.
 *
 * @param section Section code
 * @param id Target article ID
 * @param input Content to update
 * @returns Updated content
 *
 * @controller BbsArticlesController.update
 * @path PUT /api/internal/v2/bbs/:section/articles/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function update(
  connection: IConnection,
  section: string,
  id: string & Format<"uuid">,
  input: update.Input,
): Promise<update.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...update.METADATA,
      template: update.METADATA.path,
      path: update.path(section, id),
    },
    input,
  );
}
export namespace update {
  export type Input = Resolved<IBbsArticle.IStore>;
  export type Output = Primitive<IBbsArticle>;

  export const METADATA = {
    method: "PUT",
    path: "/api/internal/v2/bbs/:section/articles/:id",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (section: string, id: string & Format<"uuid">) =>
    `/api/internal/v2/bbs/${encodeURIComponent(section ?? "null")}/articles/${encodeURIComponent(id ?? "null")}`;
}
