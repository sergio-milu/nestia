import ts from "typescript";
import typia from "typia";
import { ExpressionFactory } from "typia/lib/factories/ExpressionFactory";
import { IdentifierFactory } from "typia/lib/factories/IdentifierFactory";
import { LiteralFactory } from "typia/lib/factories/LiteralFactory";
import { TypeFactory } from "typia/lib/factories/TypeFactory";
import { Escaper } from "typia/lib/utils/Escaper";

import { INestiaProject } from "../../structures/INestiaProject";
import { IReflectHttpOperation } from "../../structures/IReflectHttpOperation";
import { ITypedHttpRoute } from "../../structures/ITypedHttpRoute";
import { FilePrinter } from "./FilePrinter";
import { ImportDictionary } from "./ImportDictionary";
import { SdkAliasCollection } from "./SdkAliasCollection";
import { SdkHttpSimulationProgrammer } from "./SdkHttpSimulationProgrammer";
import { SdkImportWizard } from "./SdkImportWizard";
import { SdkTypeProgrammer } from "./SdkTypeProgrammer";

export namespace SdkHttpNamespaceProgrammer {
  export const write =
    (project: INestiaProject) =>
    (importer: ImportDictionary) =>
    (
      route: ITypedHttpRoute,
      props: {
        headers: ITypedHttpRoute.IParameter | undefined;
        query: ITypedHttpRoute.IParameter | undefined;
        input: ITypedHttpRoute.IParameter | undefined;
      },
    ): ts.ModuleDeclaration => {
      const types = write_types(project)(importer)(route, props);
      return ts.factory.createModuleDeclaration(
        [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
        ts.factory.createIdentifier(route.name),
        ts.factory.createModuleBlock([
          ...types,
          ...(types.length ? [FilePrinter.enter()] : []),
          write_metadata(importer)(route, props),
          FilePrinter.enter(),
          write_path(project)(importer)(route, props),
          ...(project.config.simulate
            ? [
                SdkHttpSimulationProgrammer.random(project)(importer)(route),
                SdkHttpSimulationProgrammer.simulate(project)(importer)(
                  route,
                  props,
                ),
              ]
            : []),
          ...(project.config.json &&
          typia.is<IReflectHttpOperation.IBodyParameter>(props.input) &&
          (props.input.contentType === "application/json" ||
            props.input.encrypted === true)
            ? [write_stringify(project)(importer)]
            : []),
        ]),
        ts.NodeFlags.Namespace,
      );
    };

  const write_types =
    (project: INestiaProject) =>
    (importer: ImportDictionary) =>
    (
      route: ITypedHttpRoute,
      props: {
        headers: ITypedHttpRoute.IParameter | undefined;
        query: ITypedHttpRoute.IParameter | undefined;
        input: ITypedHttpRoute.IParameter | undefined;
      },
    ): ts.TypeAliasDeclaration[] => {
      const array: ts.TypeAliasDeclaration[] = [];
      const declare = (name: string, type: ts.TypeNode) =>
        array.push(
          ts.factory.createTypeAliasDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
            name,
            undefined,
            type,
          ),
        );
      if (props.headers !== undefined)
        declare(
          "Headers",
          SdkAliasCollection.headers(project)(importer)(props.headers),
        );
      if (props.query !== undefined)
        declare(
          "Query",
          SdkAliasCollection.query(project)(importer)(props.query),
        );
      if (props.input !== undefined)
        declare(
          "Input",
          SdkAliasCollection.input(project)(importer)(props.input),
        );
      if (project.config.propagate === true || route.output.typeName !== "void")
        declare("Output", SdkAliasCollection.output(project)(importer)(route));
      return array;
    };

