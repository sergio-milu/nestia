/**
 * @packageDocumentation
 * @module api.functional.sellers.authenticate
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, IPropagation, HttpError } from "@nestia/fetcher";
import { EncryptedFetcher } from "@nestia/fetcher/lib/EncryptedFetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { ISeller } from "../../../structures/ISeller";
import { NestiaSimulator } from "../../../utils/NestiaSimulator";

export * as password from "./password";

/**
 * Join as a seller.
 *
 * @param input Information of yours
 * @return Information of newly joined seller
 * @setHeader authorization.token Authorization
 *
 * @controller SellerAuthenticateController.join
 * @path POST /sellers/authenticate/join
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function join(
  connection: IConnection,
  input: join.Input,
): Promise<join.Output> {
  return !!connection.simulate
    ? join.simulate(connection, input)
    : EncryptedFetcher.propagate(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "text/plain",
          },
        },
        {
          ...join.METADATA,
          path: join.path(),
        },
        input,
      );
}
export namespace join {
  export type Input = ISeller.IJoin;
  export type Output = IPropagation<{
    201: ISeller.IAuthorized;
  }>;

  export const METADATA = {
    method: "POST",
    path: "/sellers/authenticate/join",
    request: {
      type: "text/plain",
      encrypted: true,
    },
    response: {
      type: "text/plain",
      encrypted: true,
    },
    status: null,
  } as const;

  export const path = () => "/sellers/authenticate/join";
  export const random = (g?: Partial<typia.IRandomGenerator>) =>
    typia.random<ISeller.IAuthorized>(g);
  export const simulate = (
    connection: IConnection,
    input: join.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "text/plain",
    });
    try {
      assert.body(() => typia.assert(input));
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
        "Content-Type": "text/plain",
      },
      data: random(
        "object" === typeof connection.simulate && null !== connection.simulate
          ? connection.simulate
          : undefined,
      ),
    };
  };
}

/**
 * Log-in as a seller.
 *
 * @param input Email and password
 * @return Information of the seller
 * @assignHeaders authorization
 *
 * @controller SellerAuthenticateController.login
 * @path POST /sellers/authenticate/login
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function login(
  connection: IConnection,
  input: login.Input,
): Promise<login.Output> {
  return !!connection.simulate
    ? login.simulate(connection, input)
    : EncryptedFetcher.propagate(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "text/plain",
          },
        },
        {
          ...login.METADATA,
          path: login.path(),
        },
        input,
      );
}
export namespace login {
  export type Input = ISeller.ILogin;
  export type Output = IPropagation<{
    201: ISeller.IAuthorized;
  }>;

  export const METADATA = {
    method: "POST",
    path: "/sellers/authenticate/login",
    request: {
      type: "text/plain",
      encrypted: true,
    },
    response: {
      type: "text/plain",
      encrypted: true,
    },
    status: null,
  } as const;

  export const path = () => "/sellers/authenticate/login";
  export const random = (g?: Partial<typia.IRandomGenerator>) =>
    typia.random<ISeller.IAuthorized>(g);
  export const simulate = (
    connection: IConnection,
    input: login.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "text/plain",
    });
    try {
      assert.body(() => typia.assert(input));
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
        "Content-Type": "text/plain",
      },
      data: random(
        "object" === typeof connection.simulate && null !== connection.simulate
          ? connection.simulate
          : undefined,
      ),
    };
  };
}

/**
 * Erase the seller by itself.
 *
 * @controller SellerAuthenticateController.exit
 * @path DELETE /sellers/authenticate/exit
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function exit(connection: IConnection): Promise<exit.Output> {
  return !!connection.simulate
    ? exit.simulate(connection)
    : PlainFetcher.propagate(connection, {
        ...exit.METADATA,
        path: exit.path(),
      });
}
export namespace exit {
  export type Output = IPropagation<{
    200: undefined;
  }>;

  export const METADATA = {
    method: "DELETE",
    path: "/sellers/authenticate/exit",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/sellers/authenticate/exit";
  export const random = (g?: Partial<typia.IRandomGenerator>) =>
    typia.random<undefined>(g);
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
