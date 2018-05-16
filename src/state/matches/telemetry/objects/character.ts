import { Location } from './location'

export interface Character {
  name: string,
  teamId: number,
  health: number,
  location: Location,
  ranking: number,
  accountId: string
}
