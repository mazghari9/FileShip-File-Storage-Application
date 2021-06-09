import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import './FolderFileIcon.css'
import './x.css'
import { database } from "../../firebase"
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useAuth } from "../../contexts/AuthenticationContexts"
import { Button, Modal, Form } from "react-bootstrap"
import '../../Logo.css'
import logo from '../../logo.png'
import { Link } from "react-router-dom"
import CopyToClipboard from 'react-copy-to-clipboard'


export default function File({ file }) {

  const [Rename, setRename] = useState(false)
  const [open, setOpen] = useState(false)
  const [FileName, setFileName] = useState(file.name)
  const { currentUser } = useAuth()

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function openRenameModal(){
    setRename(true)
  }

  function closeRenameModal(){
    setRename(false )
  }

  function RenameFile(e){
    e.preventDefault()
    database.files.doc(file.id).update({
        name: FileName
    })
    setRename(false)
  }

  function Delete(){
    const res = database.files.doc(file.id).delete();
    console.log('Delete: ', res);
    
  }

  

  return (
    <div className="file">
      <a
        href={file.url}
        target="_blank"
        className="btn btn-outline-dark text-truncate w-100"
      >
        <FontAwesomeIcon icon={faFile} className="mr-2 icon" />
        {file.name}
        
      </a>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" />
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="1" onClick={openRenameModal}>Rename</Dropdown.Item>
          <CopyToClipboard text={file.url}>
            <Dropdown.Item eventKey="2">Copy Link</Dropdown.Item>
          </CopyToClipboard>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4" onClick={openModal}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={open} onHide={closeModal}>
        <br></br>
        <Link to='/'><img className="Logo__png addF" src={logo}/></Link> 
        <br></br>   
        <p className="AreYouSure">Are you sure to delete this file?</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="danger" type="submit" onClick={Delete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={Rename} onHide={closeRenameModal}>
            <Form onSubmit={RenameFile}>
            <Modal.Body className="m-3 text-center">
                <h4 className="m-3 mb-4"> Rename File </h4>
                <Form.Group>
                    <Form.Control type="text" value={FileName} onChange ={e => setFileName(e.target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="light" className="m-2" onClick={closeRenameModal}>Cancel</Button>
                <Button variant="success" className="m-2" type="submit">Rename</Button>
            </Modal.Footer>
            </Form>
        </Modal>
      
    </div>
  )
}
