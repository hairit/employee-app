import React from 'react';
import { useState } from 'react';
import '../CSS/Body.css';
// import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useHistory } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { BiChevronLeft } from 'react-icons/bi';
import { FaHome, FaProductHunt, FaUserFriends } from 'react-icons/fa';
import { RiFolderUserFill } from 'react-icons/ri';
import { FaMoneyBillWave } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { AiTwotoneSecurityScan } from 'react-icons/ai';
import Dashboard from '../Pages/Dashboard';
import Product from '../Pages/Product';
import Customer from '../Pages/Customer';
import Employee from '../Pages/Employee';
import Bills from '../Pages/Bills';
import Account from '../Pages/Account';
import { Route } from 'react-router-dom';

export default function Body() {
  const [openMenuDetail, setOpenMenuDetail] = useState(false);
  const [title, setTitle] = useState('');
  const history = useHistory();
  return (
    <div className="body">
      <div
        className="left-panel"
        style={{ width: openMenuDetail ? '20%' : 'auto' }}
      >
        <div
          style={{
            width: '100%',
            height: '7%',
          }}
        >
          <div
            onClick={() => setOpenMenuDetail(!openMenuDetail)}
            style={{
              float: 'right',
              backgroundColor: 'black',
              width: openMenuDetail ? 70 : '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <FiMenu style={{ color: '#FFFFFF', fontSize: 30 }}></FiMenu>
          </div>
        </div>
        <div className="left-menu">
          <NavLink to="/" className="nav" onClick={() => setTitle('Dashboard')}>
            <div
              className="menu-item"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaHome style={{ fontSize: 25 }}></FaHome>
              {openMenuDetail && (
                <div style={{ marginLeft: 20 }}> Dashboard</div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/products"
            className="nav"
            onClick={() => setTitle('Products')}
          >
            <div
              className="menu-item"
              style={{ display: 'flex', alignItems: 'center', height: '35px' }}
            >
              <FaProductHunt style={{ fontSize: 25 }}></FaProductHunt>
              {openMenuDetail && (
                <div style={{ marginLeft: 20 }}> Products</div>
              )}
            </div>
            {openMenuDetail && (
              <RiArrowDropDownLine
                style={{ fontSize: 35 }}
              ></RiArrowDropDownLine>
            )}
          </NavLink>
          <NavLink
            to="/customers"
            className="nav"
            onClick={() => setTitle('Customers')}
          >
            <div
              className="menu-item"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaUserFriends style={{ fontSize: 25 }}></FaUserFriends>
              {openMenuDetail && (
                <div style={{ marginLeft: 20 }}> Customers</div>
              )}
            </div>
            {openMenuDetail && (
              <RiArrowDropDownLine
                style={{ fontSize: 35 }}
              ></RiArrowDropDownLine>
            )}
          </NavLink>
          <NavLink
            to="/employees"
            className="nav"
            onClick={() => setTitle('Employees')}
          >
            <div
              className="menu-item"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <RiFolderUserFill style={{ fontSize: 25 }}></RiFolderUserFill>
              {openMenuDetail && (
                <div style={{ marginLeft: 20 }}> Employees</div>
              )}
            </div>
            {openMenuDetail && (
              <RiArrowDropDownLine
                style={{ fontSize: 35 }}
              ></RiArrowDropDownLine>
            )}
          </NavLink>
          <NavLink
            to="/bills"
            className="nav"
            onClick={() => setTitle('Bills')}
          >
            <div
              className="menu-item"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaMoneyBillWave style={{ fontSize: 25 }}></FaMoneyBillWave>
              {openMenuDetail && <div style={{ marginLeft: 20 }}> Bills</div>}
            </div>
            {openMenuDetail && (
              <RiArrowDropDownLine
                style={{ fontSize: 35 }}
              ></RiArrowDropDownLine>
            )}
          </NavLink>
          <NavLink
            to="/accounts"
            className="nav"
            onClick={() => setTitle('Accounts')}
          >
            <div
              className="menu-item"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <AiTwotoneSecurityScan
                style={{ fontSize: 25 }}
              ></AiTwotoneSecurityScan>
              {openMenuDetail && (
                <div style={{ marginLeft: 20 }}> Accounts</div>
              )}
            </div>
            {openMenuDetail && (
              <RiArrowDropDownLine
                style={{ fontSize: 35 }}
              ></RiArrowDropDownLine>
            )}
          </NavLink>
        </div>
      </div>
      <div className="workspace">
        <div className="workspace-head">
          <div style={{ color: '#FFFFFF', fontSize: 23 }}>{title}</div>
          <div
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => history.push('/')}
          >
            <FaHome style={{ color: '#FFFFFF', fontSize: 25 }}></FaHome>
            <div style={{ color: '#FFFFFF', marginLeft: 20 }}>/ Dashboard</div>
            <BiChevronLeft
              onClick={() => {}}
              style={{ color: '#FFFFFF', fontSize: 30, marginLeft: 20 }}
            ></BiChevronLeft>
          </div>
        </div>
        <div className="workspace-body">
          <Route
            path="/"
            exact
            component={() => <Dashboard></Dashboard>}
          ></Route>
          <Route
            path="/products"
            exact
            component={() => <Product></Product>}
          ></Route>
          <Route
            path="/customers"
            exact
            component={() => <Customer></Customer>}
          ></Route>
          <Route
            path="/employees"
            exact
            component={() => <Employee></Employee>}
          ></Route>
          <Route path="/bills" exact component={() => <Bills></Bills>}></Route>
          <Route
            path="/Accounts"
            exact
            component={() => <Account></Account>}
          ></Route>
        </div>
      </div>
      {/* <Container>
        <Row>
          <Col lg={6}>1</Col>
          <Col lg={6}>2</Col>
        </Row>
      </Container> */}
    </div>
  );
}
