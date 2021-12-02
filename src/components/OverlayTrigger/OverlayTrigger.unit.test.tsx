import React from 'react';
import { mount } from 'enzyme';

import { simulateMouseEnter, simulateMouseLeave, triggerPress } from '../../../test/utils';

import ModalContainer from '../ModalContainer';
import Overlay from '../Overlay';
import ButtonSimple from '../ButtonSimple';

import OverlayTrigger, { OVERLAY_TRIGGER_CONSTANTS as CONSTANTS } from './';

describe('<OverlayTrigger />', () => {
  let hoverOverlay;
  let pressOverlay;
  let trigger;

  beforeEach(() => {
    hoverOverlay = (
      <Overlay>
        <div>Hover Overlay</div>
      </Overlay>
    );

    pressOverlay = (
      <Overlay>
        <div>Press Overlay</div>
      </Overlay>
    );

    trigger = <ButtonSimple>Trigger</ButtonSimple>;
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <OverlayTrigger hoverOverlay={hoverOverlay} pressOverlay={pressOverlay} trigger={trigger} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot on press', () => {
      expect.assertions(1);

      const container = mount(
        <OverlayTrigger hoverOverlay={hoverOverlay} pressOverlay={pressOverlay} trigger={trigger} />
      );

      triggerPress(container.find(ButtonSimple));

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot on mouse enter', () => {
      expect.assertions(1);

      const container = mount(
        <OverlayTrigger hoverOverlay={hoverOverlay} pressOverlay={pressOverlay} trigger={trigger} />
      );

      simulateMouseEnter(container.find(ButtonSimple));

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot on mouse enter and leave', () => {
      expect.assertions(1);

      const container = mount(
        <OverlayTrigger hoverOverlay={hoverOverlay} pressOverlay={pressOverlay} trigger={trigger} />
      );

      simulateMouseEnter(container.find(ButtonSimple));

      simulateMouseLeave(container.find(ButtonSimple));

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot on mouse enter and press', () => {
      expect.assertions(1);

      const container = mount(
        <OverlayTrigger hoverOverlay={hoverOverlay} pressOverlay={pressOverlay} trigger={trigger} />
      );

      simulateMouseEnter(container.find(ButtonSimple));

      triggerPress(container.find(ButtonSimple));

      expect(container).toMatchSnapshot();
    });
  });

  describe('actions', () => {
    it('should render press overlay when component is pressed', () => {
      expect.assertions(2);

      const wrapper = mount(
        <div>
          <OverlayTrigger pressOverlay={pressOverlay} trigger={trigger} />
        </div>
      );

      expect(wrapper.find(ModalContainer).exists()).toBe(false);

      triggerPress(wrapper.find(ButtonSimple));

      expect(wrapper.find(ModalContainer).exists()).toBe(true);
    });

    it('should render hover overlay when mouse enters component', () => {
      expect.assertions(2);

      const wrapper = mount(
        <div>
          <OverlayTrigger hoverOverlay={hoverOverlay} trigger={trigger} />
        </div>
      );

      expect(wrapper.find(ModalContainer).exists()).toBe(false);

      simulateMouseEnter(wrapper.find(ButtonSimple));

      expect(wrapper.find(ModalContainer).exists()).toBe(true);
    });

    it('should unrender hover overlay when mouse leaves component', () => {
      expect.assertions(2);

      const wrapper = mount(
        <div>
          <OverlayTrigger hoverOverlay={hoverOverlay} trigger={trigger} />
        </div>
      );

      simulateMouseEnter(wrapper.find(ButtonSimple));

      expect(wrapper.find(ModalContainer).exists()).toBe(true);

      simulateMouseLeave(wrapper.find(ButtonSimple));

      expect(wrapper.find(ModalContainer).exists()).toBe(false);
    });

    it("should leave hover overlay on press when 'preserveHoverOnPress'", () => {
      expect.assertions(2);

      const wrapper = mount(
        <div>
          <OverlayTrigger
            hoverOverlay={hoverOverlay}
            preserveHoverOnPress
            pressOverlay={pressOverlay}
            trigger={trigger}
          />
        </div>
      );

      simulateMouseEnter(wrapper.find(ButtonSimple));

      expect(wrapper.find(ModalContainer).exists()).toBe(true);

      triggerPress(wrapper.find(ButtonSimple));

      expect(wrapper.find(ModalContainer).length).toBe(2);
    });

    it("should remove hover overlay on press when not 'preserveHoverOnPress'", () => {
      expect.assertions(2);

      const wrapper = mount(
        <div>
          <OverlayTrigger
            hoverOverlay={hoverOverlay}
            pressOverlay={pressOverlay}
            trigger={trigger}
          />
        </div>
      );

      simulateMouseEnter(wrapper.find(ButtonSimple));

      expect(wrapper.find(ModalContainer).exists()).toBe(true);

      triggerPress(wrapper.find(ButtonSimple));

      expect(wrapper.find(ModalContainer).length).toBe(1);
    });

    it('should pass position props to overlay on press when relative', () => {
      expect.assertions(1);

      const wrapper = mount(
        <div>
          <OverlayTrigger
            pressOverlay={pressOverlay}
            pressPositioning={CONSTANTS.POSITIONINGS.RELATIVE}
            trigger={trigger}
          />
        </div>
      );

      triggerPress(wrapper.find(ButtonSimple));

      const expected = {
        center: {
          x: NaN,
          y: NaN,
        },
        horizontalRadius: 0,
        verticalRadius: 0,
      };

      expect(wrapper.find(Overlay).props().targetPosition).toMatchObject(expected);
    });

    it('should not pass position props to overlay on press when none', () => {
      expect.assertions(1);

      const wrapper = mount(
        <div>
          <OverlayTrigger
            pressOverlay={pressOverlay}
            pressPositioning={CONSTANTS.POSITIONINGS.NONE}
            trigger={trigger}
          />
        </div>
      );

      triggerPress(wrapper.find(ButtonSimple));

      expect(wrapper.find(Overlay).props().targetPosition).toBeUndefined();
    });

    it('should pass position props to overlay on mouse enter when relative', () => {
      expect.assertions(1);

      const wrapper = mount(
        <div>
          <OverlayTrigger
            hoverOverlay={hoverOverlay}
            hoverPositioning={CONSTANTS.POSITIONINGS.RELATIVE}
            trigger={trigger}
          />
        </div>
      );

      simulateMouseEnter(wrapper.find(ButtonSimple));

      const expected = {
        center: {
          x: NaN,
          y: NaN,
        },
        horizontalRadius: 0,
        verticalRadius: 0,
      };

      expect(wrapper.find(Overlay).props().targetPosition).toMatchObject(expected);
    });

    it('should not pass position props to overlay on mouse enter when none', () => {
      expect.assertions(1);

      const wrapper = mount(
        <div>
          <OverlayTrigger
            hoverOverlay={hoverOverlay}
            hoverPositioning={CONSTANTS.POSITIONINGS.NONE}
            trigger={trigger}
          />
        </div>
      );

      simulateMouseEnter(wrapper.find(ButtonSimple));

      expect(wrapper.find(Overlay).props().targetPosition).toBeUndefined();
    });
  });
});
