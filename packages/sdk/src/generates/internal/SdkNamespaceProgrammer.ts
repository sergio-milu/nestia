import ts from "typescript";
import typia from "typia";
import { IdentifierFactory } from "typia/lib/factories/IdentifierFactory";
import { LiteralFactory } from "typia/lib/factories/LiteralFactory";
import { TypeFactory } from "typia/lib/factories/TypeFactory";
import { Escaper } from "typia/lib/utils/Escaper";

import { INestiaConfig } from "../../INestiaConfig";
import { IController } from "../../structures/IController";
import { IRoute } from "../../structures/IRoute";
import { ImportDictionary } from "../../utils/ImportDictionary";
import { SdkDtoGenerator } from "./SdkDtoGenerator";
import { SdkImportWizard } from "./SdkImportWizard";
import { SdkSimulationProgrammer } from "./SdkSimulationProgrammer";
import { SdkTypeDefiner } from "./SdkTypeDefiner";

export namespace SdkNamespaceProgrammer {
  export const generate =
    (config: INestiaConfig) =>
    (importer: ImportDictionary) =>
    (
      route: IRoute,
      props: {
        headers: IRoute.IParameter | undefined;
        query: IRoute.IParameter | undefined;
        input: IRoute.IParameter | undefined;
      },
    ): ts.ModuleDeclaration => {
      const types = generate_types(config)(importer)(route, props);
      return ts.factory.createModuleDeclaration(
        [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
        ts.factory.createIdentifier(route.name),
        ts.factory.createModuleBlock([
          ...types,
          generate_metadata(importer)(route, props),
          generate_path(config)(importer)(route, props.query),
          ...(config.simulate
            ? [
                SdkSimulationProgrammer.random(config)(importer)(route),
                SdkSimulationProgrammer.simulate(config)(importer)(route),
              ]
            : []),
        ]),
        ts.NodeFlags.Namespace,
      );
    };

  const generate_types =
    (config: INestiaConfig) =>
    (importer: ImportDictionary) =>
    (route: IRoute, props: {
      headers: IRoute.IParameter | undefined;
      query: IRoute.IParameter | undefined;
      input: IRoute.IParameter | undefined;
    }): ts.TypeAliasDeclaration[] => {
      const array: ts.TypeAliasDeclaration[] = [];
      const declare = (name: string, type: string) =>
        array.push(
          ts.factory.createTypeAliasDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            name,
            undefined,
            ts.factory.createTypeReferenceNode(type),
          ),
        );
      if (props.headers !== undefined)
        declare(
          "Headers",
          SdkTypeDefiner.headers(config)(importer)(props.headers),
        );
      if (props.query !== undefined)
        declare("Query", SdkTypeDefiner.query(config)(importer)(props.query));
      if (props.input !== undefined)
        declare("Input", SdkTypeDefiner.input(config)(importer)(props.input));
      if (config.propagate === true || route.output.typeName !== "void")
        declare(
          "Output",
          SdkTypeDefiner.output(config)(importer)(route),
        );
      return array;
    };

  const generate_metadata =
    (importer: ImportDictionary) =>
    (
      route: IRoute,
      props: {
        headers: IRoute.IParameter | undefined;
        query: IRoute.IParameter | undefined;
        input: IRoute.IParameter | undefined;
      },
    ): ts.VariableStatement =>
      constant("METADATA")(
        ts.factory.createAsExpression(
          ts.factory.createObjectLiteralExpression(
            [
              ts.factory.createPropertyAssignment(
                "method",
                ts.factory.createStringLiteral(route.method),
              ),
              ts.factory.createPropertyAssignment(
                "path",
                ts.factory.createStringLiteral(route.path),
              ),
              ts.factory.createPropertyAssignment(
                "request",
                props.input
                  ? LiteralFactory.generate(
                      typia.is<IController.IBodyParameter>(props.input)
                        ? {
                            type: props.input.contentType,
                            encrypted: !!props.input.encrypted,
                          }
                        : {
                            type: "application/json",
                            encrypted: false,
                          },
                    )
                  : ts.factory.createNull(),
              ),
              ts.factory.createPropertyAssignment(
                "response",
                route.method !== "HEAD"
                  ? LiteralFactory.generate({
                      type: route.output.contentType,
                      encrypted: !!route.encrypted,
                    })
                  : ts.factory.createNull(),
              ),
              ts.factory.createPropertyAssignment(
                "status",
                route.status !== undefined
                  ? ts.factory.createNumericLiteral(route.status)
                  : ts.factory.createNull(),
              ),
              ...(route.output.contentType ===
              "application/x-www-form-urlencoded"
                ? [
                    ts.factory.createPropertyAssignment(
                      "parseQuery",
                      ts.factory.createCallExpression(
                        null!,
                        [
                          ts.factory.createTypeReferenceNode(
                            ts.factory.createIdentifier(
                              `${SdkImportWizard.typia(importer)}.http.createAssertQuery`,
                            ),
                            [
                              ts.factory.createTypeReferenceNode(
                                ts.factory.createIdentifier(
                                  route.output.typeName,
                                ),
                              ),
                            ],
                          ),
                        ],
                        undefined,
                      ),
                    ),
                  ]
                : []),
            ],
            true,
          ),
          ts.factory.createTypeReferenceNode(
            ts.factory.createIdentifier("const"),
          ),
        ),
      );

