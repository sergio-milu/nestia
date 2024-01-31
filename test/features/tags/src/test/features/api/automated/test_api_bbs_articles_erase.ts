import typia from "typia";
import type { Format } from "typia/lib/tags/Format";

import api from "../../../../api";

export const test_api_bbs_articles_erase = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.bbs.articles.erase(
    connection,
    typia.random<string>(),
    typia.random<string & Format<"uuid">>(),
  );
  typia.assert(output);
};
