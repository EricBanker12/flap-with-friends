import React, { useState } from "react"
import { connect } from "react-redux"
import Axios from "axios"

const TabJoin = ({ui, lobby, dispatch, tab}) => {
  const [joinCode, setJoinCode] = useState("")

  const handleInput = (e) => {
    setJoinCode(e.target.value)
  }

  const join = (e) => {
    e.preventDefault()
    const joinCodeRegEx = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
    const codeMatch = joinCode.toLowerCase().match(joinCodeRegEx)
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
    <div className="mt-1" hidden={ui.tab !== tab}>
      <h2>Connect with Friends</h2>
      <p>Enter your invite link or code to join your friend's lobby.</p>
      <form onSubmit={join}>
        <label className="d-block">
          <span>Invite link or code:</span>
          <input
            className="form-control"
            type='text'
            name='join'
            preview="test"
            placeholder="00112233-4455-6677-8899-aabbccddeeff"
            pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
            title={"Must contain a valid 36-character lobby id (i.e.\u00a0\"00112233-4455-6677-8899-aabbccddeeff\")"}
            onChange={handleInput}
            required
          />
        </label>
        <button
          className={`btn btn-primary btn-lg w-100`}
          type="submit">
          Join
        </button>
      </form>
    </div>
  )
}

export default connect(({ui, lobby}) => ({ui, lobby}))(TabJoin)