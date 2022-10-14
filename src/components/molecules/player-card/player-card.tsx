import './player-card.scss'
const PlayerCard = () => {
  return (
    <div className="player-card">
      <div className="player-card__header">
        <img
          className="player-card__image"
          src="https://media.gettyimages.com/photos/lionel-messi-of-fc-barcelona-waves-to-the-crowd-prior-to-the-joan-picture-id1166074663?s=612x612"
          alt=""
        />
        <div className="player-card__shadow" />
        <div className="player-card__player-name">name</div>
      </div>
      <div className="player-card__body">
        <h1>hola</h1>
      </div>
    </div>
  )
}

export default PlayerCard
