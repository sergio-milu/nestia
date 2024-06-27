import { IMigrateRoute } from "@samchon/openapi";

import { IMigrateController } from "../structures/IMigrateController";
import { MapUtil } from "../utils/MapUtil";
import { StringUtil } from "../utils/StringUtil";

export namespace MigrateControllerAnalyzer {
  export const analyze = (routes: IMigrateRoute[]): IMigrateController[] => {
    const endpoints: Map<string, IMigrateRoute[]> = new Map();
    for (const r of routes) {
      const location: string = r.emendedPath
        .split("/")
        .filter((s) => s[0] !== ":")
        .join("/");
      MapUtil.take(endpoints)(location)(() => []).push(r);
    }
    const total: IMigrateController[] = [...endpoints.entries()]
      .filter(([_l, routes]) => !!routes.length)
      .map(([path, routes]) => {
        const name: string =
          routes[0].accessor.slice(0, -1).map(StringUtil.capitalize).join("") +
          "Controller";
        const location: string = routes[0].accessor.slice(0, -2).join("/");
        return {
          name,
          path,
          location: "src/controllers/" + location,
          routes,
        };
      });
    for (const c of total)
      if (c.name === "Controller")
        c.name = StringUtil.escapeDuplicate([...total.map((c) => c.name)])(
          "AppController",
        );
    return total;
  };
}
