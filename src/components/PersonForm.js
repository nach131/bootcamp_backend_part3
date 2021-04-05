import React from 'react'

export const PersonForm = ({ addPerson, newName, newNumber, handleNewName, handleNewNumber }) => {


  return (
    <>
      <form className="pt-2" onSubmit={addPerson}>
        <div className="form-group row">
          name: <input className="ml-2" type="text" onChange={handleNewName} value={newName} />
        </div>

        <div className="form-group row">
          number: <input className="ml-2" type="text" onChange={handleNewNumber} value={newNumber} />
        </div>

        <div className="row pt-4">
          {/* <button className="btn btn-success btn-block" type="submit" >add</button> */}
          <button className="btn btn-success " type="submit" >add</button>
        </div>
      </form>
    </>
  )
}