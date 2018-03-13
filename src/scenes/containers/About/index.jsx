import React from 'react';
// import '../../../../publish/css/about.css';

export default React.createClass({
    render() {
        return (
          <div className="about">

            <div id="Profile">
              <img src="img/Profile.jpg" alt="Profile" />
            </div>

            <h2>About me</h2>
            <p>A self-taught developer who learned from TreeHouse & StackOverflow.</p>
            <hr />
            <p className="bold">Skills：</p>
            <ul>
              <li>javascript, C#</li>
              <li>React, Webpack, ESLint, jQuery, TweenMax, SlickJS, WowJS</li>
              <li>Node.js, ASP.NET MVC, GCP, Azure, AWS</li>
            </ul>

            <hr />
            <p className="bold">Work history：</p>
            <ul>
              <li>Back-end Intern in MSI.</li>
              <li>Front-end Developer in WebGene.</li>
            </ul>
            <hr />
          </div>
        );
    },
});
