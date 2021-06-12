import { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

function KickMemberModal({ groupData, member, membershipsArray, setMembershipsArray, membersArray, setMembersArray }) {
    const [open, setOpen] = useState(false)

    // Uncomment fetch to test backend persistence once Join Group is working
    function handleKick() {
        setMembersArray([...membersArray].filter((m) =>  m.id !== member.id))

        const foundMembership = membershipsArray.find((membership) => membership.user_id === member.id && membership.group_id === groupData.id)
        setMembershipsArray([...membershipsArray].filter((membership) => membership !== foundMembership))

        // fetch(`http://localhost:3000/memberships/${foundMembership.id}`, {
        //     method: "DELETE",
        //     headers: {"Authorization": localStorage.token}
        // })
    }

    return(
        <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      dimmer="blurring"
      trigger={<span className="admin-star">🚫</span>}
    >
      <Modal.Content>
        <div className="kick-modal">
            <p>Kick <span className="bold">{member.username}</span> from <span className="bold">{groupData.group_name}</span>?</p>
            <Button onClick={handleKick}>Yes</Button><Button onClick={() => setOpen(false)}>No</Button>
        </div>
      </Modal.Content>
    </Modal>
    )
}

export default KickMemberModal