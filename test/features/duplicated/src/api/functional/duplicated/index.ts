/**
 * @packageDocumentation
 * @module api.functional.duplicated
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Primitive } from "typia";

import type { IBbsArticle } from "../../structures/IBbsArticle";

/**
 * @controller DuplicatedController.at
 * @path GET /duplicated/at
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function at(connection: IConnection): Promise<at.Output> {
  return PlainFetcher.fetch(connection, {
    ...at.METADATA,
    template: at.METADATA.path,
    path: at.path(),
  });
}
export namespace at {
  export type Output = Primitive<IBbsArticle>;

  export const METADATA = {
    method: "GET",
    path: "/duplicated/at",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = () => "/duplicated/at";
}
