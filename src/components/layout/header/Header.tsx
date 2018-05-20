import * as React from 'react'

import {  Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment, Button,  } from '@blueprintjs/core'

export default class Header extends React.Component {
  public render() {
    return (
      <header>
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
            <NavbarHeading>Blueprint</NavbarHeading>
            <NavbarDivider />
            <Button className="pt-minimal" icon="home" text="Home" />
            <Button className="pt-minimal" icon="search" text="Choose game" />
          </NavbarGroup>
        </Navbar>
      </header>
    )
  }
}

