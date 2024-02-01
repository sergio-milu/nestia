import ts from "typescript";
import { ExpressionFactory } from "typia/lib/factories/ExpressionFactory";

import { FilePrinter } from "../utils/FilePrinter";
import { MapUtil } from "../utils/MapUtil";

export class ImportProgrammer {
  private external_: Map<
    string,
    {
      default: string | null;
      instances: Set<string>;
    }
  > = new Map();
  private dtos_: Set<string> = new Set();

  public constructor() {}

  public empty(): boolean {
    return this.external_.size === 0 && this.dtos_.size === 0;
  }

  public external(props: ImportProgrammer.IProps): string {
    const element = MapUtil.take(this.external_)(props.library)(() => ({
      default: null,
      instances: new Set(),
    }));
    const name: string = props.name.split(".")[0];
    if (props.type === "default") element.default = props.name;
    else element.instances.add(name);
    return name;
  }

  public dto(name: string): ts.TypeReferenceNode {
    const file: string = name.split(".")[0];
    this.dtos_.add(file);
    return ts.factory.createTypeReferenceNode(name);
  }

  public tag(type: string, arg: number | string): ts.TypeReferenceNode {
    this.external({
      type: "instance",
      library: "typia",
      name: "tags",
    });
    return ts.factory.createTypeReferenceNode(`tags.${type}`, [
      ts.factory.createLiteralTypeNode(
        typeof arg === "string"
          ? ts.factory.createStringLiteral(arg)
          : ExpressionFactory.number(arg),
      ),
    ]);
  }

  public toStatements(
    dtoPath: (name: string) => string,
    current?: string,
  ): ts.Statement[] {
    return [
      ...[...this.external_.entries()].map(([library, props]) => {
        return ts.factory.createImportDeclaration(
          undefined,
          ts.factory.createImportClause(
            false,
            props.default !== null
              ? ts.factory.createIdentifier(props.default)
              : undefined,
            props.instances.size
              ? ts.factory.createNamedImports(
                  [...props.instances].map((i) =>
                    ts.factory.createImportSpecifier(
                      false,
                      undefined,
                      ts.factory.createIdentifier(i),
                    ),
                  ),
                )
              : undefined,
          ),
          ts.factory.createStringLiteral(library),
        );
      }),
      ...(this.external_.size && this.dtos_.size ? [FilePrinter.enter()] : []),
      ...[...this.dtos_]
        .filter(
          current ? (name) => name !== current!.split(".")[0] : () => true,
        )
        .map((i) =>
          ts.factory.createImportDeclaration(
            undefined,
            ts.factory.createImportClause(
              false,
              undefined,
              ts.factory.createNamedImports([
                ts.factory.createImportSpecifier(
                  false,
                  undefined,
                  ts.factory.createIdentifier(i),
                ),
              ]),
            ),
            ts.factory.createStringLiteral(dtoPath(i)),
          ),
        ),
    ];
  }
}
export namespace ImportProgrammer {
  export interface IProps {
    type: "default" | "instance";
    library: string;
    name: string;
  }
}
