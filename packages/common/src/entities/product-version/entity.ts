import type {
  ProductVersionDetailDbData,
  ProductVersionListSliceDbData,
} from "./query";

export class ProductVersionEntity {
  /**
   * Dashboard list: prefer draft slice when present, else published.
   */
  static pickForList(
    draft: ProductVersionListSliceDbData | null,
    published: ProductVersionListSliceDbData | null,
  ): ProductVersionListSliceDbData | null {
    return draft ?? published;
  }

  /**
   * Dashboard editor: prefer full draft include when present, else published.
   */
  static pickForEditor(
    draft: ProductVersionDetailDbData | null,
    published: ProductVersionDetailDbData | null,
  ): ProductVersionDetailDbData | null {
    return draft ?? published;
  }
}
