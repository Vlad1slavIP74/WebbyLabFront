import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';
import FilmsCard from './components/FilmsCard'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('render FilmsCard', function () {
  const wrapper = shallow(<FilmsCard/>);
  const Films = <h2>Films</h2>
  expect(wrapper.contains(Films)).to.equal(true);
})
