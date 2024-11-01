/**
 * @packageDocumentation
 * @module api.functional.objectUnionExplicit
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, IPropagation } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";
import type { Resolved } from "typia";

import type { DiscriminatorcircleICircle } from "../../structures/DiscriminatorcircleICircle";
import type { DiscriminatorlineILine } from "../../structures/DiscriminatorlineILine";
import type { DiscriminatorpointIPoint } from "../../structures/DiscriminatorpointIPoint";
import type { DiscriminatorpolygonIPolygon } from "../../structures/DiscriminatorpolygonIPolygon";
import type { DiscriminatorpolylineIPolyline } from "../../structures/DiscriminatorpolylineIPolyline";
import type { DiscriminatorrectangleIRectangle } from "../../structures/DiscriminatorrectangleIRectangle";
import type { DiscriminatortriangleITriangle } from "../../structures/DiscriminatortriangleITriangle";

/**
 * @controller ObjectUnionExplicitController.get
 * @path GET /objectUnionExplicit
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function get(connection: IConnection): Promise<get.Output> {
  return !!connection.simulate
    ? get.simulate(connection)
    : PlainFetcher.propagate<any>(connection, {
        ...get.METADATA,
        template: get.METADATA.path,
        path: get.path(),
      });
}
export namespace get {
  export type Output = IPropagation<
    {
      200: (
        | DiscriminatorpointIPoint
        | DiscriminatorlineILine
        | DiscriminatortriangleITriangle
        | DiscriminatorrectangleIRectangle
        | DiscriminatorpolylineIPolyline
        | DiscriminatorpolygonIPolygon
        | DiscriminatorcircleICircle
      )[];
    },
    200
  >;

  export const METADATA = {
    method: "GET",
    path: "/objectUnionExplicit",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = () => "/objectUnionExplicit";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<
    (
      | DiscriminatorpointIPoint
      | DiscriminatorlineILine
      | DiscriminatortriangleITriangle
      | DiscriminatorrectangleIRectangle
      | DiscriminatorpolylineIPolyline
      | DiscriminatorpolygonIPolygon
      | DiscriminatorcircleICircle
    )[]
  > =>
    typia.random<
      (
        | DiscriminatorpointIPoint
        | DiscriminatorlineILine
        | DiscriminatortriangleITriangle
        | DiscriminatorrectangleIRectangle
        | DiscriminatorpolylineIPolyline
        | DiscriminatorpolygonIPolygon
        | DiscriminatorcircleICircle
      )[]
    >(g);
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
    } as Output;
  };
}
