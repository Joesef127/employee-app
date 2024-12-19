import { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { baseUrl } from '../shared';
import { LoginContext } from '../App';

export default function Customer() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState(false);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!tempCustomer) return;
    if (!customer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;
    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal) return setChanged(false);
  });

  useEffect(() => {
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
    })
      .then((response) => {
        if (response.status === 404) setNotFound(true);
        else if (response.status === 401) {
          setLoggedIn(false);
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          });
        }

        if (!response.ok) {
          throw new Error('Something went wronger than before');
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(null);
      });
  }, []);

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + 'api/customers/' + id;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false);
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className="p-3">
      {notFound ? <p>Customer with id {id} could not be found</p> : null}
      {customer ? (
        <div>
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="cname">Name: </label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="cname"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="cindustry">Industry: </label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="cindustry"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
              </div>
            </div>
          </form>

          {changed ? (
            <>
              <button
                className="my-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                form="customer"
              >
                Save
              </button>
              <button
                className="m-2 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
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
            className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => {
              const url = baseUrl + 'api/customers/' + id;
              fetch(url, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error('Something went wrong');
                  } else if (response.status === 401) {
                    setLoggedIn(false);
                    navigate('/login', {
                      state: {
                        previousUrl: location.pathname,
                      },
                    });
                  }
                  setError(undefined);
                  navigate('/customers');
                })
                .catch((e) => {
                  setError(e.message);
                });
            }}
          >
            Delete
          </button>
        </div>
      ) : null}

      {error ? <p>{error}</p> : null}

      <Link to={'/customers'}>
        <button className="no-underline my-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          {'<-'} Go back
        </button>
      </Link>
    </div>
  );
}
