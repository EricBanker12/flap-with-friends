import React from "react"
import { connect } from "react-redux"

const InviteLink = ({lobby}) => {
  if (typeof window === typeof undefined)
    return null

  const inviteLink = new URL(`?join=${lobby.lobbyId}`, window.location)

  const copyInviteLink = (e) => {
    navigator.clipboard.writeText(inviteLink)
  }

  return (
    <label className="d-flex align-items-center mt-3 flex-wrap">
      <span className="d-block">Invite&nbsp;Link:&nbsp;</span>
      <input
        type="text"
        className="form-control w-25 flex-grow-1"
        value={inviteLink}
      />
      <button
        type="button"
        className="btn btn-success"
        onClick={copyInviteLink}>
        Copy
      </button>
    </label>
  )
}

export default connect(({lobby}) => ({lobby}))(InviteLink)