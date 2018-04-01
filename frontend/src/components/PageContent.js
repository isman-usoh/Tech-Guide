import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  padding-top: 20px;
`

export const PageContent = (props) => {
  return (
    <Root className="container-fluid">{props.children}</Root>
  )
}