const bands = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

const bandSortedObjects = bands.map(
    (band) => ({
        original: band, 
        cleaned: band.replace(/^(the |an |a )/i, "")
    })
).sort((a, b) => a.cleaned > b.cleaned ? 1 : -1);


const sortedBands = bandSortedObjects.map((band) => band.original);

document.querySelector('#bands').innerHTML =
    sortedBands.map((band) => `<li>${band}</li>`).join('');