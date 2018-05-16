export interface Item {
  itemId: string,
  stackCount: number,
  category: string,
  subCategory: string,
  attachedItems: Array<string> // array of item ids.
}
