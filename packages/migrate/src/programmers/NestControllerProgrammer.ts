import ts from "typescript";

import { IMigrateController } from "../structures/IMigrateController";
import { ISwaggerComponents } from "../structures/ISwaggerComponents";
import { FilePrinter } from "../utils/FilePrinter";
import { StringUtil } from "../utils/StringUtil";
import { ImportProgrammer } from "./ImportProgrammer";
import { NestMethodProgrammer } from "./NestMethodProgrammer";

export namespace NestControllerProgrammer {
  export const write =
    (components: ISwaggerComponents) =>
    (controller: IMigrateController): ts.Statement[] => {
      const importer: ImportProgrammer = new ImportProgrammer();
      const $class = ts.factory.createClassDeclaration(
        [
          ts.factory.createDecorator(
            ts.factory.createCallExpression(
              ts.factory.createIdentifier(
                importer.external({
                  type: "instance",
                  library: "@nestjs/common",
                  name: "Controller",
                }),
              ),
              [],
              [ts.factory.createStringLiteral(controller.path)],
            ),
          ),
          ts.factory.createToken(ts.SyntaxKind.ExportKeyword),
        ],
        controller.name,
        [],
        [],
        controller.routes.map(NestMethodProgrammer.write(components)(importer)),
      );
      return [
        ...importer.toStatements(
          (ref) =>
            `${"../".repeat(
              StringUtil.splitWithNormalization(controller.location).length - 1,
            )}api/structures/${ref}`,
        ),
        ...(importer.empty() ? [] : [FilePrinter.enter()]),
        $class,
      ];
    };
}
