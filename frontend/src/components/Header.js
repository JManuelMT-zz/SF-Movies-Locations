import React from 'react';
import PropTypes from 'prop-types';
import setFirstCharToCapital from '../../../utils/setFirstCharToCapital';

const Header = ({
    searchLocation,
    setFoundLocations,
    foundLocations,
    setNewMarker,
}) => {
    const doSearch = (e) => {
        const searchWord = e.target.value;
        // It'll wait until user write more than 2 characters to search
        if (searchWord.length > 2) {
            /*  We need to have the first letter of every word
                in capitalto obtain good results from api   */
            const formatWord = setFirstCharToCapital(searchWord);
            searchLocation(formatWord);
        } else {
            setFoundLocations();
        }
    };
 
    return (
        <div className="header">
            <div>
                <div>
                    <input
                        type="text"
                        className="search"
                        placeholder="Write a San Francisco Movie Location"
                        onChange={e => doSearch(e)}
                        onFocus={e => doSearch(e)}
                    />
                </div>
                <div className={foundLocations.length > 0 ? 'search_results' : ''}>
                    {foundLocations.map(foundLocation => (
                        // We don't have focus on this element so It's better omit this rule
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <div
                            onClick={() => {
                                setNewMarker(foundLocation);
                                setFoundLocations();
                            }}
                            key={`search_${foundLocation.lat}_${foundLocation.lng}_${foundLocation.releaseYear}`}
                        >
                            <p className="search_locations">
                                {foundLocation.location}
                            </p>
                            <p className="search_detail">
                                {`Director: ${foundLocation.director}. ${foundLocation.releaseYear}`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="header_title">
                SFM LOCATIONS
            </div>
        </div>
    );
};

Header.propTypes = {
    searchLocation: PropTypes.func,
    foundLocations: PropTypes.arrayOf(Object),
    setNewMarker: PropTypes.func,
    setFoundLocations: PropTypes.func,
};

export default Header;
