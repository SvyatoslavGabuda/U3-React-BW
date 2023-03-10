import AOS from "aos";
import "aos/dist/aos.css";
import "./ScrollNavbarComponent.scss";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useLocation } from "react-router-dom";
import { AiFillLock, AiOutlineUserAdd } from "react-icons/ai";
import { Iprofile } from "../SearchBar/SearchInterface";
import { MdOutlineDone } from "react-icons/md";

export const ScrollNavbarComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const Friends = useAppSelector((state) => state.friends.Favfriends);
  useEffect(() => {
    AOS.init({ startEvent: "load", duration: 500, offset: 350, anchorPlacement: "top-top" });
  }, []);

  const currentProfile = useAppSelector((state) => state.profile.generalProfile);
  return (
    <>
      <Navbar
        className={`animation scrollNavbarContainer bg-light p-0 ${
          location.pathname.includes("/profile/") ? "" : "d-none"
        }`}
        data-aos="fade-down"
      >
        <Container className="d-flex aling-items-center py-2">
          <Row className="aling-items-center justify-content-between w-100">
            <Col className="d-flex align-items-center px-0">
              {currentProfile && (
                <>
                  <img
                    src={currentProfile.image}
                    alt="user img"
                    style={{ width: 40 + "px" }}
                    className="profileImgScroll"
                  />
                  <div className="d-flex flex-column ps-2">
                    <h6 className="profileNameScroll">{currentProfile.name + " " + currentProfile.surname}</h6>
                    <p className="profileTitleScroll">{currentProfile.title}</p>
                  </div>
                </>
              )}
            </Col>

            {location.pathname.includes("/profile/me") ? (
              <>
                <Col md={7} lg={6} xl={5} className="d-flex align-items-center justify-content-around px-0">
                  <Button className="rounded-pill firstButtonScrollMe">Altro</Button>
                  <Button className="rounded-pill secondButtonScrollMe">Aggiungi sezione del profilo</Button>
                  <Button className="rounded-pill thirdButtonScrollMe">Disponibile per</Button>
                </Col>
              </>
            ) : (
              <>
                <Col md={6} lg={5} xl={4} className="d-flex align-items-center justify-content-around px-0">
                  <Button className="rounded-pill firstButtonScroll py-1">Altro</Button>
                  <Button className="rounded-pill secondButtonScroll d-flex align-items-center py-1">
                    <AiFillLock className="me-1" />
                    <span>Messaggio</span>
                  </Button>
                  {!Friends.find((el: Iprofile) => el._id === currentProfile?._id) && (
                    <Button
                      className="rounded-pill thirdButtonScroll d-flex align-items-center py-1"
                      onClick={() => {
                        dispatch({ type: "ADDFRIENDTOFAV", payload: currentProfile });
                      }}
                    >
                      <AiOutlineUserAdd className="me-1" />
                      <span>Collegati</span>
                    </Button>
                  )}
                  {Friends.find((el: Iprofile) => el._id === currentProfile?._id) && (
                    <Button
                      className="Button6 d-flex align-items-center rounded-pill py-1"
                      onClick={() => {
                        dispatch({ type: "DELFRIENDFROMFAV", payload: currentProfile });
                      }}
                    >
                      <MdOutlineDone />
                      <p className="ms-1">Collegato</p>
                    </Button>
                  )}
                </Col>
              </>
            )}
          </Row>
        </Container>
      </Navbar>
    </>
  );
};
