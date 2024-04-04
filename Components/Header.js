import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}` });
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Link href="/">
          <a className="nav-link">
            <h4 className="position-relative m-3"> Neo-Manager </h4>{" "}
          </a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>

          {/* Check User is Authenticated or not */}
          {session ? (
            <Nav>
              <Link href="">
                <>
                  <img
                    width="30"
                    height="30"
                    className="rounded-circle"
                    src={process.env.NEXT_PUBLIC_BASE_URL + session.profilepath}
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/default.png";
                    }}
                  />{" "}
                  <a className="nav-link">{session.user.name} </a>
                </>
              </Link>

              <Link href="">
                <a onClick={() => handleSignOut()} className="nav-link">
                  Sign out
                </a>
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Link href="/signin">
                <a className="nav-link">Sign In</a>
              </Link>

              <Link href="/register">
                <a className="nav-link">Register</a>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
