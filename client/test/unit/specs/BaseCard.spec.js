import { createLocalVue, mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";
import BaseCard from "../../../src/components/UI/BaseCard.vue";

// describe("Task component unit test: ", () => {
//   test("renders the card name", () => {
//     const cardName = "sth";
//     const wrapper = mount(BaseCard, {
//       propsData: {
//         title: cardName
//       }
//     });
//     expect(wrapper.html()).toContain(cardName);
//   });
// });

describe("BaseCard.vue test: ", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });
  it("should have a custom title and match snapshot", () => {
    const wrapper = mount(BaseCard, {
      localVue,
      vuetify,
      propsData: { title: "Foobar" }
    });

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot();

    // We could also verify this differently
    // by checking the text content
    const title = wrapper.find(".v-card__title > span");

    expect(title.text()).toBe("Foobar");
  });
});
