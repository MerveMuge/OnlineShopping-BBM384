import React from 'react';

export default class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'aboutUS'
        };
    }
  render() {
    return (
      <div className='container my-5'>
        <h4>About Us</h4>
        <br />
        <div>
        We are a team of 5 people:
        Hasan AKALP - Project Manager / Spring MASTER
        Umut PİRİ - Tester / React MASTER
        Merve Müge DELİKTAŞ - Software Analysist / Spring SEMI PRO
        Onur CANKUR - Change & Configuration Manager / React SEMI PRO
        D. Berat KARATAŞ - Software Architecture / React SEMI PRO

        And as Hacettepe University, Computer Engineering students, we developed such a website in our term project.
        </div>
    </div>
    );
  }
}
