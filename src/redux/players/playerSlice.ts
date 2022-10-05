import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit'
import { PLAYERS_URL, AUTHOR_ID } from '../../constants'
import { RootState } from '../store'

export interface Player {
  id?: number
  firstName: string
  lastName: string
  image: string
  attack: number
  defense: number
  skills: number
  idAuthor?: number
}

const playerAdapter = createEntityAdapter<Player>()
const initialState = playerAdapter.getInitialState()

export const playerSlice = createApi({
  reducerPath: 'apiPlayers',
  baseQuery: fetchBaseQuery({ baseUrl: PLAYERS_URL }),
  endpoints: (builder) => ({
    getPlayers: builder.query<EntityState<Player>, void>({
      query: () => ({ headers: { author: AUTHOR_ID }, url: 'player' }),
      transformResponse: (res: Player[]) => playerAdapter.setAll(initialState, res)
    }),
    addPlayer: builder.mutation({
      query: (body: Player) => ({
        url: 'player',
        body: { ...body, idAuthor: Number(AUTHOR_ID) },
        method: 'POST'
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { id }
          } = await queryFulfilled
          dispatch(
            playerSlice.util.updateQueryData('getPlayers', undefined, (draft) => {
              playerAdapter.addOne(draft, { ...body, id })
            })
          )
        } catch {}
      }
    }),
    updatePlayer: builder.mutation({
      query: (body: Player) => ({
        url: `player/${body.id}`,
        body: { ...body, idAuthor: Number(AUTHOR_ID) },
        method: 'PATCH'
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const result = dispatch(
          playerSlice.util.updateQueryData('getPlayers', undefined, (draft) => {
            const player = draft.entities[body.id || -1]
            if (player) playerAdapter.upsertOne(draft, body)
          })
        )

        try {
          await queryFulfilled
        } catch {
          result.undo()
        }
      }
    }),
    deletePlayer: builder.mutation({
      query: (id: number) => ({
        url: `player/${id}`,
        method: 'DELETE'
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const result = dispatch(
          playerSlice.util.updateQueryData('getPlayers', undefined, (draft) => {
            playerAdapter.removeOne(draft, body || -1)
          })
        )

        try {
          await queryFulfilled
        } catch {
          result.undo()
        }
      }
    })
  })
})

export const {
  useGetPlayersQuery,
  useAddPlayerMutation,
  useUpdatePlayerMutation,
  useDeletePlayerMutation
} = playerSlice

export const selectPlayersResult = playerSlice.endpoints.getPlayers.select()

const selectTodosData = createSelector(selectPlayersResult, (playerResult) => playerResult.data)

export const { selectAll, selectById } = playerAdapter.getSelectors(
  (state: RootState) => selectTodosData(state) ?? initialState
)

export const searchPlayer = createSelector(
  selectAll,
  (_data: Player[], value: string) => value,
  (data, value) => {
    if (value === '') return data
    return data.filter((player) => player.lastName.toLowerCase().includes(value.toLowerCase()))
  }
)
