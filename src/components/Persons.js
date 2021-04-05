import React from "react";


function Persons({ filteredPersons, handleDelete }) {

  const component = filteredPersons.map((person) => {
    return (
      <div className="mb-2" key={person.name}>
        <div className="row">
          <div className="mr-2">
            {person.name} {person.number}
          </div>
          <button className="btn btn-outline-success btn-sm " onClick={() => handleDelete(person)}>delete</button>
        </div>
      </div>
    );
  });

  return <div>{component}</div>;
}

export default Persons;
