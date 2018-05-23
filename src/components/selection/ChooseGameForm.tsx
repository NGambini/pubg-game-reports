import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Region, { AllRegions } from 'state/playerInfo/regions'
import Match from 'state/matches/match.model'
import * as PlayerInfoActions from 'state/playerInfo/playerinfo.actions'
import * as MatchesActions from 'state/matches/matches.actions'
import IStoreState from 'state/IStoreState'

import { Select, ItemRenderer, ItemPredicate } from '@blueprintjs/select'
import { MenuItem, Button, Label } from '@blueprintjs/core'

//#region BlueprintJS Select configuration
const RegionSelect = Select.ofType<Region>()

const renderRegion: ItemRenderer<Region> = (item, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={false}
      key={item}
      label={item}
      onClick={handleClick}
      text={item}
    />
  )
}

const filterRegion: ItemPredicate<Region> = (query, region) => {
  return region.indexOf(query.toLowerCase()) >= 0;
}
//#endregion 

const initialState = {
  playerName: '',
  regionId: Region.pc_eu
}
type State = Readonly<typeof initialState>
export class ChooseGameForm extends React.Component<DispatchToProps & StateToProps, State> {
  readonly state: State = initialState

  constructor(props: DispatchToProps & StateToProps, state: State) {
    super(props, state)

    this.changePlayerName = this.changePlayerName.bind(this)
    this.changeRegion = this.changeRegion.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  public changePlayerName = (e: React.FormEvent<any>) => {
    this.setState({
      playerName: e.currentTarget.value
    })
  }

  public changeRegion = (e: Region) => {
    this.setState({
      regionId: e
    })
  }

  public handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
    // TODO remote token from store
    this.props.setPlayerInfo(null, this.state.playerName, this.state.regionId)
  }

  public render() {
    return (
      <div>
        <h5>Find your matches</h5>
          <form onSubmit={this.handleSubmit}>
            <Label text='Player Name: ' className='pt-inline'>
              <input className='pt-input' type='text' placeholder='elitekiller1337' value={this.state.playerName} onChange={this.changePlayerName} />
            </Label>
            <Label text='Server: ' className='pt-inline'>
              <div className="pt-input-group">
                <RegionSelect
                  items={AllRegions}
                  itemPredicate={filterRegion}
                  itemRenderer={renderRegion}
                  onItemSelect={this.changeRegion}
                  noResults={<MenuItem disabled={true} text='No results.' />}
                >
                  <Button rightIcon='caret-down' text={this.state.regionId} disabled={false} />
                </RegionSelect>
              </div>
            </Label>
            <Button rightIcon='tick' type='submit' text='Submit' />
          </form>
      </div>
    )
  }
}

//#region React-Redux connect 
interface StateToProps {
  matches: Array<Match>,
  isLoading: boolean
}

interface DispatchToProps {
  setPlayerInfo: (token: string, playerName: string, regionId: Region) => void,
  getMatchesDetailed: () => void
}

const mapStateToProps = (state: IStoreState) => ({
  matches: Object.keys(state.matches.matches).map((k) => state.matches.matches[k]),
  isLoading: state.matches.isLoading
})

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchToProps => ({
  setPlayerInfo: (token: string, playerName: string, regionId: Region) => {
    dispatch(PlayerInfoActions.setPlayerInfo(token, playerName, regionId))
    dispatch(MatchesActions.getPlayerMatches())
  },
  getMatchesDetailed: () => {
    dispatch(MatchesActions.getPlayerMatchesDetailed())
  }
})

export default connect<StateToProps, DispatchToProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(ChooseGameForm)
//#endregion
