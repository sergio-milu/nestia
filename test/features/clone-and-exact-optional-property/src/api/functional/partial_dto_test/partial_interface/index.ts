/**
 * @packageDocumentation
 * @module api.functional.partial_dto_test.partial_interface
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, IPropagation, HttpError } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";
import type { Resolved } from "typia";

import type { IOriginal } from "../../../structures/IOriginal";
import type { IPartialInterface } from "../../../structures/IPartialInterface";

/**
 * @controller PartialDTOTestController.partialInterface
 * @path POST /partial-dto-test/partial-interface
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function partialInterface(
  connection: IConnection,
  body: partialInterface.Input,
): Promise<partialInterface.Output> {
  return !!connection.simulate
    ? partialInterface.simulate(connection, body)
    : PlainFetcher.propagate<any, any>(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...partialInterface.METADATA,
          template: partialInterface.METADATA.path,
          path: partialInterface.path(),
        },
        body,
      );
}
export namespace partialInterface {
  export type Input = IOriginal.IPartialInterface;
  export type Output = IPropagation<
    {
      201: IPartialInterface;
    },
    201
  >;

  export const METADATA = {
    method: "POST",
    path: "/partial-dto-test/partial-interface",
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

  export const path = () => "/partial-dto-test/partial-interface";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<IPartialInterface> => typia.random<IPartialInterface>(g);
  export const simulate = (
    connection: IConnection,
    body: partialInterface.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    try {
      assert.body(() => typia.assert(body));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return {
      success: true,
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
      data: random(
        "object" === typeof connection.simulate && null !== connection.simulate
          ? connection.simulate
          : undefined,
      ),
    } as Output;
  };
}
