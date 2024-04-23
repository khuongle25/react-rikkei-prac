// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setname] = useState('');
    const [job, setjob] = useState('');

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        if (res && res.updatedAt) {
            handleEditUserFromModal({ first_name: name, id: dataUserEdit.id })
            handleClose();
            toast.success('Edit user success');
        }
    }

    useEffect(() => {
        if (show) {
            setname(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalEditUser;
