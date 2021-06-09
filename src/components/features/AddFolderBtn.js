import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { database } from "../../firebase"
import { useAuth } from "../../contexts/AuthenticationContexts"
import { ROOT_FOLDER } from "../../contexts/FolderContext"
import './AddButtons.css'
import '../../Logo.css'
import logo from '../../logo.png'
import { Link, useHistory } from "react-router-dom"


export default function AddFolder({ currentFolder }) {

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { currentUser } = useAuth()

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (currentFolder == null) return

    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    })
    setName("")
    closeModal()
  }


    return (
        <div>
            <Button onClick={openModal} variant="outline-secondary" size="md">
                AddFolder
            </Button>

            <Modal show={open} onHide={closeModal}>
              <br></br>

            <Link to='/'><img className="Logo__png addF" src={logo}/></Link>
            <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                <Form.Label>Folder Name</Form.Label>
                <Form.Control
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                Close
                </Button>
                <Button variant="warning" type="submit">
                Add Folder
                </Button>
            </Modal.Footer>
            </Form>
            </Modal>
        </div>
    )
}
