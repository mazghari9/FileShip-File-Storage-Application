import React,{ useState } from "react"
import { Container } from "react-bootstrap"
import { useFolder } from "../../contexts/FolderContext"
import AddFolderButton from "./AddFolderBtn"
import AddFileButton from "./AddFileBtn"
import Folder from "./FolderComponent"
import File from "./FileComponent"
import Navbar from "./NavbarComponent"
import FolderBreadcrumbs from "./FolderBreadcrumbs"
import { useParams, useLocation } from "react-router-dom"
import './MainFolderComponent.css'
import { database } from "../../firebase"
import { useAuth } from "../../contexts/AuthenticationContexts"
import { ProgressBar, Alert } from 'react-bootstrap';
import sizeof from 'firestore-size'
import {Button, Modal, Form } from "react-bootstrap"


export default function Dashboard() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
  const { currentUser } = useAuth()
  const [storage, setStorage] = useState(false)
  let [size, setSize] = useState()

  function openStorage() {
    setStorage(true)
  }

  function closeStorage() {
    setStorage(false)
  }

  function Storage(){
    database.files
    .where('userId', '==', currentUser.uid)
    .get()
    .then((querySnapshot) => {
        let fileSize = 0
        querySnapshot.forEach((file) => {
          fileSize = fileSize + file.data()
        });
        const nowSize=sizeof(fileSize)
        setSize(nowSize/1000000)
    })

  }

  return (
    <div>
      {Storage()}
      <Navbar />
      <Container fluid >
        <div >
          <FolderBreadcrumbs currentFolder={folder} />
        </div>
        <br></br>
        <div className="displays">
          <div className="displayFolder">
            <div className="head">
              <h2>Folders</h2>
              <div className="AddButton folderbtn">
                <AddFolderButton currentFolder={folder}/>
              </div>
            </div>
            <hr />
            {childFolders.length > 0 && (
              <div className="d-flex flex-wrap">
                {childFolders.map(childFolder => (
                  <div
                    key={childFolder.id}
                    style={{ maxWidth: "250px" }}
                    className="p-2"
                  >
                    <Folder folder={childFolder} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="displayFile">
            <div className="head">
              <h2>Files</h2>
              <div className="AddButton filebtn">
                <AddFileButton currentFolder={folder}/> 
              </div>
            </div>
            <hr />
            {childFolders.length > 0 && childFiles.length > 0}
            {childFiles.length > 0 && (
              <div className="d-flex flex-wrap">
                {childFiles.map(childFile => (
                  <div
                    key={childFile.id}
                    style={{ maxWidth: "250px" }}
                    className="p-2"
                  >
                    <File file={childFile} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
      <Button onClick={openStorage} className="CheckStorage" variant="outline-danger" 
      style={{position:"absolute", bottom:"3rem", right:"6rem", minWidth:"200px"}}>
        Check Available Storage Space
      </Button>
      <Modal show={storage} onHide={closeStorage}>
          <div className="progress_bar">
              <ProgressBar now={size} />
          </div>
          <div className="storage__number">
              <small className="text-muted">Available space {((500 - size))} Mo  </small>
 
          </div>
      </Modal>
    </div>
  )
}
