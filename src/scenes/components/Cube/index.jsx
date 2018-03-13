import React from 'react';

export default React.createClass({
    render() {
        return (
          <div className="cube">
            <div className="cube_header">
              <img className="cube_img" src={this.props.HeaderImg} alt="cube_img" />
              <div className="cube_title">
                <ul>
                  <li>
                    <a href={this.props.CubeUrl} target="_blank" className="cube_title_brand">
                      {this.props.HeaderTitle}
                    </a>
                  </li>
                  <li>
                    <a href={this.props.CubeUrl} target="_blank" className="cube_title_event">
                      {this.props.HeaderEvent}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <a href={this.props.CubeUrl} target="_blank">
              <img className="imgBox" src={this.props.ContentImg} alt="" />
            </a>
          </div>
        );
    },
});
