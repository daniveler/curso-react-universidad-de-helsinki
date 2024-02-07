import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: '50 Best Kitchen Recipes',
    author: 'Karlos Arguiñano',
    url: 'https://www.cocinaconkarlos.com',
    likes: 1000
  }

  const component = render(
    <Blog blog={blog} />
  )


  const shownContent = component.container.querySelector('.shownContent')
  expect(shownContent).not.toHaveStyle('display: none')

  const hiddenContent = component.container.querySelector('.hiddenContent')
  expect(hiddenContent).toHaveStyle('display: none')
})

test.skip('clicking the button calls event handler once', () => {
  const blog = {
    title: '50 Best Kitchen Recipes',
    author: 'Karlos Arguiñano',
    url: 'https://www.cocinaconkarlos.com',
    likes: 1000
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleDelete={mockHandler} />
  )

  const button = component.getByText('Delete')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})