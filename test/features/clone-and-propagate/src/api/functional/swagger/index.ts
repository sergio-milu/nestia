/**
 * @packageDocumentation
 * @module api.functional.swagger
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, IPropagation } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { ISwagger } from "../../structures/ISwagger";

/**
 * @controller SwaggerController.get
 * @path GET /swagger
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function get(connection: IConnection): Promise<get.Output> {
  return !!connection.simulate
    ? get.simulate(connection)
    : PlainFetcher.propagate(connection, {
        ...get.METADATA,
        path: get.path(),
      });
}
export namespace get {
  export type Output = IPropagation<{
    200: ISwagger;
  }>;

  export const METADATA = {
    method: "GET",
    path: "/swagger",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/swagger";
  export const random = (g?: Partial<typia.IRandomGenerator>) =>
    typia.random<ISwagger>(g);
  export const simulate = (connection: IConnection): Output => {
    return {
      success: true,
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      data: random(
        "object" === typeof connection.simulate && null !== connection.simulate
          ? connection.simulate
          : undefined,
      ),
    };
  };
}
