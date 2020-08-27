import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem';


configure({adapter: new Adapter()});

describe('Navigation Items', function () {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    });

    it('should render two Navigation Items elements if not authenticated', function () {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)

        
    });

    it('should render three Navigation Items elements if authenticated', function () {
        wrapper = shallow(<NavigationItems isAuthenticated />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });

    it('should render three Navigation Items elements if authenticated', function () {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    });

});