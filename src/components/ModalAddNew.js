// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [name, setname] = useState('');
    const [job, setjob] = useState('');
    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        if (res && res.id){
            handleClose();
            setname('');
            setjob('');
            toast.success('Create user success');
            handleUpdateTable({first_name: name, id: res.id});
        } else {
            //error
            toast.error('Create user fail');
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div class="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text" class="form-control"
                                value={name}
                                onChange={(event) => setname(event.target.value)}
                            />
                        </div>
                        <div class="mb-3">
                            <label className="form-label">Job</label>
                            <input type="text" class="form-control"
                                value={job}
                                onChange={(event) => setjob(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddNew;
