import React ,{ useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { database } from "../../firebase"
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './FolderFileIcon.css'
import 'reactjs-popup/dist/index.css';
import { useAuth } from "../../contexts/AuthenticationContexts"
import { Modal, Form } from "react-bootstrap"
import '../../Logo.css'
import logo from '../../logo.png'
import CopyToClipboard from 'react-copy-to-clipboard'
 

export default function Folder({ folder }) {

  const [Rename, setRename] = useState(false)
  const [open, setOpen] = useState(false)
  const { currentUser } = useAuth()
  const [FolderName, setFolderName] = useState(folder.name)

  function Delete(){
    const res = database.folders.doc(folder.id).delete();
    console.log('Delete: ', res);
  }

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

  function RenameFolder(e){
    e.preventDefault()
    database.files.doc(folder.id).update({
        name: FolderName
    })
    setRename(false)
  }


  return (
    <div className="file">
      <Button
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}
        variant="outline-dark"
        className="text-truncate w-100"
        as={Link}
      >
        <FontAwesomeIcon icon={faFolder} className="mr-2 icon" />
        {folder.name}
      </Button>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split variant="secondary" id="dropdown-custom-2" />
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="1"onClick={openRenameModal}>Rename</Dropdown.Item>
          <CopyToClipboard text={folder.url}>
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
        <p className="AreYouSure">Are you sure to delete this folder?</p>
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
            <Form onSubmit={RenameFolder}>
            <Modal.Body className="m-3 text-center">
                <h4 className="m-3 mb-4"> Rename Folder </h4>
                <Form.Group>
                    <Form.Control type="text" value={FolderName} onChange ={e => setFolderName(e.target.value)} />
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
