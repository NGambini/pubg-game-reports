import { Item } from './item' 

export interface ItemPackage {
  itemPackageId: string,
  location: Location
  items: Array<Item>
}
