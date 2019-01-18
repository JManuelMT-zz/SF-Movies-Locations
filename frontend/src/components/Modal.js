import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
    selectedMarker,
    selectMarker,
    removeMarker,
}) => (
    <div className="modal">
        <div>
            <p className="title_modal">
                General Information
            </p>
            <p>
                <strong>
                    Year:
                </strong>
                {` ${selectedMarker.releaseYear}`}
            </p>
            <p>
                <strong>
                    Location:
                </strong>
                {` ${selectedMarker.location}`}
            </p>
            <p>
                <strong>
                    Main Character:
                </strong>
                {` ${selectedMarker.mainActor}`}
            </p>
            <p>
                <strong>
                    Company:
                </strong>
                {` ${selectedMarker.company}`}
            </p>
            <p>
                <strong>
                    Director:
                </strong>
                {` ${selectedMarker.director}`}
            </p>
            <button className="btn btn_close" type="button" onClick={() => selectMarker()}>
                Close
            </button>
            <button className="btn btn_remove" type="button" onClick={() => removeMarker(selectedMarker.id)}>
                Remove
            </button>
        </div>
    </div>
)

Modal.propTypes = {
    selectedMarker: PropTypes.shape({}),
    selectMarker: PropTypes.func,
    removeMarker: PropTypes.func,
};

export default Modal;
