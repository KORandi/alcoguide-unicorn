import React from "react";
import { Button, Container, Header } from "semantic-ui-react";

const Sandbox = () => {
    return (
        <Container>
            {/* Header */}
            <Header size="small">Header1</Header>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>

            <hr />

            {/* Buttons */}
            <Button>Read More</Button>
            <Button primary={true}>Read More</Button>
            <Button secondary={true}>Read More</Button>
            <Button positive={true}>Read More</Button>
            <Button negative={true}>Read More</Button>
            <br/><br/>
            <Button color="red">Read More</Button>
            <Button disabled={true}>Read More</Button>
            <Button loading={true}>Read More</Button>
            <Button size="mini">Read More</Button>

        </Container>
    )
}

export default Sandbox;