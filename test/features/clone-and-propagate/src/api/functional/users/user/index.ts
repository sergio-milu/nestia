/**
 * @packageDocumentation
 * @module api.functional.users.user
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, IPropagation, HttpError } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";
import type { Resolved } from "typia";

import type { IUser } from "../../../structures/IUser";
import type { PartialPickIUsernameemailoptional_attrnullable_attr } from "../../../structures/PartialPickIUsernameemailoptional_attrnullable_attr";

/**
 * - When namespaced DTO type comes, `@nestia/sdk` had taken a mistake that writing only the deepest type even in the top or middle level namespaced types.
 * - When propagation mode being used with `@TypedException<T>()` decorator, target `T` type had not been cloned.
 * - When `clone` mode being used in SDK generator, it was not possible to clone recursive DTO type.
 * - check optional query DTO
 * - when use HttpCode decorator, sdk build fail code
 *
 * @throws 404
 *
 * @controller UsersController.getUserProfile
 * @path GET /users/:user_id/user
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getUserProfile(
  connection: IConnection,
  user_id: string,
  query: getUserProfile.Query,
): Promise<getUserProfile.Output> {
  return !!connection.simulate
    ? getUserProfile.simulate(connection, user_id, query)
    : PlainFetcher.propagate<any>(connection, {
        ...getUserProfile.METADATA,
        template: getUserProfile.METADATA.path,
        path: getUserProfile.path(user_id, query),
      });
}
export namespace getUserProfile {
  export type Query = IUser.ISearch;
  export type Output = IPropagation<
    {
      202: IUser;
      404: "404 Not Found";
    },
    202
  >;

  export const METADATA = {
    method: "GET",
    path: "/users/:user_id/user",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 202,
  } as const;

  export const path = (user_id: string, query: getUserProfile.Query) => {
    const variables: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query as any))
      if (undefined === value) continue;
      else if (Array.isArray(value))
        value.forEach((elem: any) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location: string = `/users/${encodeURIComponent(user_id?.toString() ?? "null")}/user`;
    return 0 === variables.size
      ? location
      : `${location}?${variables.toString()}`;
  };
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<IUser> => typia.random<IUser>(g);
  export const simulate = (
    connection: IConnection,
    user_id: string,
    query: getUserProfile.Query,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(user_id, query),
      contentType: "application/json",
    });
    try {
      assert.param("user_id")(() => typia.assert(user_id));
      assert.query(() => typia.assert(query));
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
      status: 202,
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

/**
 * - check optional, nullable property
 * @controller UsersController.updateUserProfile
 * @path POST /users/:user_id/user
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function updateUserProfile(
  connection: IConnection,
  user_id: string,
  body: updateUserProfile.Input,
): Promise<updateUserProfile.Output> {
  return !!connection.simulate
    ? updateUserProfile.simulate(connection, user_id, body)
    : PlainFetcher.propagate<any, any>(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...updateUserProfile.METADATA,
          template: updateUserProfile.METADATA.path,
          path: updateUserProfile.path(user_id),
        },
        body,
      );
}
export namespace updateUserProfile {
  export type Input = PartialPickIUsernameemailoptional_attrnullable_attr;
  export type Output = IPropagation<
    {
      201: IUser;
    },
    201
  >;

  export const METADATA = {
    method: "POST",
    path: "/users/:user_id/user",
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

  export const path = (user_id: string) =>
    `/users/${encodeURIComponent(user_id?.toString() ?? "null")}/user`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<IUser> => typia.random<IUser>(g);
  export const simulate = (
    connection: IConnection,
    user_id: string,
    body: updateUserProfile.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(user_id),
      contentType: "application/json",
    });
    try {
      assert.param("user_id")(() => typia.assert(user_id));
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