  const generate_path =
    (config: INestiaConfig) =>
    (importer: ImportDictionary) =>
    (
      route: IRoute,
      query: IRoute.IParameter | undefined,
    ): ts.VariableStatement => {
      const g = {
        total: [
          ...route.parameters.filter(
            (param) => param.category === "param" || param.category === "query",
          ),
        ],
        query: route.parameters.filter(
          (param) => param.category === "query" && param.field !== undefined,
        ),
        path: route.parameters.filter((param) => param.category === "param"),
      };
      const out = (body: ts.ConciseBody) =>
        constant("path")(
          ts.factory.createArrowFunction(
            [],
            [],
            g.total.map((p) =>
              IdentifierFactory.parameter(
                p.name,
                ts.factory.createTypeReferenceNode(
                  p === query
                    ? `${route.name}.Query`
                    : getType(config)(importer)(p),
                ),
              ),
            ),
            undefined,
            undefined,
            body,
          ),
        );
      if (g.total.length === 0)
        return out(ts.factory.createStringLiteral(route.path));

      const template = () => {
        const splitted: string[] = route.path.split(":");
        return ts.factory.createTemplateExpression(
          ts.factory.createTemplateHead(splitted[0]),
          splitted.slice(1).map((s, i, arr) => {
            const name: string = s.split("/")[0];
            return ts.factory.createTemplateSpan(
              ts.factory.createIdentifier(
                g.path.find((p) => p.field === name)!.name,
              ),
              (
                i !== arr.length - 1
                  ? ts.factory.createTemplateMiddle 
                  : ts.factory.createTemplateTail
              )(s.substring(name.length))
            );
          }),
        );
      };
      if (query === undefined && g.query.length === 0) return out(template());

      const block = (expr: ts.Expression) => {
        const computeName = (str: string): string =>
          g.total
            .filter((p) => p.category !== "headers")
            .find((p) => p.name === str) !== undefined
            ? computeName("_" + str)
            : str;
        const variables: string = computeName("variables");
        const search: string = computeName("search");
        const encoded: string = computeName("encoded");
        return ts.factory.createBlock(
          [
            local(variables)("Record<any, any>")(
              ts.factory.createAsExpression(expr, TypeFactory.keyword("any")),
            ),
            local(search)("URLSearchParams")(
              ts.factory.createNewExpression(
                ts.factory.createIdentifier("URLSearchParams"),
                [],
                [],
              ),
            ),
            ts.factory.createForOfStatement(
              undefined,
              ts.factory.createVariableDeclarationList(
                [
                  ts.factory.createVariableDeclaration(
                    ts.factory.createArrayBindingPattern([
                      ts.factory.createBindingElement(
                        undefined,
                        undefined,
                        ts.factory.createIdentifier("key"),
                        undefined,
                      ),
                      ts.factory.createBindingElement(
                        undefined,
                        undefined,
                        ts.factory.createIdentifier("value"),
                        undefined,
                      ),
                    ]),
                    undefined,
                    undefined,
                    undefined,
                  ),
                ],
                ts.NodeFlags.Const
              ),
              ts.factory.createCallExpression(
                ts.factory.createIdentifier("Object.entries"),
                undefined,
                [ts.factory.createIdentifier(variables)],
              ),
              ts.factory.createIfStatement(
                ts.factory.createStrictEquality(
                  ts.factory.createIdentifier("undefined"),
                  ts.factory.createIdentifier("value"),
                ),
                ts.factory.createContinueStatement(),
                ts.factory.createIfStatement(
                  ts.factory.createCallExpression(
                    ts.factory.createIdentifier("Array.isArray"),
                    undefined,
                    [ts.factory.createIdentifier("value")],
                  ),
                  ts.factory.createExpressionStatement(
                    ts.factory.createCallExpression(
                      ts.factory.createPropertyAccessExpression(
                        ts.factory.createIdentifier("value"),
                        ts.factory.createIdentifier("forEach"),
                      ),
                      undefined,
                      [
                        ts.factory.createArrowFunction(
                          undefined,
                          undefined,
                          [IdentifierFactory.parameter("elem")],
                          undefined,
                          undefined,
                          ts.factory.createCallExpression(
                            IdentifierFactory.access(
                              ts.factory.createIdentifier(search),
                            )("append"),
                            undefined,
                            [
                              ts.factory.createIdentifier("key"),
                              ts.factory.createCallExpression(
                                ts.factory.createIdentifier("String"),
                                undefined,
                                [ts.factory.createIdentifier("elem")],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  ts.factory.createExpressionStatement(
                    ts.factory.createCallExpression(
                      IdentifierFactory.access(
                        ts.factory.createIdentifier(search),
                      )("set"),
                      undefined,
                      [
                        ts.factory.createIdentifier("key"),
                        ts.factory.createCallExpression(
                          ts.factory.createIdentifier("String"),
                          undefined,
                          [ts.factory.createIdentifier("value")],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            local("location")("string")(template()),
            local(encoded)("string")(
              ts.factory.createCallExpression(
                IdentifierFactory.access(ts.factory.createIdentifier(search))(
                  "toString",
                ),
                undefined,
                [],
              ),
            ),
            ts.factory.createReturnStatement(
              ts.factory.createConditionalExpression(
                ts.factory.createStrictEquality(
                  ts.factory.createNumericLiteral(0),
                  IdentifierFactory.access(
                    ts.factory.createIdentifier(encoded),
                  )("length"),
                ),
                undefined,
                ts.factory.createIdentifier("location"),
                undefined,
                ts.factory.createTemplateExpression(
                  ts.factory.createTemplateHead(""),
                  [
                    ts.factory.createTemplateSpan(
                      ts.factory.createIdentifier("location"),
                      ts.factory.createTemplateMiddle("?"),
                    ),
                    ts.factory.createTemplateSpan(
                      ts.factory.createIdentifier("encoded"),
                      ts.factory.createTemplateTail(""),
                    ),
                  ],
                ),
              ),
            ),
          ],
          true,
        );
      };
      if (query !== undefined && g.query.length === 0)
        return out(block(ts.factory.createIdentifier(query.name)));
      return out(
        block(
          ts.factory.createObjectLiteralExpression(
            [
              ...(query
                ? [
                    ts.factory.createSpreadAssignment(
                      ts.factory.createIdentifier(query.name),
                    ),
                  ]
                : []),
              ...g.query.map((q) =>
                q.name === q.field
                  ? ts.factory.createShorthandPropertyAssignment(q.name)
                  : ts.factory.createPropertyAssignment(
                      Escaper.variable(q.field!)
                        ? q.field!
                        : ts.factory.createStringLiteral(q.field!),
                      ts.factory.createIdentifier(q.name),
                    ),
              ),
            ],
            true,
          ),
        ),
      );
    };
}

const local = (name: string) => (type: string) => (expression: ts.Expression) =>
  ts.factory.createVariableStatement(
    [],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(name),
          undefined,
          ts.factory.createTypeReferenceNode(type),
          expression,
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
const constant = (name: string) => (expression: ts.Expression) =>
  ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          ts.factory.createIdentifier(name),
          undefined,
          undefined,
          expression,
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
const getType =
  (config: INestiaConfig) =>
  (importer: ImportDictionary) =>
  (p: IRoute.IParameter | IRoute.IOutput) =>
    p.metadata
      ? SdkDtoGenerator.decode(config)(importer)(p.metadata)
      : p.typeName;
