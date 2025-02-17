/**
 * @packageDocumentation
 * @module api.functional.param
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Format } from "typia/lib/tags/Format";

/**
 * @controller TypedParamController.boolean
 * @path GET /param/:value/boolean
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function boolean(
  connection: IConnection,
  value: false | true,
): Promise<boolean.Output> {
  return PlainFetcher.fetch(connection, {
    ...boolean.METADATA,
    template: boolean.METADATA.path,
    path: boolean.path(value),
  });
}
export namespace boolean {
  export type Output = Primitive<false | true>;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/boolean",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: false | true) =>
    `/param/${encodeURIComponent(value ?? "null")}/boolean`;
}

/**
 * @controller TypedParamController.number
 * @path GET /param/:value/number
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function number(
  connection: IConnection,
  value: number,
): Promise<number.Output> {
  return PlainFetcher.fetch(connection, {
    ...number.METADATA,
    template: number.METADATA.path,
    path: number.path(value),
  });
}
export namespace number {
  export type Output = Primitive<number>;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/number",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: number) =>
    `/param/${encodeURIComponent(value ?? "null")}/number`;
}

/**
 * @controller TypedParamController.string
 * @path GET /param/:value/string
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function string(
  connection: IConnection,
  value: string,
): Promise<string.Output> {
  return PlainFetcher.fetch(connection, {
    ...string.METADATA,
    template: string.METADATA.path,
    path: string.path(value),
  });
}
export namespace string {
  export type Output = Primitive<string>;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/string",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: string) =>
    `/param/${encodeURIComponent(value ?? "null")}/string`;
}

/**
 * @controller TypedParamController.nullable
 * @path GET /param/:value/nullable
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function nullable(
  connection: IConnection,
  value: null | string,
): Promise<nullable.Output> {
  return PlainFetcher.fetch(connection, {
    ...nullable.METADATA,
    template: nullable.METADATA.path,
    path: nullable.path(value),
  });
}
export namespace nullable {
  export type Output = Primitive<null | string>;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/nullable",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: null | string) =>
    `/param/${encodeURIComponent(value ?? "null")}/nullable`;
}

/**
 * @controller TypedParamController.literal
 * @path GET /param/:value/literal
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function literal(
  connection: IConnection,
  value: "A" | "B" | "C",
): Promise<literal.Output> {
  return PlainFetcher.fetch(connection, {
    ...literal.METADATA,
    template: literal.METADATA.path,
    path: literal.path(value),
  });
}
export namespace literal {
  export type Output = Primitive<"A" | "B" | "C">;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/literal",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: "A" | "B" | "C") =>
    `/param/${encodeURIComponent(value ?? "null")}/literal`;
}

/**
 * @controller TypedParamController.uuid
 * @path GET /param/:value/uuid
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function uuid(
  connection: IConnection,
  value: string & Format<"uuid">,
): Promise<uuid.Output> {
  return PlainFetcher.fetch(connection, {
    ...uuid.METADATA,
    template: uuid.METADATA.path,
    path: uuid.path(value),
  });
}
export namespace uuid {
  export type Output = Primitive<string>;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/uuid",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: string & Format<"uuid">) =>
    `/param/${encodeURIComponent(value ?? "null")}/uuid`;
}

/**
 * @controller TypedParamController.date
 * @path GET /param/:value/date
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function date(
  connection: IConnection,
  value: string & Format<"date">,
): Promise<date.Output> {
  return PlainFetcher.fetch(connection, {
    ...date.METADATA,
    template: date.METADATA.path,
    path: date.path(value),
  });
}
export namespace date {
  export type Output = Primitive<string>;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/date",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: string & Format<"date">) =>
    `/param/${encodeURIComponent(value ?? "null")}/date`;
}

/**
 * @controller TypedParamController.uuid_nullable
 * @path GET /param/:value/uuid_nullable
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function uuid_nullable(
  connection: IConnection,
  value: null | (string & Format<"uuid">),
): Promise<uuid_nullable.Output> {
  return PlainFetcher.fetch(connection, {
    ...uuid_nullable.METADATA,
    template: uuid_nullable.METADATA.path,
    path: uuid_nullable.path(value),
  });
}
export namespace uuid_nullable {
  export type Output = Primitive<null | string>;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/uuid_nullable",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: null | (string & Format<"uuid">)) =>
    `/param/${encodeURIComponent(value ?? "null")}/uuid_nullable`;
}

/**
 * @controller TypedParamController.date_nullable
 * @path GET /param/:value/date_nullable
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function date_nullable(
  connection: IConnection,
  value: null | (string & Format<"date">),
): Promise<date_nullable.Output> {
  return PlainFetcher.fetch(connection, {
    ...date_nullable.METADATA,
    template: date_nullable.METADATA.path,
    path: date_nullable.path(value),
  });
}
export namespace date_nullable {
  export type Output = Primitive<null | string>;

  export const METADATA = {
    method: "GET",
    path: "/param/:value/date_nullable",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (value: null | (string & Format<"date">)) =>
    `/param/${encodeURIComponent(value ?? "null")}/date_nullable`;
}
