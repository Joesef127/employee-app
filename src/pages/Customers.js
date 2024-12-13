import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { baseUrl } from '../shared';
import AddCustomer from '../components/AddCustomer';

export default function Customers() {
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    try {
      const url = baseUrl + 'api/customers';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCustomers(data.Customers);
        });
    } catch (error) {
      console.log('Something went wrong', error.message);
      return <p>Something went wrong, {error.message}</p>;
    }
  }, []);

  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + 'api/customers';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((data) => {
        toggleShow();
        console.log(data);
        setCustomers([...customers, data.customer]);
      })
      .catch((e) => {
        console.log(e);
        return <p>Something went wrong</p>;
      });
  }

  return (
    <>
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
