const apiKey="456b4407a3984313b498f5affb04abf3";

const map=L.map("map").setView([coordinates[1],coordinates[0]],13);

L.tileLayer(
`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`,
{
 attribution:'© OpenStreetMap © Geoapify'}).addTo(map);
L.marker([coordinates[1], coordinates[0]])  .addTo(map)
  .bindPopup("Listing Location")
  .openPopup();
