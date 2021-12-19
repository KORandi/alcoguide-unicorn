import Link from 'next/link';
import { Button, Card } from 'semantic-ui-react';
import { getAll } from '../../api/recipe';

const Search = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes && notes.map(note => {
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
          )
        })}
      </div>
    </div>
  )
}

Search.getInitialProps = async () => {
  const notes = await getAll();
  return { notes }
}

export default Search;