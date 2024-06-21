import { RenderResult, act, render, screen } from '@testing-library/react'
// import { userEvent } from '@testing-library/user-event'
import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest'
import { Footer } from './Footer'
import { MemoryRouter } from 'react-router-dom'

describe('Footer Tests', () => {
  let renderResult

  beforeEach(() => {
    renderResult = render(<MemoryRouter><Footer /></MemoryRouter>)
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







  // it('Should apply correct styles and classes to elements', async () => {
  //   const footerElement = screen.getByRole('contentinfo')

  //   expect(footerElement).toHaveClass('main__footer')

  //   const socialIcons = screen.getAllByRole('button')

  //   socialIcons.forEach(icon => {
  //     expect(icon).toHaveClass('icon')
  //   })

  //   const textElements = screen.getAllByRole('text')

  //   textElements.forEach(text => {
  //     expect(text).toHaveClass('text')
  //     expect(text).toHaveClass('text--xs')
  //     expect(text).toHaveClass('text--white')
  //     expect(text).toHaveClass('text--light')
  //   })
  // })
})
