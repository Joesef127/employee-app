import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { baseUrl } from '../shared';
import AddCustomer from '../components/AddCustomer';
import { LoginContext } from '../App';

export default function Customers() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    const url = baseUrl + 'api/customers/';
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false)
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data.customers || []);
      });
  }, []);

  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + 'api/customers/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + localStorage.getItem('access'),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 401) {
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
        toggleShow();
        setCustomers([...customers, data.customers]);
      })
      .catch((e) => {
        setError(e);
      });
  }

  return (
    <>
      {error ? <p>{error}</p> : null}
      {customers ? (
        <>
          <h1>Here are our customers: </h1>

          {customers.map((customer) => {
            return (
              <div key={customer.id}>
                <Link to={'/customers/' + customer.id}>
                  <button className="my-1 bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })}
        </>
      ) : (
        <p>There are no customers</p>
      )}
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