  const write_metadata =
    (importer: ImportDictionary) =>
    (
      route: ITypedHttpRoute,
      props: {
        headers: ITypedHttpRoute.IParameter | undefined;
        query: ITypedHttpRoute.IParameter | undefined;
        input: ITypedHttpRoute.IParameter | undefined;
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
                      typia.is<IReflectHttpOperation.IBodyParameter>(
                        props.input,
                      )
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
                  ? ExpressionFactory.number(route.status)
                  : ts.factory.createNull(),
              ),
              ...(route.output.contentType ===
              "application/x-www-form-urlencoded"
                ? [
                    ts.factory.createPropertyAssignment(
                      "parseQuery",
                      ts.factory.createCallExpression(
                        ts.factory.createIdentifier(
                          `${SdkImportWizard.typia(importer)}.http.createAssertQuery`,
                        ),
                        [
                          ts.factory.createTypeReferenceNode(
                            route.output.typeName,
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

  const write_path =
    (project: INestiaProject) =>
    (importer: ImportDictionary) =>
    (
      route: ITypedHttpRoute,
      props: {
        query: ITypedHttpRoute.IParameter | undefined;
      },
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
                p === props.query
                  ? ts.factory.createTypeReferenceNode(`${route.name}.Query`)
                  : getType(project)(importer)(p),
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
        if (splitted.length === 1)
          return ts.factory.createStringLiteral(route.path);
        return ts.factory.createTemplateExpression(
          ts.factory.createTemplateHead(splitted[0]),
          splitted.slice(1).map((s, i, arr) => {
            const name: string = s.split("/")[0];
            return ts.factory.createTemplateSpan(
              ts.factory.createCallExpression(
                ts.factory.createIdentifier("encodeURIComponent"),
                undefined,
                [
                  ts.factory.createBinaryExpression(
                    ts.factory.createIdentifier(
                      g.path.find((p) => p.field === name)!.name,
                    ),
                    ts.factory.createToken(ts.SyntaxKind.QuestionQuestionToken),
                    ts.factory.createStringLiteral("null"),
                  ),
                ],
              ),
              (i !== arr.length - 1
                ? ts.factory.createTemplateMiddle
                : ts.factory.createTemplateTail)(s.substring(name.length)),
            );
          }),
        );
      };
      if (props.query === undefined && g.query.length === 0)
        return out(template());

      const block = (expr: ts.Expression) => {
        const computeName = (str: string): string =>
          g.total
            .filter((p) => p.category !== "headers")
            .find((p) => p.name === str) !== undefined
            ? computeName("_" + str)
            : str;
        const variables: string = computeName("variables");
        return ts.factory.createBlock(
          [
            local(variables)("URLSearchParams")(
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
                ts.NodeFlags.Const,
              ),
              ts.factory.createCallExpression(
                ts.factory.createIdentifier("Object.entries"),
                undefined,
                [
                  ts.factory.createAsExpression(
                    expr,
                    TypeFactory.keyword("any"),
                  ),
                ],
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
                              ts.factory.createIdentifier(variables),
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
                        ts.factory.createIdentifier(variables),
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
            ts.factory.createReturnStatement(
              ts.factory.createConditionalExpression(
                ts.factory.createStrictEquality(
                  ExpressionFactory.number(0),
                  IdentifierFactory.access(
                    ts.factory.createIdentifier(variables),
                  )("size"),
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
                      ts.factory.createCallExpression(
                        IdentifierFactory.access(
                          ts.factory.createIdentifier(variables),
                        )("toString"),
                        undefined,
                        undefined,
                      ),
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
      if (props.query !== undefined && g.query.length === 0)
        return out(block(ts.factory.createIdentifier(props.query.name)));
      return out(
        block(
          ts.factory.createObjectLiteralExpression(
            [
              ...(props.query
                ? [
                    ts.factory.createSpreadAssignment(
                      ts.factory.createIdentifier(props.query.name),
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

  const write_stringify =
    (project: INestiaProject) =>
    (importer: ImportDictionary): ts.VariableStatement =>
      constant("stringify")(
        ts.factory.createArrowFunction(
          [],
          undefined,
          [
            IdentifierFactory.parameter(
              "input",
              ts.factory.createTypeReferenceNode("Input"),
            ),
          ],
          undefined,
          undefined,
          ts.factory.createCallExpression(
            IdentifierFactory.access(
              IdentifierFactory.access(
                ts.factory.createIdentifier(SdkImportWizard.typia(importer)),
              )("json"),
            )(project.config.assert ? "stringify" : "assertStringify"),
            undefined,
            [ts.factory.createIdentifier("input")],
          ),
        ),
      );
}

const local = (name: string) => (type: string) => (expression: ts.Expression) =>
  ts.factory.createVariableStatement(
    [],
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          name,
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
          name,
          undefined,
          undefined,
          expression,
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
const getType =
  (project: INestiaProject) =>
  (importer: ImportDictionary) =>
  (p: ITypedHttpRoute.IParameter | ITypedHttpRoute.IOutput) =>
    p.metadata
      ? SdkTypeProgrammer.write(project)(importer)(p.metadata)
      : ts.factory.createTypeReferenceNode(p.typeName);
