import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { playersMocks, playerMock } from './mocks/playerMocks'
import userEvent from '@testing-library/user-event'
import axiosMock from './mocks/axiosMock'
import App from './app'

describe('App component', () => {
  beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce(playersMocks)
  })

  it('Should render list of players', async () => {
    render(<App />)

    const title = screen.getByText('MI EQUIPO')
    expect(title).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('LEO 1')).toBeInTheDocument()
      expect(screen.getByText('LEO 2')).toBeInTheDocument()
      expect(screen.getByText('LEO 3')).toBeInTheDocument()
    })
  })

  it('Search player', async () => {
    render(<App />)

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
    render(<App />)

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
    axiosMock.post.mockResolvedValueOnce(playerMock)
    render(<App />)

    const title = screen.getByText('MI EQUIPO')
    expect(title).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('LEO 1')).toBeInTheDocument()
      expect(screen.getByText('LEO 2')).toBeInTheDocument()
      expect(screen.getByText('LEO 3')).toBeInTheDocument()
    })

    await fireEvent.click(screen.getByText('Agregar'))

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
    axiosMock.patch.mockResolvedValueOnce(playerMock)
    render(<App />)

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

    await fireEvent.click(screen.getByText('Editar'))

    await waitFor(() => {
      expect(screen.getByText('LEO 3 EDITADO')).toBeInTheDocument()
      expect(screen.queryByText('Jugador')).not.toBeInTheDocument()
    })
  })
})
