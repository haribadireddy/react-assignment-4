// Write your code here
import {Component} from 'react'

import MatchCard from '../MatchCard'

import LatestMatch from '../LatestMatch'

import './index.css'

class TeamMatches extends Component {
  state = {recentMatchesList: []}

  componentDidMount() {
    console.log('component-rendered')
    this.matchApiCalls()
  }

  matchApiCalls = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const newUpdatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(eachMatch => ({
        umpires: eachMatch.umpires,
        result: eachMatch.result,
        manOfTheMatch: eachMatch.man_of_the_match,
        id: eachMatch.id,
        date: eachMatch.date,
        venue: eachMatch.venue,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        firstInnings: eachMatch.first_innings,
        secondInnings: eachMatch.second_innings,
        matchStatus: eachMatch.match_status,
      })),
    }
    this.setState({recentMatchesList: newUpdatedData})
  }

  renderMatchCard = () => {
    const {recentMatchesList} = this.state
    const {recentMatches} = recentMatchesList
    return (
      <ul className="matchCard-container">
        {recentMatches.map(eachItem => (
          <MatchCard key={eachItem.id} matchCardDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLatestMatch = () => {
    const {recentMatchesList} = this.state
    const {teamBannerUrl, latestMatchDetails} = recentMatchesList
    return (
      <div className="teamMatch-container">
        <img
          src={teamBannerUrl}
          alt="team banner"
          className="teamBanner-image"
        />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {this.renderMatchCard()}
      </div>
    )
  }

  renderBgColor = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'CSK':
        return 'csk'
      case 'MI':
        return 'mi'
      case 'RR':
        return 'rr'
      case 'SH':
        return 'srh'
      case 'KXP':
        return 'kxp'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const className = `${this.renderBgColor()}`
    return <div className={className}>{this.renderLatestMatch()}</div>
  }
}

export default TeamMatches
