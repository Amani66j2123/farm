import { Container, Row, Col, Input, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { savePost } from "../Features/PostSlice";

const SharePosts = () => {
  const [postMsg, setpostMsg] = useState("");
  const dispatch = useDispatch();
  const email = useSelector((state) => state.users.user.email);

  const handlePost = async () => {
    if (!postMsg.trim()) {
      alert("Post message is required.");
      return;
    }

    const postData = {
      postMsg: postMsg,
      email: email,
    };

    dispatch(savePost(postData));
    setpostMsg("");
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <Input
            id="share"
            name="share"
            placeholder="Share your suggestions to improve Farm"
            type="textarea"
            value={postMsg}
            onChange={(e) => setpostMsg(e.target.value)}
            className="mb-3 p-3"
            style={{
              minHeight: "120px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              resize: "none",
            }}
          />
          <div className="d-flex justify-content-end">
            <Button
              onClick={handlePost}
              className="px-4 py-2"
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "1rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
              Post Your Suggestion
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;