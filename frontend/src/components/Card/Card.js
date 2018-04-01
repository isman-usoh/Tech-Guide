import React from 'react'
import faker from 'faker'
import styled from 'styled-components'

const Root = styled.div`
  margin-bottom: 15px;
  height: calc(100% - 15px);
`

export class Card extends React.Component {
  render() {
    return (
      <Root className="card box-shadow">
        <img
          className="card-img-top"
          data-holder-rendered="true"
          data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
          alt="Thumbnail [100%x225]"
          style={{ height: 225, width: '100%', display: 'block' }}
        />

        <div className="card-body">
          <h4 className="card-text">{faker.lorem.sentence(2)}</h4>
          <p className="card-text">{faker.lorem.words(10)}</p>
        </div>

      </Root>
    )
  }
}