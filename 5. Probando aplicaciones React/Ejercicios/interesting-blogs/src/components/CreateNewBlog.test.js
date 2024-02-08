import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import CreateNewBlog from './CreateNewBlog'

describe('Create New Blog: ', () => {
  let component 

  const mockHandler = jest.fn()
  
  beforeEach(() => {
    component = render(
      <CreateNewBlog 
        title="title"
        author="author"
        url="url"
        handleCreateNewBlog={mockHandler}
      />
    )

    fireEvent
  })

  test('New blog data is represented succesfully', () => {
    const form = component.container.querySelector('#createBlogForm')

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, { 
      target: { value: 'New Title' } 
    })

    fireEvent.change(author, { 
      target: { author: 'New Author' } 
    })

    fireEvent.change(url, { 
      target: { url: 'New URL' } 
    })

    fireEvent.submit(form)

    console.log(mockHandler.mock.results[0].value)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})