// Write your code here
import {Component} from 'react'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamCardList: []}

  componentDidMount() {
    this.fetchTeamCards()
  }

  fetchTeamCards = async () => {
    const {teamCardList} = this.state
    const url = 'https://apis.ccbp.in/ipl'
    const response = await fetch(url)
    const data = await response.json()
    const newTeamCards = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))
    this.setState({teamCardList: newTeamCards})
  }

  render() {
    const {teamCardList} = this.state
    return (
      <div className="bg-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo-image"
          />
          <h1 className="main-heading">IPL Dashboard</h1>
        </div>
        <ul className="teamCards-container">
          {teamCardList.map(eachTeam => (
            <TeamCard key={eachTeam.id} teamCardDetails={eachTeam} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
