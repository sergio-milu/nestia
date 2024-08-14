/**
 * @packageDocumentation
 * @module api.functional
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Resolved, Primitive } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

import type { IRequestDto } from "../structures/IRequestDto";

export * as health from "./health";
export * as performance from "./performance";

/**
 * @controller RequestController.request
 * @path POST /request
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function request(
  connection: IConnection,
  input: request.Input,
): Promise<request.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...request.METADATA,
      template: request.METADATA.path,
      path: request.path(),
    },
    input,
  );
}
export namespace request {
  export type Input = Resolved<IRequestDto>;
  export type Output = Primitive<IRequestDto>;

  export const METADATA = {
    method: "POST",
    path: "/request",
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

  export const path = () => "/request";
}
