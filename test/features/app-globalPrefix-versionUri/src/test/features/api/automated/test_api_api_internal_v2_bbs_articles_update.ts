import typia from "typia";
import type { Primitive } from "typia";
import type { Format } from "typia/lib/tags/Format";

import api from "../../../../api";
import type { IBbsArticle } from "../../../../api/structures/IBbsArticle";

export const test_api_api_internal_v2_bbs_articles_update = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IBbsArticle> =
    await api.functional.api.internal.v2.bbs.articles.update(
      connection,
      typia.random<string>(),
      typia.random<string & Format<"uuid">>(),
      typia.random<IBbsArticle.IStore>(),
    );
  typia.assert(output);
};
