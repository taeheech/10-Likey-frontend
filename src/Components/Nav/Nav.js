import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import { API } from "../../config";
import Secondlist from "./Secondlist";
import LoadingModal from "../LoadingModal/LoadingModal";
import ScrollLock, { TouchScrollable } from "react-scrolllock";
import "./Nav.scss";

class Nav extends Component {
  state = {
    active: "",
    mask: false,
    value: "",
    products: [],
    isModalOpen: false,
    isLoading: false,
    isLogin: localStorage.getItem("token"),
  };

  componentDidMount() {
    fetch(`${API}/product/titles`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ products: res.titles });
      });
  }

  getValue = (e) => {
    this.setState({ value: e.target.value });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  logOutHandler = () => {
    localStorage.removeItem("token");
    this.setState({ isLogin: false });
  };

  logInHandler = () => {
    this.setState({ isLogin: true });
  };

  handleModals = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false, isModalOpen: true });
    }, 300);
  };

  render() {
    const { mask, value, products } = this.state;
    const { getValue } = this;

    return (
      <div className="Nav">
        <div className="navWrapper">
          <div className="navFirst">
            <ul className="navFirstLeft">
              <li className="leftList">
                <Link className="link" to="/">
                  Nike
                </Link>
              </li>
              <li className="leftList">Join Us</li>
              <li className="leftList">
                <img alt="jordanImage" src="/Images/Main/jordan.png" />
              </li>
              <li className="leftList">
                <img
                  className="converse"
                  alt="converseImage"
                  src="/Images/Main/converse.png"
                />
              </li>
            </ul>
            {this.state.isLogin ? (
              <ul className="navFirstRight">
                <li className="rightList">
                  <Link className="signUp" to="/" onClick={this.logOutHandler}>
                    로그아웃 /
                  </Link>
                </li>
                <li className="rightList">고객센터</li>
                <li className="rightList">
                  <Link to="/cart">
                    <img
                      className="cart"
                      alt="cart"
                      src="/Images/Main/cart.png"
                    />
                  </Link>
                </li>
                <li className="rightList">
                  <img
                    className="address"
                    alt="address"
                    src="/Images/Main/대한민국.png"
                  />
                </li>
              </ul>
            ) : (
              <ul className="navFirstRight">
                <li className="rightList">
                  <Link className="signUp" to="/signup">
                    회원가입
                  </Link>
                </li>
                <li className="rightList">
                  <span onClick={this.handleModals}>&nbsp; / 로그인</span>
                  {this.state.isLoading && <LoadingModal />}
                  {this.state.isModalOpen && (
                    <SignIn
                      close={this.closeModal}
                      logInHandler={this.logInHandler}
                    />
                  )}
                </li>
                <li className="rightList">고객센터</li>
                <li className="rightList">
                  <img
                    className="cart"
                    alt="cart"
                    src="/Images/Main/cart.png"
                  />
                </li>
                <li className="rightList">
                  <img
                    className="address"
                    alt="address"
                    src="/Images/Main/대한민국.png"
                  />
                </li>
              </ul>
            )}
          </div>
          <div className="navSecond">
            <div className="logoWrapper">
              <Link to="/">
                <img className="logo" alt="logo" src="/Images/Main/logo.png" />
              </Link>
            </div>
            <ul className="navSecondMenu">
              <Secondlist
                type="new"
                name="NEW RELEASES"
                active={this.state.active}
                handleMouse={this.setState.bind(this)}
              />
              <Secondlist
                type="men"
                name="MEN"
                active={this.state.active}
                handleMouse={this.setState.bind(this)}
              />
              <Secondlist
                type="women"
                name="WOMEN"
                active={this.state.active}
                handleMouse={this.setState.bind(this)}
              />
              <Secondlist
                type="kids"
                name="KIDS"
                active={this.state.active}
                handleMouse={this.setState.bind(this)}
              />
            </ul>
            <span className="searchWrapper">
              <img alt="search" src="/Images/Main/search.png" />
              <input
                onClick={() => this.setState({ mask: !mask })}
                onChange={getValue}
                className="searchInput"
                placeholder="검색"
              />
              <ScrollLock isActive={mask === true} />
              <div className={mask ? "searchFilterWrapper" : "off"}>
                <h4 className={!value ? "h4" : "off"}>검색어를 입력해주세요</h4>
                <ul className="filterKeywordWrapper">
                  {products.map(({ productId, title }, idx) => {
                    if (value && title.includes(value)) {
                      return (
                        <li
                          onClick={() => this.setState({ mask: !mask })}
                          key={idx}
                          className="filterKeyword"
                        >
                          <Link
                            className="filterLink"
                            to={`/detail/${productId}`}
                          >
                            {title}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </span>
          </div>
        </div>
        <div
          onClick={() => this.setState({ mask: false })}
          className={mask ? "searchMask" : "off"}
        ></div>
      </div>
    );
  }
}
export default Nav;
