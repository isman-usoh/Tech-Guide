// @ts-check

import React from 'react'
import styled from 'styled-components';

import { Card } from '../Card/Card';
import { Grid } from '../Grid/Grid';
import { GridItem } from '../Grid/GridItem';

const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;
`

export class CardGrid extends React.Component {
  render() {
    return (
      <div className="album py-5 bg-light">
        <Container className="container-fluid">
          <Grid>
            <GridItem>
              <Card />
            </GridItem>
            <GridItem>
              <Card />
            </GridItem>
            <GridItem>
              <Card />
            </GridItem>
            <GridItem>
              <Card />
            </GridItem>
            <GridItem>
              <Card />
            </GridItem>
            <GridItem>
              <Card />
            </GridItem>
            <GridItem>
              <Card />
            </GridItem>
            <GridItem>
              <Card />
            </GridItem>
            <GridItem>
              <Card />
            </GridItem>
          </Grid>
        </Container>
      </div>
    )
  }
}