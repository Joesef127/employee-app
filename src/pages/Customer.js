import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';

export default function Customer() {
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(customer);
    // console.log(tempCustomer);
    // console.log(changed);
  });

  useEffect(() => {
    try {
      const url = baseUrl + 'api/customers/' + id;
      fetch(url)
        .then((response) => {
          if (response.status === 404) {
            setNotFound(true);
          }
          return response.json();
        })
        .then((data) => {
          setCustomer(data.Customer);
          setTempCustomer(data.Customer);
        });
    } catch (error) {console.log(error)}
  }, []);

  function DeleteCustomer() {
    console.log('deleting...');
  }

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
        setCustomer(data.customer);
        setChanged(false);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
            </>
          ) : null}
        </ul>
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
              navigate('/customers');
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Delete
      </button>
      <br />
      <Link to={'/customers'}>{'<-'} Go back to customers list</Link>
    </>
  );
}
