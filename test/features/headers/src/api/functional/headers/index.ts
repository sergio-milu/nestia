/**
 * @packageDocumentation
 * @module api.functional.headers
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Resolved, Primitive } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";
import type { Format } from "typia/lib/tags/Format";

import type { IBbsArticle } from "../../structures/IBbsArticle";
import type { IHeaders } from "../../structures/IHeaders";

/**
 * @controller HeadersController.emplace
 * @path PATCH /headers/:section
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function emplace(
  connection: IConnection<emplace.Headers>,
  section: string,
): Promise<emplace.Output> {
  return !!connection.simulate
    ? emplace.simulate(connection, section)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...emplace.METADATA,
          template: emplace.METADATA.path,
          path: emplace.path(section),
        },
      );
}
export namespace emplace {
  export type Headers = Resolved<IHeaders>;
  export type Output = Resolved<IHeaders>;

  export const METADATA = {
    method: "PATCH",
    path: "/headers/:section",
    request: null,
    response: {
      type: "application/x-www-form-urlencoded",
      encrypted: false,
    },
    status: 200,
    parseQuery: typia.http.createAssertQuery<IHeaders>(),
  } as const;

  export const path = (section: string) =>
    `/headers/${encodeURIComponent(section?.toString() ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Resolved<IHeaders>> => typia.random<Resolved<IHeaders>>(g);
  export const simulate = (
    connection: IConnection<emplace.Headers>,
    section: string,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(section),
      contentType: "application/x-www-form-urlencoded",
    });
    assert.param("section")(() => typia.assert(section));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * Store a new article.
 *
 * @param section Target section code
 * @returns Store article
 * @author Samchon
 *
 * @controller HeadersController.store
 * @path POST /headers/:section
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function store(
  connection: IConnection<store.Headers>,
  section: string,
  input: store.Input,
): Promise<store.Output> {
  return !!connection.simulate
    ? store.simulate(connection, section, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...store.METADATA,
          template: store.METADATA.path,
          path: store.path(section),
        },
        input,
      );
}
export namespace store {
  export type Headers = Resolved<IHeaders>;
  export type Input = Resolved<IBbsArticle.IStore>;
  export type Output = Primitive<IBbsArticle>;

  export const METADATA = {
    method: "POST",
    path: "/headers/:section",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 201,
  } as const;

  export const path = (section: string) =>
    `/headers/${encodeURIComponent(section?.toString() ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IBbsArticle>> =>
    typia.random<Primitive<IBbsArticle>>(g);
  export const simulate = (
    connection: IConnection<store.Headers>,
    section: string,
    input: store.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(section),
      contentType: "application/json",
    });
    assert.param("section")(() => typia.assert(section));
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * Update an article.
 *
 * @param section Target section code
 * @param id Target article id
 * @param input Content to update
 * @author Samchon
 *
 * @controller HeadersController.update
 * @path PUT /headers/:section/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function update(
  connection: IConnection,
  section: string,
  id: string & Format<"uuid">,
  input: update.Input,
): Promise<void> {
  return !!connection.simulate
    ? update.simulate(connection, section, id, input)
    : PlainFetcher.fetch(
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

  export const METADATA = {
    method: "PUT",
    path: "/headers/:section/:id",
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
    `/headers/${encodeURIComponent(section?.toString() ?? "null")}/${encodeURIComponent(id?.toString() ?? "null")}`;
  export const random = (g?: Partial<typia.IRandomGenerator>): Resolved<void> =>
    typia.random<void>(g);
  export const simulate = (
    connection: IConnection,
    section: string,
    id: string & Format<"uuid">,
    input: update.Input,
  ): void => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(section, id),
      contentType: "application/json",
    });
    assert.param("section")(() => typia.assert(section));
    assert.param("id")(() => typia.assert(id));
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
