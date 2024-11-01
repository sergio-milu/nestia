/**
 * @packageDocumentation
 * @module api.functional.body
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";
import type { Resolved } from "typia";
import type { Format } from "typia/lib/tags/Format";

/**
 * Store an article.
 *
 * @param input Content to store
 * @returns Newly archived article
 * @author Samchon
 * @warning This is an fake API
 *
 * @controller TypedBodyControlleer.store
 * @path POST /body
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function store(
  connection: IConnection,
  input: store.Input,
): Promise<store.Output> {
  return !!connection.simulate
    ? store.simulate(connection, input)
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
          path: store.path(),
        },
        input,
      );
}
export namespace store {
  export type Input = {
    title: string;
    body: string;
  };
  export type Output = {
    id: string;
    title: string;
    body: string;
  };

  export const METADATA = {
    method: "POST",
    path: "/body",
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

  export const path = () => "/body";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<{
    id: string;
    title: string;
    body: string;
  }> =>
    typia.random<{
      id: string;
      title: string;
      body: string;
    }>(g);
  export const simulate = (
    connection: IConnection,
    input: store.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * @controller TypedBodyControlleer.update
 * @path PUT /body/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function update(
  connection: IConnection,
  id: string & Format<"uuid">,
  input: update.Input,
): Promise<void> {
  return !!connection.simulate
    ? update.simulate(connection, id, input)
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
          path: update.path(id),
        },
        input,
      );
}
export namespace update {
  export type Input = {
    title: string;
    body: string;
  };

  export const METADATA = {
    method: "PUT",
    path: "/body/:id",
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

  export const path = (id: string & Format<"uuid">) =>
    `/body/${encodeURIComponent(id?.toString() ?? "null")}`;
  export const random = (g?: Partial<typia.IRandomGenerator>): Resolved<void> =>
    typia.random<void>(g);
  export const simulate = (
    connection: IConnection,
    id: string & Format<"uuid">,
    input: update.Input,
  ): void => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(id),
      contentType: "application/json",
    });
    assert.param("id")(() => typia.assert(id));
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
