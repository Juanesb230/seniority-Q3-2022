import { rest } from 'msw'
import { Player } from '../../redux/players/playerSlice'

const mockPlayers: Player[] = [
  {
    id: 1,
    firstName: 'Leo',
    lastName: '1',
    image: 'https://cdn.forbes.co/2020/09/Lionel-Messi-EFE-1280X720.jpg',
    attack: 14,
    defense: 87,
    skills: 39,
    idAuthor: 31
  },
  {
    id: 2,
    firstName: 'Leo',
    lastName: '2',
    image: 'https://cdn.forbes.co/2020/09/Lionel-Messi-EFE-1280X720.jpg',
    attack: 96,
    defense: 87,
    skills: 99,
    idAuthor: 31
  },
  {
    id: 3,
    firstName: 'Leo',
    lastName: '3',
    image: 'https://cdn.forbes.co/2020/09/Lionel-Messi-EFE-1280X720.jpg',
    attack: 25,
    defense: 75,
    skills: 21,
    idAuthor: 31
  }
]

const handlers = [
  rest.get('/player', (_req, res, ctx) => res(ctx.json(mockPlayers))),
  rest.post('/player', async (req, res, ctx) => {
    const mockPlayer = (await req.json()) as Player
    return res(ctx.json({ ...mockPlayer, id: 4 }))
  }),
  rest.patch('/update/player/3', async (req, res, ctx) => {
    const body = (await req.json()) as Player
    return res(ctx.json({ ...body, id: 1 }))
  }),
  rest.delete('/player/3', (_req, res, ctx) => {
    return res(ctx.json({ data: [] }))
  })
]

export { handlers }
