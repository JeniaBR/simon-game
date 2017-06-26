import React from 'react';
import './ModalBox.css';

const ModalBox = (props) => (

    <div className='my-modal'>
        <div className='my-modal-content'>
            <div className='my-modal-body'>
              {props.children}
            </div>
        </div>
    </div>
);

export default ModalBox;