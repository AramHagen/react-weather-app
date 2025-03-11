import styles from './Layout.module.scss';
import PropTypes from 'prop-types';

function Layout({ children }) {
    return (
        <div className={`${styles.container}`}>
            <div
                className={`${styles['container-size']}`}
            >
                {children}
            </div></div>
    )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout
