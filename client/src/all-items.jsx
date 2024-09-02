/*export async function loadItems() {
  try {
    const response = await fetch("http://localhost:3000/items", {
      method: "GET",
      mode: "no-cors",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
  
}
*/
export const singleItem = {
  id: null,
  name: "",
  url: "",
  condition: "",
};

export const allItems = [
  {
    id: 1,
    name: "Canon EOS R6 Mark II Bod",
    url: "https://i.ebayimg.com/images/g/CvgAAOSwx9djre5E/s-l1600.webp",
    condition: "New",
  },
  {
    id: 2,
    name: "LG OLED65C3P 65-Inch OLED evo C3 4K Smart TV",
    url: "https://i.ebayimg.com/thumbs/images/g/wYcAAOSwV2hka69F/s-l960.webp",
    condition: "Open Box",
  },
  {
    id: 3,
    name: "Sony MDRRF912RK Wireless Stereo Home Theater Headphones, Black",
    url: "https://i.ebayimg.com/images/g/FVQAAOSwBQJlxBp3/s-l1600.webp",
    condition: "Refurbished",
  },
  {
    id: 4,
    name: "FAO Schwarz Stage Stars Portable Piano and Synthesizer",
    url: "https://i.ebayimg.com/images/g/LmcAAOSwvPNmoZuq/s-l1600.webp",
    condition: "Used",
  },
];
