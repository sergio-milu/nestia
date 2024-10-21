/**
 * @packageDocumentation
 * @module api.functional.google.drives.images.upload
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Resolved, Primitive } from "typia";

import type { IGoogleDriveFile } from "../../../../../structures/IGoogleDriveFile";
import type { IGoogleDriveImageSingleUpload } from "../../../../../structures/IGoogleDriveImageSingleUpload";
import type { IGoogleTokenActivate } from "../../../../../structures/IGoogleTokenActivate";

/**
 * 단일 이미지 파일 업로드.
 *
 * 단 하나의 이미지 파일을 구글 드라이브에 개별 업로드한다.
 *
 * @param accountCode 구글 계정명
 * @param input 단일 이미지 파일 업로드 정보
 * @returns 업로드 완료된 구글 드라이브 파일 정보
 * @tag Google
 *
 * @controller GoogleDriveImageUploadController.single
 * @path POST /google/:accountCode/drives/images/upload/single
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function single(
  connection: IConnection,
  accountCode: string,
  input: single.Input,
): Promise<single.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...single.METADATA,
      template: single.METADATA.path,
      path: single.path(accountCode),
    },
    input,
  );
}
export namespace single {
  export type Input = Resolved<IGoogleDriveImageSingleUpload>;
  export type Output = Primitive<IGoogleDriveFile>;

  export const METADATA = {
    method: "POST",
    path: "/google/:accountCode/drives/images/upload/single",
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

  export const path = (accountCode: string) =>
    `/google/${encodeURIComponent(accountCode?.toString() ?? "null")}/drives/images/upload/single`;
}

/**
 * @controller GoogleDriveImageUploadController.activate
 * @path POST /google/:accountCode/drives/images/upload/activate
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function activate(
  connection: IConnection,
  accountCode: string,
  input: activate.Input,
): Promise<void> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    },
    {
      ...activate.METADATA,
      template: activate.METADATA.path,
      path: activate.path(accountCode),
    },
    input,
  );
}
export namespace activate {
  export type Input = Resolved<IGoogleTokenActivate<"google-auth", never>>;

  export const METADATA = {
    method: "POST",
    path: "/google/:accountCode/drives/images/upload/activate",
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

  export const path = (accountCode: string) =>
    `/google/${encodeURIComponent(accountCode?.toString() ?? "null")}/drives/images/upload/activate`;
}
