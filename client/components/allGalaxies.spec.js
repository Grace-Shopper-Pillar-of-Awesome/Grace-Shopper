// import { expect } from 'chai';
// import React from 'react';
// import enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { AllGalaxies } from './AllGalaxies';
// import { fetchGalaxies } from '../store/allGalaxies';

// const adapter = new Adapter();
// enzyme.configure({ adapter });

// const galaxies = [
//   {
//     name: 'Antennae Galaxies',
//     SKU: 'G000002',
//     description:
//       'The Antennae Galaxies (also known as NGC 4038/NGC 4039 or Caldwell 60/Caldwell 61) are a pair of interacting galaxies in the constellation Corvus. They are currently going through a starburst phase, in which the collision of clouds of gas and dust, with entangled magnetic fields, causes rapid star formation. They were discovered by William Herschel in 1785.',
//     distance: 45,
//     price: 2000,
//     imageUrl:
//       'https://upload.wikimedia.org/wikipedia/commons/3/30/Antennae_Galaxies_reloaded.jpg',
//     inventory: 10,
//     category: 'irregular',
//   },
//   {
//     name: 'Backward Galaxy',
//     SKU: 'G000003',
//     description:
//       'The spiral galaxy, NGC 4622 (also called Backward galaxy), lies approx. 111 million light years away from Earth in the constellation Centaurus. NGC 4622 is an example of a galaxy with leading spiral arms.[2] In spiral galaxies, spiral arms were thought to trail; the tips of the spiral arms winding away from the center of the galaxy in the direction of the disks orbital rotation. In NGC 4622, however, the outer arms are leading spiral arms; the tips of the spiral arms point towards the direction of disk rotation. This may be the result of a gravitational interaction between NGC 4622 and another galaxy or the result of a merger between NGC 4622 and a smaller object',
//     distance: 111,
//     price: 1200,
//     imageUrl: 'https://en.wikipedia.org/wiki/File:NGC_4622HSTFull.jpg',
//     inventory: 10,
//     category: 'spiral',
//   },
//   {
//     name: 'Black Eye Galaxy',
//     SKU: 'G000004',
//     description:
//       'The Black Eye Galaxy (also called Sleeping Beauty Galaxy or Evil Eye Galaxy and designated Messier 64, M64, or NGC 4826) is a relatively isolated[7] spiral galaxy 17 million light-years away in the mildly northern constellation of Coma Berenices. It was discovered by Edward Pigott in March 1779, and independently by Johann Elert Bode in April of the same year, as well as by Charles Messier the next year. A dark band of absorbing dust partially in front of its bright nucleus gave rise to its nicknames of the "Black Eye", "Evil Eye", or "Sleeping Beauty" galaxy.[10][11] M64 is well known among amateur astronomers due to its form in small telescopes and visibility across inhabited latitudes.',
//     distance: 17,
//     price: 1200,
//     imageUrl: 'https://en.wikipedia.org/wiki/File:Blackeyegalaxy.jpg',
//     inventory: 10,
//     category: 'spiral',
//   },
//   {
//     name: "Bode's Galaxy",
//     SKU: 'G000005',
//     description:
//       "Messier 81 (also known as NGC 3031 or Bode's Galaxy) is a grand design spiral galaxy about 12 million light-years away, with a diameter of 90,000 light years, in the constellation Ursa Major. Due to its proximity to our galaxy, large size, and active galactic nucleus (which harbors a 70 million M☉[5] supermassive black hole), Messier 81 has been studied extensively by professional astronomers. The galaxy's large size and relatively high brightness also makes it a popular target for amateur astronomers.",
//     distance: 12,
//     price: 1200,
//     imageUrl: 'https://en.wikipedia.org/wiki/File:Messier_81_HST.jpg',
//     inventory: 10,
//     category: 'elliptical',
//   },
// ];

// describe('All Galaxies', () => {
//   let allGalaxies;

//   beforeEach(() => {
//     const testState = {
//       elliptical: true,
//       irregular: true,
//       spiral: true,
//     };

//     allGalaxies = shallow(
//       <AllGalaxies
//         galaxies={galaxies}
//         getGalaxies={fetchGalaxies}
//         handleChange={(evt) => {
//           testState[evt.target.name] = !testState[evt.target.name];
//         }}
//       />
//     );

//     const elliptical = allGalaxies.find('input').at(0);
//     elliptical.simulate('change');
//     const irregular = allGalaxies.find('input').at(1);
//     irregular.simulate('change');
//     const spiral = allGalaxies.find('input').at(2);
//     spiral.simulate('change');
//   });

//   it('filters spiral galaxy types', () => {
//     const spiral = allGalaxies.find('input').at(2);
//     spiral.simulate('change');
//     expect(allGalaxies.find('p').at(0).text()).to.be.equal('Category: spiral');
//     expect(allGalaxies.find('p').at(0).text()).to.not.equal(
//       'Category: elliptical'
//     );
//     expect(allGalaxies.find('p').at(0).text()).to.not.equal(
//       'Category: irregular'
//     );
//   });

//   xit('filters elliptical galaxy types', () => {
//     const input = allGalaxies.find('input');
//     input.simulate('click', { target: { name: 'elliptical' } });
//     expect(allGalaxies.find('p').text()).to.be.equal('Category: elliptical');
//   });

//   xit('filters irregular galaxy types', () => {
//     const input = allGalaxies.find('input');
//     input.simulate('click', { target: { name: 'irregular' } });
//     expect(allGalaxies.find('p').text()).to.be.equal('Category: irregular');
//   });
// });
