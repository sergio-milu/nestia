import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../api";
import type { IBbsArticle } from "../../../../api/structures/IBbsArticle";
import type { IPage } from "../../../../api/structures/IPage";

export const test_api_bbs_$package_articles_$catch = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IPage<IBbsArticle.ISummary>> =
    await api.functional.bbs.$package.articles.$catch(
      connection,
      typia.random<null | string>(),
      typia.random<IPage.IRequest>(),
    );
  typia.assert(output);
};
