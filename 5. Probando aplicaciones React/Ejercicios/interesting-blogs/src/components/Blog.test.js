import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: '50 Best Kitchen Recipes',
  author: 'Karlos Arguiñano',
  url: 'https://www.cocinaconkarlos.com',
  likes: 1000
}

let component

beforeEach(() => {
  component = render(
    <Blog blog={blog} />
  )
})

test('renders content', () => {
  const shownContent = component.container.querySelector('.shownContent')
  expect(shownContent).not.toHaveStyle('display: none')

  const hiddenContent = component.container.querySelector('.hiddenContent')
  expect(hiddenContent).toHaveStyle('display: none')
})

test('clicking the show details button changes divs visibilities', () => {
  const button = component.container.querySelector('.showDetailsButton')
  fireEvent.click(button)

  const shownContent = component.container.querySelector('.shownContent')
  expect(shownContent).toHaveStyle('display: none')

  const hiddenContent = component.container.querySelector('.hiddenContent')
  expect(hiddenContent).not.toHaveStyle('display: none')
})