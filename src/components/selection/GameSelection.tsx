import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Region, { AllRegions } from 'state/playerInfo/regions'
import Match from 'state/matches/match.model'
import * as PlayerInfoActions from 'state/playerInfo/playerinfo.actions'
import * as MatchesActions from 'state/matches/matches.actions'

import IStoreState from 'state/IStoreState'
// import store from './state/store'

import GameTable from './GameTable'

import { Select, ItemRenderer, ItemPredicate } from '@blueprintjs/select'
import { MenuItem, Button, Label } from '@blueprintjs/core'


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

const initialState = {
  authToken: '',
  playerName: '',
  regionId: Region.pc_eu
}

type State = Readonly<typeof initialState>

export class GameSelectionInternal extends React.Component<DispatchToProps & StateToProps, State> {
  readonly state: State = initialState

  constructor(props: DispatchToProps & StateToProps, state: State) {
    super(props, state)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.changePlayerName = this.changePlayerName.bind(this)
    this.changeToken = this.changeToken.bind(this)
    this.getMatchesDetailed = this.getMatchesDetailed.bind(this)
  }


  public getMatchesDetailed() {
    this.props.getMatchesDetailed()
  }

  public handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
    this.props.setPlayerInfo(this.state.authToken, this.state.playerName, this.state.regionId)
  }

  public changeRegion = (e: Region) => {
    this.setState({
      regionId: e
    })
  }

  public changePlayerName = (e: React.FormEvent<any>) => {
    this.setState({
      playerName: e.currentTarget.value
    })
  }

  public changeToken(e: React.FormEvent<any>) {
    this.setState({
      authToken: e.currentTarget.value
    })
  }

  public render() {
    let regionShards = []

    for (let region in Region) {
      if (isNaN(Number(region))) {
        regionShards.push(<option key={region} value={region}>{region}</option>)
      }
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* <Label text='Token'>
            <input className='pt-input' type='text' value={this.state.authToken} onChange={this.changeToken} />
          </Label> */}
          <Label text='Player Name: '>
            <input className='pt-input' type='text' placeholder='elitekiller1337' value={this.state.playerName} onChange={this.changePlayerName} />
          </Label>
          <Label text='Server: '>
            <RegionSelect
              items={AllRegions}
              itemPredicate={filterRegion}
              itemRenderer={renderRegion}
              onItemSelect={this.changeRegion}
              noResults={<MenuItem disabled={true} text='No results.' />}
            >
              <Button rightIcon='caret-down' text={this.state.regionId} disabled={false} />
            </RegionSelect>
          </Label>
          <Button rightIcon='tick' type='submit' text='Submit' />
        </form>
        <Button rightIcon='tick' type='button' text='get match detailed' onClick={this.getMatchesDetailed}/>
        <GameTable matchesArray={this.props.matches}/>
      </div>
    )
  }
}

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
)(GameSelectionInternal)

