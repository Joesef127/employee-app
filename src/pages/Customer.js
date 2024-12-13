import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';

export default function Customer() {
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!tempCustomer) return;
    if (!customer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;
    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal) return setChanged(false);
  });

  useEffect(() => {
    try {
      const url = baseUrl + 'api/customers/' + id;
      fetch(url)
        .then((response) => {
          if (response.status === 404) setNotFound(true);

          if (!response.ok) {
            throw new Error('Something went wrong');
          }
          return response.json();
        })
        .then((data) => {
          setCustomer(data.Customer);
          setTempCustomer(data.Customer);
          setError(undefined)
        });
    } catch (e) {
      setError(e.message);
    }
  }, []);

  function updateCustomer() {
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.Customer);
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  function compareCustomers() {}

  return (
    <>
      {notFound ? <p>Customer with id {id} could not be found</p> : null}
      {customer ? (
        <ul>
          <li>
            <input
              className="px-2 my-2"
              type="text"
              value={tempCustomer.name}
              onChange={(e) => {
                setChanged(true);
                setTempCustomer({ ...tempCustomer, name: e.target.value });
                compareCustomers();
              }}
            />
          </li>
          <li>
            <input
              className="px-2 my-2"
              type="text"
              value={tempCustomer.industry}
              onChange={(e) => {
                setChanged(true);
                setTempCustomer({
                  ...tempCustomer,
                  industry: e.target.value,
                });
                compareCustomers();
              }}
            />
          </li>
          {changed ? (
            <>
              <button
                className="my-2 px-2 bg-slate-400 rounded text-white"
                onClick={updateCustomer}
              >
                Save
              </button>{' '}
              <button
                className="my-2 px-2 bg-slate-400 rounded text-white"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                cancel
              </button>
              <br />
            </>
          ) : null}
          <button
            className="my-2 px-2 bg-slate-400 rounded text-white"
            onClick={(e) => {
              const url = baseUrl + 'api/customers/' + id;
              fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('Something went wrong');
                  }
                  setError(undefined)
                  navigate('/customers');
                })
                .catch((e) => {
                  setError(e.message);
                });
            }}
          >
            Delete
          </button>
        </ul>
      ) : null}
      {error ? <p>{error}</p> : null}
      <Link to={'/customers'}>{'<-'} Go back to customers list</Link>
    </>
  );
}
