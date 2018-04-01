// @ts-check
import React from 'react'
import faker from 'faker'
import styled from 'styled-components';

const Root = styled.section`
  margin: 0;
`

export class Jumbotron extends React.Component {
  render() {
    return (
      <Root className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">{faker.lorem.sentence(3)}</h1>
          <p className="lead text-muted">{faker.lorem.paragraph(4)}</p>
        </div>
      </Root>
    )
  }
}