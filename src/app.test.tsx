import { screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './mocks/storeTest'
import { AppStore, setupStore } from './redux/store'
import { server } from './mocks/mockServer'
import App from './app'
import { playerSlice } from './redux/players/playerSlice'

let store: AppStore
describe('App component', () => {
  beforeAll(() => server.listen())

  beforeEach(() => {
    store = setupStore()
    store.dispatch(playerSlice.endpoints.getPlayers.initiate())
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  it('Should render a title', () => {
    renderWithProviders(<App />, { store })

    const title = screen.getByText('MI EQUIPO')
    expect(title).toBeInTheDocument()
  })

  it('Should render list of players', async () => {
    renderWithProviders(<App />, { store })

    const title = screen.getByText('MI EQUIPO')
    expect(title).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('LEO 1')).toBeInTheDocument()
      expect(screen.getByText('LEO 2')).toBeInTheDocument()
      expect(screen.getByText('LEO 3')).toBeInTheDocument()
    })
  })

  it('Search player', async () => {
    renderWithProviders(<App />, { store })

    const title = screen.getByText('MI EQUIPO')
    expect(title).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('LEO 1')).toBeInTheDocument()
      expect(screen.getByText('LEO 2')).toBeInTheDocument()
      expect(screen.getByText('LEO 3')).toBeInTheDocument()
    })

    userEvent.type(screen.getByPlaceholderText('Buscar por apellido'), '1')

    expect(screen.getByText('LEO 1')).toBeInTheDocument()
    expect(screen.queryByText('LEO 2')).not.toBeInTheDocument()
    expect(screen.queryByText('LEO 3')).not.toBeInTheDocument()
  })

  it('Should delete player', async () => {
    renderWithProviders(<App />, { store })

    const title = screen.getByText('MI EQUIPO')
    expect(title).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('LEO 1')).toBeInTheDocument()
      expect(screen.getByText('LEO 2')).toBeInTheDocument()
      expect(screen.getByText('LEO 3')).toBeInTheDocument()
    })

    const buttons = screen.getAllByTestId('delete')

    fireEvent.click(buttons[2])

    await waitFor(() => expect(screen.queryByText('LEO 3')).not.toBeInTheDocument())
  })

  it('Should create player', async () => {
    renderWithProviders(<App />, { store })

    const title = screen.getByText('MI EQUIPO')
    expect(title).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('LEO 1')).toBeInTheDocument()
      expect(screen.getByText('LEO 2')).toBeInTheDocument()
      expect(screen.getByText('LEO 3')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Agregar'))

    await waitFor(() => expect(screen.getByText('Jugador')).toBeInTheDocument())

    userEvent.type(screen.getByPlaceholderText('Nombre'), 'LEO')
    userEvent.type(screen.getByPlaceholderText('Apellido'), '4')
    userEvent.type(
      screen.getByPlaceholderText('Imagen'),
      'https://cdn.forbes.co/2020/09/Lionel-Messi-EFE-1280X720.jpg'
    )

    fireEvent.click(screen.getByText('Agregarlo'))

    await waitFor(() => {
      expect(screen.getByText('LEO 4')).toBeInTheDocument()
      expect(screen.queryByText('Jugador')).not.toBeInTheDocument()
    })
  })

  it('Should edit player', async () => {
    renderWithProviders(<App />, { store })

    const title = screen.getByText('MI EQUIPO')
    expect(title).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('LEO 1')).toBeInTheDocument()
      expect(screen.getByText('LEO 2')).toBeInTheDocument()
      expect(screen.getByText('LEO 3')).toBeInTheDocument()
    })

    const buttons = screen.getAllByTestId('edit')

    fireEvent.click(buttons[2])

    await waitFor(() => expect(screen.getByText('Jugador')).toBeInTheDocument())

    userEvent.type(screen.getByPlaceholderText('Apellido'), ' EDITADO')

    fireEvent.click(screen.getByText('Editar'))

    await waitFor(() => {
      expect(screen.getByText('LEO 3 EDITADO')).toBeInTheDocument()
      expect(screen.queryByText('Jugador')).not.toBeInTheDocument()
    })
  })
})
