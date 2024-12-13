import "../output.css";
import Employee from "../components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";
import Header from "../components/Header";

function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "john",
      role: "manager",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: 2,
      name: "jane",
      role: "intern",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
    {
      id: 3,
      name: "Bola",
      role: "HR",
      image:
        "https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg",
    },
    {
      id: 4,
      name: "Bukunmi",
      role: "frontend Developer",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    },
    {
      id: 5,
      name: "Bankole",
      role: "Devops",
      image:
        "https://images.pexels.com/photos/2232981/pexels-photo-2232981.jpeg",
    },
    {
      id: 6,
      name: "Josiah",
      role: "Designer",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    },
    {
      id: 7,
      name: "Asake",
      role: "backend developer",
      image:
        "https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg",
    },
    {
      id: 8,
      name: "Adeola",
      role: "backend developer",
      image:
        "https://images.pexels.com/photos/2104252/pexels-photo-2104252.jpeg",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    console.log("update employees");
    const updatedEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function newEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      image: img,
    };

    setEmployees([...employees, newEmployee]);
  }

  const showEmployees = true;
  return (
    <div>
      {showEmployees ? (
        <>
          <div className="flex flex-wrap justify-center items-center gap-4 my-3">
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee}
                />
              );
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  image={employee.image}
                  editEmployee={editEmployee}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}

      <AddEmployee newEmployee={newEmployee} />
    </div>
  );
}

export default Employees;
