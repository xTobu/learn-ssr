import React from 'react';
import Cube from '../../components/Cube';
// import '../../../../publish/css/portfolio.css';

export default React.createClass({
    render() {
        return (
          <div className="portfolio">
            <Cube
              CubeUrl="https://www.sprite.tw/2017coolgame24s/index.html"
              HeaderImg="/img/projects/header/sprite.jpg"
              HeaderTitle="Sprite"
              HeaderEvent="沁涼絕殺24秒"
              ContentImg="img/projects/1.png"
            />

            <Cube
              CubeUrl="http://cell.webgene.com.tw/technic/project/Sprite/aws/2017beyou/"
              HeaderImg="/img/projects/header/sprite.jpg"
              HeaderTitle="Sprite"
              HeaderEvent="COOL玩瓶"
              ContentImg="img/projects/2.png"
            />

            <Cube
              CubeUrl="http://cell.webgene.com.tw/technic/Junxiang/FUBON/0503Vicky/"
              HeaderImg="/img/projects/header/fubon.png"
              HeaderTitle="Fubon"
              HeaderEvent="為你加油 友力放送"
              ContentImg="img/projects/3.png"
            />
          </div>
        );
    },
});
