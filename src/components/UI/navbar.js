import { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { chapter_btn } from "../../api/getBiblePeriodList.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBRow,
  MDBCol,
  MDBTypography
} from "mdb-react-ui-kit";

function NavBar() {
  const [showBasic, setShowBasic] = useState(false);
  const bible_cotnet = useSelector((state) => state.apiBibleData);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const displayBible = (part) => {
    if (bible_cotnet.length === 0) return false;
    let findBible = bible_cotnet[0].book.data.map((data) => {
      return data.part === part ? data : null;
    });
    return findBible
      .filter((origin) => {
        if (origin !== null) {
          return true;
        }
        return false;
      })
      .map((filter, i) => {
        return (
          <MDBDropdownItem
            key={i}
            link
            onClick={() => {
              MySwal.fire({
                showCloseButton: true,
                allowOutsideClick: false,
                html: (
                  <div>
                    <PerfectScrollbar>
                      <MDBTypography className="page-text pt-1 mb-0 text-center">
                        <MDBTypography tag="strong">
                          {filter.shortName} - {filter.part}
                        </MDBTypography>
                      </MDBTypography>

                      <MDBContainer>
                        <section>
                          <MDBRow>
                            <MDBCol>
                              {Array.from({ length: filter.numChapters }).map(
                                (_, i) => {
                                  return chapter_btn(
                                    filter.name,
                                    filter.id,
                                    i,
                                    dispatch
                                  );
                                }
                              )}
                            </MDBCol>
                          </MDBRow>
                        </section>
                      </MDBContainer>
                    </PerfectScrollbar>
                  </div>
                )
              });
              chapter_btn(filter.name, filter.id, i, dispatch);
            }}
          >
            {filter.name}
          </MDBDropdownItem>
        );
      });
  };

  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand>聖經閱讀器</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    舊約
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {displayBible("旧约")}
                    {/* <MDBDropdownItem link>Action</MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem> */}
                  </MDBDropdownMenu>
                </MDBDropdown>

                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    新約
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {displayBible("新约")}
                    {/* <MDBDropdownItem link>Action</MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem> */}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}

export default NavBar;
