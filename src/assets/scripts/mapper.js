export function mapData(data) {
  return {
    type: "FeatureCollection",
    features: data.map((obj, index) => ({
      id: index,
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [obj.lat, obj.long]
      },
      properties: {
        reviews: obj.reviews
      }
    }))
  };
}
