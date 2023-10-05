import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
  MDBTypography
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter className="bg-dark text-center text-white">
      <MDBContainer className="p-4 pb-0">
        <section className="mb-4">
          <MDBRow>
            <MDBCol size="6">
              <MDBTypography>
                <MDBTypography tag="strong">@開發者</MDBTypography>
              </MDBTypography>
              <MDBBtn
                outline
                size="sm"
                color="light"
                floating
                className="m-1"
                href="https://www.facebook.com/profile.php?id=100063858622383"
                role="button"
              >
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>

              <MDBBtn
                outline
                size="sm"
                color="light"
                floating
                className="m-1"
                href="https://www.instagram.com/94justpang/"
                role="button"
              >
                <MDBIcon fab icon="instagram" />
              </MDBBtn>

              <MDBBtn
                outline
                size="sm"
                color="light"
                floating
                className="m-1"
                href="https://www.youtube.com/@pang9157"
                role="button"
              >
                <MDBIcon fab icon="youtube" />
              </MDBBtn>

              <MDBBtn
                outline
                size="sm"
                color="light"
                floating
                className="m-1"
                href="https://www.tiktok.com/@94justpang"
                role="button"
              >
                <MDBIcon fab icon="tiktok" />
              </MDBBtn>
            </MDBCol>
            <MDBCol size="6">
              <MDBTypography>
                <MDBTypography tag="strong">@新生命教會</MDBTypography>
              </MDBTypography>

              <MDBBtn
                outline
                size="sm"
                color="light"
                floating
                className="m-1"
                href="https://www.facebook.com/ournewlifechurch/?locale=zh_TW"
                role="button"
              >
                <MDBIcon fab icon="facebook" />
              </MDBBtn>

              <MDBBtn
                outline
                size="sm"
                color="light"
                floating
                className="m-1"
                href="https://www.instagram.com/nlctw/"
                role="button"
              >
                <MDBIcon fab icon="instagram" />
              </MDBBtn>
              <MDBBtn
                outline
                size="sm"
                color="light"
                floating
                className="m-1"
                href="https://www.youtube.com/@jesusfashionworship7397"
                role="button"
              >
                <MDBIcon fab icon="youtube" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <a className="text-white" href="https://www.newlife.org.tw//">
          <MDBTypography className="mb-0">
            <MDBTypography tag="em">
              <b>©NewLife新生命小組教會</b>
            </MDBTypography>
          </MDBTypography>
        </a>
      </div>
    </MDBFooter>
  );
}
