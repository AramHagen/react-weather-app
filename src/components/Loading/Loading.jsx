import './Loading.scss';
import PropTypes from 'prop-types';
function Loading({ width = '50px', height = '50px' }) {
    return (
        <div className="loader" style={{ width, height }}>
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
        </div>
    )
}
Loading.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
};

export default Loading
