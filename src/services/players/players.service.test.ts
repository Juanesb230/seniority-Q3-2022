import { PlayerService } from './players.service'
import axiosMock from '../../mocks/axiosMock'
import { playersMocks } from '../../mocks/playerMocks'

describe('Player Service', () => {
  it('should get navigation properties', async () => {
    axiosMock.get.mockResolvedValueOnce(playersMocks)
    const players = await PlayerService.getPlayers()
    expect(players).toBeDefined()
    expect(players).toBeInstanceOf(Array)
  })

  it('should delete properties', async () => {
    await PlayerService.deletePlayer(1)
    expect(axiosMock.delete).toBeCalled()
  })

  it('should create player properties', async () => {
    axiosMock.post.mockResolvedValueOnce({ data: playersMocks.data[0] })
    const player = await PlayerService.createPlayer(playersMocks.data[0])
    expect(axiosMock.post).toBeCalled()
    expect(player.id).toBe(1)
  })

  it('should update player properties', async () => {
    axiosMock.patch.mockResolvedValueOnce({ data: playersMocks.data[0] })
    const player = await PlayerService.updatePlayer(playersMocks.data[0])
    expect(axiosMock.patch).toBeCalled()
    expect(player.id).toBe(1)
  })
})
