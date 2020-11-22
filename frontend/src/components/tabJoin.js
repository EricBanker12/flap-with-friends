import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import Axios from "axios"

const joinCodeRegEx = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/

const TabJoin = ({lobby, dispatch}) => {
  const [joinInput, setJoinInput] = useState({
    value: "",
    valid: false,
  })

  useEffect(() => {
    if (typeof window === typeof undefined)
      return null

    const params = new URLSearchParams(window.location.search)
    const value = params.get("id")

    setJoinInput({
      value,
      valid: joinCodeRegEx.test(value),
    })
  }, [])

  const handleInput = (e) => {
    setJoinInput({
      value: e.target.value,
      valid: joinCodeRegEx.test(e.target.value),
    })
  }

  const join = (e) => {
    if (e) {
      e.preventDefault()
    }
    const codeMatch = joinInput.value.toLowerCase().match(joinCodeRegEx)
    if (codeMatch && codeMatch[0]) {
      Axios.post(`/api/join/${codeMatch[0]}`, {id: lobby.peerId})
        .then((resp) => {
          dispatch({
            type: "lobby",
            payload: resp.data,
          })
        })
        .catch((err) => {
          if (err.message) {
            console.error(err.message)
          }
        })
    }
    else {
      console.error("BAD CODE")
    }
  }

  return (
    <main className="mt-1 px-4">
      <h2>Connect with Friends</h2>
      <p>Enter your invite link or code to join your friend's lobby.</p>
      <form onSubmit={join}>
        <label htmlFor="joinInput">
          <h2>Invite Link or Code</h2>
        </label>
        <div className="d-flex">
          <input
            id="joinInput"
            type='text'
            name='join'
            className={`form-control ${joinInput.value && (joinInput.valid ? "is-valid" : "is-invalid")}`}
            placeholder="00112233-4455-6677-8899-aabbccddeeff"
            pattern=".*[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}.*"
            title={"Must contain a valid 36-character lobby id (i.e.\u00a0\"00112233-4455-6677-8899-aabbccddeeff\")"}
            onChange={handleInput}
            value={joinInput.value}
            required
          />
          <button
            className={`btn btn-primary`}
            type="submit">
            Join
          </button>
        </div>
      </form>
    </main>
  )
}

export default connect(({ui, lobby}) => ({ui, lobby}))(TabJoin)