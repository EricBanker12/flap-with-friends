import React from "react"
import { connect } from "react-redux"

const InviteLink = ({lobby}) => {
  if (typeof window === typeof undefined)
    return null

  const inviteLink = new URL(`/join?id=${lobby.lobbyId}`, window.location)

  const copyInviteLink = (e) => {
    navigator.clipboard.writeText(inviteLink)
  }

  return (
    <label className="d-block">
      <h2>Invite Link</h2>
      <div className="d-flex w-100">
        <input
          type="text"
          className="form-control bg-white"
          value={inviteLink}
          readOnly
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={copyInviteLink}>
          Copy
        </button>
      </div>
    </label>
  )
}

export default connect(({lobby}) => ({lobby}))(InviteLink)