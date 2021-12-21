import Link from "next/link";
import { Button, Card, Container } from "semantic-ui-react";
import { getAllRecipes } from "../../api/recipe";

const Search = ({ notes }) => {
    return (
        <div className="notes-container" style={{paddingTop: "2em"}}>
            <h1>Notes</h1>
            <Container textAlign="right">
                <Link href={`/new`}>
                    <Button primary>New note</Button>
                </Link>
            </Container>
            <div style={{marginTop: "2em"}} className="grid wrapper">
                {notes &&
                    notes.map((note) => {
                        return (
                            <div key={note._id}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>
                                            <Link href={`/recipe/${note._id}`}>
                                                <a>{note.title}</a>
                                            </Link>
                                        </Card.Header>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Link href={`/recipe/${note._id}`}>
                                            <Button primary>View</Button>
                                        </Link>
                                        <Link href={`/recipe/${note._id}/edit`}>
                                            <Button primary>Edit</Button>
                                        </Link>
                                    </Card.Content>
                                </Card>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

Search.getInitialProps = async () => {
    const notes = await getAllRecipes();
    return { notes };
};

export default Search;
