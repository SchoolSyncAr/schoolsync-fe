import { RenderResult, render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect, afterEach } from 'vitest'
import { Footer } from './Footer'
import { MemoryRouter } from 'react-router-dom'

describe('Footer Tests', () => {
  let renderResult: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement, HTMLElement>

  beforeEach(() => {
    renderResult = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('Should render all social media icons and links correctly', async () => {
    const facebookLink = screen.getByTestId('facebook-link')
    const whatsappLink = screen.getByTestId('whatsapp-link')
    const twitterLink = screen.getByTestId('twitter-link')
    const instagramLink = screen.getByTestId('instagram-link')

    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/paginaoficial')
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/numero_de_telefono')
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/paginaoficial')
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com')
  })

  it('Should render the text "SchoolSyncAr 2024 All Rights Reserved" correctly', async () => {
    const allRightsReservedText = screen.getByText(/SchoolSyncAr 2024 All Rights Reserved/i)
    expect(allRightsReservedText).toBeInTheDocument()
  })

  it('Should render the text "SchoolSyncAr 2024 All Rights Reserved" correctly', async () => {
    const schoolsyncarMailText = screen.getByText(/schoolsyncar@schoolsyncar.com.ar/i)
    expect(schoolsyncarMailText).toBeInTheDocument()
  })
})
