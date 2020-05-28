import React from "react";
import { FormControl, Button } from "react-bootstrap";

export class AdminFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [
        {
          email: "email@gmail.com",
          nameSurname: "Name1 Surname1",
          message:
            "message message messagemessage messagemessage message message messagemessage messagemessage message message messagemessage messagemessage message message messagemessage messagemessage",
          id: 1
        },
        {
          email: "email1@gmail.com",
          nameSurname: "Name2 Surname2",
          message: "message message messagemessage messagemessage",
          id: 2
        },
        {
          email: "email2@gmail.com",
          nameSurname: "Name2 Surname2",
          message: "message message messagemessage messagemessage",
          id: 3
        }
      ]
    };
  }

  render() {
    var feedbacks = this.state.feedbacks.map(feedback => (
      <div
        key={feedback.id}
        className='row border container py-3 mb-2 bg-light'
      >
        <div className='col'>
          <FormControl
            as='textarea'
            rows='1'
            style={{ minWidth: 100 }}
            type='text'
            defaultValue={"Notification ID:" + feedback.id}
            readOnly
            plaintext
            className='row border bg-white mb-2 py-2 font-weight-bold'
          />
          <FormControl
            as='textarea'
            rows='1'
            style={{ minWidth: 100 }}
            type='text'
            defaultValue={feedback.nameSurname}
            readOnly
            plaintext
            className='row border bg-white mb-2 py-2 font-weight-bold'
          />
          <FormControl
            as='textarea'
            rows='4'
            style={{ minWidth: 100 }}
            type='text'
            defaultValue={feedback.message}
            readOnly
            plaintext
            className='row border bg-white py-2 font-weight-bold'
          />
        </div>
        <a
          className='text-white btn btn-primary col-2 mt-auto mr-2 ml-0'
          style={{ minWidth: 60 }}
          variant='primary text-center'
          href={"mailto:" + feedback.email}
          target='_blank'
        >
          Answer
        </a>
      </div>
    ));
    return (
      <React.Fragment>
        <div className='container my-5'>
          <h4>Feedbacks</h4>
          <br />
          <div className='col'>
            <div className='row container py-3'>
              <FormControl
                style={{ minWidth: 75 }}
                type='text'
                placeholder='Search'
                className='mr-sm-2 col-8'
              />
              <Button
                style={{ minWidth: 75 }}
                variant='outline-primary text-center'
                className='col-3'
              >
                Search
              </Button>
            </div>
            <div className='row border container py-3 mb-2'>
              <div className='col'>
                <strong className='row border mb-2'>
                  Notification ID: 0001
                </strong>{" "}
                <strong className='row border mb-2'>
                  Name Surname: Onur C.
                </strong>{" "}
                <strong className='row border pb-5'>
                  Message: Efenim? N'aptınız?
                </strong>{" "}
              </div>
              <Button
                style={{ minWidth: 75 }}
                variant='primary text-center'
                className='col-2 mt-auto mx-2'
              >
                Answer
              </Button>
            </div>
            <div className='row border container py-3 mb-2'>
              <div className='col'>
                <strong className='row border mb-2'>
                  Notification ID: 0002
                </strong>{" "}
                <strong className='row border mb-2'>
                  Name Surname: Berat K.
                </strong>{" "}
                <strong className='row border pb-5'>
                  Message: Allah'a Şükür İdare Ediyoruz. Ya Siz?
                </strong>{" "}
              </div>
              <Button
                style={{ minWidth: 75 }}
                variant='primary text-center'
                className='col-2 mt-auto mx-2'
              >
                Answer
              </Button>
            </div>
            <div className='row border container py-3 mb-2'>
              <div className='col'>
                <strong className='row border mb-2'>
                  Notification ID: 0003
                </strong>{" "}
                <strong className='row border mb-2'>
                  Name Surname: Onur C.
                </strong>{" "}
                <strong className='row border pb-5'>
                  Message: Yuvarlanıp Gidiyoruz Bakalım.
                </strong>{" "}
              </div>
              <Button
                style={{ minWidth: 75 }}
                variant='primary text-center'
                className='col-2 mt-auto mx-2'
              >
                Answer
              </Button>
            </div>
            <div className='row border container py-3 mb-2'>
              <div className='col'>
                <strong className='row border mb-2'>
                  Notification ID: 0004
                </strong>{" "}
                <strong className='row border mb-2'>
                  Name Surname: Berak K.
                </strong>{" "}
                <strong className='row border pb-5'>
                  Message: Hadi Bakiyim :D
                </strong>{" "}
              </div>
              <Button
                style={{ minWidth: 75 }}
                variant='primary text-center'
                className='col-2 mt-auto mx-2'
              >
                Answer
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
