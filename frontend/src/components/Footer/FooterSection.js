import React from 'react'
import faker from 'faker'

export const FooterSection = () => {
  return (
    <figure className="col-xs-6 col-lg-3">
      <figcaption className="caption">
        <h4>{faker.lorem.sentence(2)}</h4>
        <p>{faker.lorem.sentence(10)}</p>
      </figcaption>
    </figure>
  )
}