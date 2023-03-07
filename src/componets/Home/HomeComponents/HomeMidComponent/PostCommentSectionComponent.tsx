import { Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import { BsClock, BsEmojiNeutral, BsImage } from "react-icons/bs";
import { IoIosRocket } from "react-icons/io";
import { useEffect, useState } from "react";
import { PostCommentComponent } from "./PostCommentComponent";
import { commentFetch, Icomments, IcommentsPost } from "../../../../app/reducers/commentSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

interface PostSectionProps {
  postId: string;
}

export const PostCommentSectionComponent = ({ postId }: PostSectionProps) => {
  const dispatch = useAppDispatch();
  const commentsStore = useAppSelector((state) => state.comments);
  const myProfile = useAppSelector((state) => state.profile.myProfile);
  const [commentText, setCommentText] = useState<IcommentsPost>({
    comment: "",
    rate: "5",
    elementId: postId,
  });

  const POSTmyComment = async (comment: IcommentsPost) => {
    await dispatch(commentFetch({ metod: "POST", id: "", commentToPost: comment }));
    dispatch(commentFetch({ metod: "GET", id: postId }));
  };

  useEffect(() => {
    dispatch(commentFetch({ metod: "GET", id: postId }));
  }, []);

  return (
    <div className="postCommentContainer pt-3">
      <div className="d-flex align-items-center justify-content-center">
        <img className="me-3" src={myProfile.image} alt="" style={{ width: 35 + "px", borderRadius: 50 + "px" }} />
        <InputGroup className="border rounded-pill d-flex align-items-center justify-content-start inputCommentContainer">
          <Form.Control
            className="border-0 rounded me-1 commentsInput"
            placeholder="Aggiungi un commento..."
            value={commentText.comment}
            onChange={(e) => setCommentText({ ...commentText, comment: e.target.value })}
            onKeyUp={(e) => {
              e.key === "Enter" && POSTmyComment(commentText);
              e.key === "Enter" && setCommentText({ ...commentText, comment: "" });
            }}
          />
          <span className="commentsIconContainer">
            <BsEmojiNeutral className="fs-4 me-2 text-secondary" />
            <BsImage className="fs-4 me-2 text-secondary" />
          </span>
        </InputGroup>
      </div>
      <div className="my-2 commentsDropdown">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="dropFilter ms-2">
            Filtra
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" className="d-flex align-items-center">
              <IoIosRocket className="fs-3 dropCommentIcon" />
              <span className="ms-3 commentsDropdownText">
                <h6 className="mb-0">Più rilevanti</h6>
                <p>Vedi i commenti più pertinenti</p>
              </span>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2" className="d-flex align-items-center">
              <BsClock className="fs-3 dropCommentIcon" />

              <span className="ms-3 commentsDropdownText">
                <h6 className="mb-0">Più recenti</h6>
                <p>Vedi tutti i commenti (i più recenti sono in alto)</p>
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row className="d-flex justify-content-center">
        {commentsStore.status === "idle" && commentsStore.comments?.length > 0 ? (
          commentsStore.comments.map((comment: Icomments, i: number) => (
            <PostCommentComponent comment={comment} commentIndex={i} key={i} />
          ))
        ) : (
          <Col xs={11} className="pt-3 pb-4">
            <h5>Ooops, ancora niente</h5>
            <p>Sembra che questo post ancora non abbia ricevuto commenti, torna più tardi.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};
