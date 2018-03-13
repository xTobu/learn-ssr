import React from 'react';
import NavLink from '../NavLink';

export default React.createClass({
    render() {
        return (
          <div className="header">
            <h1>Tobu</h1>
            <nav>
              <span>
                <NavLink to="/" onlyActiveOnIndex>About</NavLink>
              </span>
              <span>
                <NavLink to="/portfolio" >Portfolio</NavLink>
              </span>
              <span>
                <a href="https://xtobu.github.io/" target="_blank" rel="noopener noreferrer">Notes</a>
              </span>
              <span>
                <NavLink to="/redux" >Redux</NavLink>
              </span>
            </nav>
          </div>
        );
    },
});
