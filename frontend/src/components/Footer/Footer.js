// @ts-check
import React from "react"
import faker from 'faker'
import styled from 'styled-components';
import { PageContent } from "components/PageContent";
import { FooterSection } from "./FooterSection";

const Root = styled.footer`
  background: #e9ecef;
`

const SocialConatiner = styled.div`
  & > * + * {
    margin-left: 10px;
  }
`

const GoogleLink = styled.a`
  color: rgba(211,72,54,1);
  &:hover {
    color: rgba(211,72,54, .9);
  }
`
const FacebookLink = styled.a`
  color: rgba(59,89,152,1);
  &:hover {
    color: rgba(59,89,152, .9);
  }
`
const TwitterLink = styled.a`
  color: rgba(0,182,237,1);
  &:hover {
    color: rgba(0,182,237, .9);
  }
`

export class Footer extends React.Component {
  render() {
    return (
      <Root>
        <PageContent>
          <section className="row">
            <FooterSection />
            <FooterSection />
            <FooterSection />
            <figure className="col-xs-6 col-lg-3">
              <figcaption className="caption">
                <h4>Social</h4>
                <SocialConatiner>
                  <GoogleLink href="/#">
                    <i className="fa fa-google-plus-square fa-3x"></i>
                  </GoogleLink>
                  <FacebookLink href="/#">
                    <i className="fa fa-facebook-square fa-3x"></i>
                  </FacebookLink>
                  <TwitterLink href="/#">
                    <i className="fa fa-twitter-square fa-3x"></i>
                  </TwitterLink>
                </SocialConatiner>
              </figcaption>
            </figure>
          </section>
        </PageContent>
      </Root>
    )
  }
}