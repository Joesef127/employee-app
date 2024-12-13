import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import NotFound from '../components/NotFound';
import DefinitionSearch from '../components/DefinitionSearch';

export default function Definition() {
  const [word, setWord] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  let { search } = useParams();

  useEffect(() => {
    try {
      const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + search;
      fetch(url)
        .then((response) => {
          if (response.status === 404) {
            setNotFound(true);
          }
          if (!response.ok) {
            setError(true);
            throw new Error('Something went wrong');
          }
          return response.json();
        })
        .then((data) => {
          setWord(data[0].meanings);
        });
    } catch (error) {
      console.log(error.message);
      return <p>Error: {error.message}</p>
    }
  }, []);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">search another</Link>
      </>
    );
  }
  if (error === true) {
    return (
      <>
        <p>Something went wrong, try again</p>
        <Link to="/dictionary">search another</Link>
      </>
    );
  }

  return (
    <>
      {word ? (
        <>
          {word.map((meaning) => {
            return (
              <>
                <h1>Here is a definition: </h1>
                <p key={uuidv4()}>
                  {meaning.partOfSpeech + ': '}
                  {meaning.definitions[0].definition}
                </p>
                <p>Search again: </p>
                <DefinitionSearch />
              </>
            );
          })}
        </>
      ) : <p>Not available!</p>}
    </>
  );
}
