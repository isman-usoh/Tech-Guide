// @ts-check
import React from "react"

import { CardGrid } from "components/CardGrid/CardGrid";
import { Jumbotron } from "components/Jumbotron/Jumbotron";
import { Page } from "components/Page";

export class HomeContainer extends React.Component {
  render() {
    return (
      <Page>
        <Jumbotron />
        <CardGrid />
      </Page>
    )
  }
}