/**
 * @packageDocumentation
 * @module api.functional.multipart
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, FormDataInput } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Primitive } from "typia";

import type { IMultipart } from "../../structures/IMultipart";

/**
 * @controller MultipartController.post
 * @path POST /multipart
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function post(
  connection: IConnection,
  body: post.Input,
): Promise<post.Output> {
  return PlainFetcher.fetch(
    connection,
    {
      ...post.METADATA,
      template: post.METADATA.path,
      path: post.path(),
    },
    body,
  );
}
export namespace post {
  export type Input = FormDataInput<IMultipart>;
  export type Output = Primitive<IMultipart.IContent>;

  export const METADATA = {
    method: "POST",
    path: "/multipart",
    request: {
      type: "multipart/form-data",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 201,
  } as const;

  export const path = () => "/multipart";
}
