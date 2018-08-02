import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import  { Component } from 'react';
import Select from 'react-select';
import './App.css';
import {loadDept,loadEmp} from './Actions/selectAction';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

Enzyme.configure({ adapter: new Adapter() });

describe("A suite", function() {

it('renders the button of getDetails', () => {
  const mockCallBack = jest.fn();

  const button = shallow((<button onClick={mockCallBack}>Get Details</button>));
  button.find('button').simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});
});