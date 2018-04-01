import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Nav = styled.nav`
  @media (min-width: 992px) {
    flex-direction: column;
  }
`

const BrandLink = styled.a`
  height: 40px;
  width: 40px;
  background: #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  text-align: center;

  @media (min-width: 992px) {
    flex-direction: column;
    font-size: 2.5rem;
    height: 80px;
    margin-bottom: 1rem;
    margin-right: 0;
    width: 80px;
  }
`

export class Header extends React.Component {
  render() {
    return (
      <header>
        <Nav className="navbar navbar-expand-lg navbar-light bg-light">
          <BrandLink className="navbar-brand" href="/">
            <div>IM</div>
          </BrandLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </Nav>
      </header>
    )
  }
}